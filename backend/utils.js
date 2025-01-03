import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // React Native local storage
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // Install: npm install uuid
import { firestore } from "./firebase"; // Ensure firestore is properly initialized in firebase.js
import * as FileSystem from "expo-file-system";
import { getSeverity } from "../utils/get-severity";

const auth = getAuth();

export const userReportCounts = async (id) => {
  const reports = await fetchReportsByUserId(id);
  const reportedIncidents = reports.length;
  const anonymousReports = [...reports].filter((report) => report.isAnonymous).length;
  const deletedReports = [...reports].filter((report)=> report.status == 'deleted').length;
  return { reportedIncidents, anonymousReports, deletedReports };
};

export const loginUser = async (data) => {
  const { email, password } = data;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const authUser = userCredential.user;
    const userCollection = collection(firestore, "members");
    const q = query(userCollection, where("id", "==", authUser.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("User not found in Firestore");
    }

    const userDoc = querySnapshot.docs[0];
    const userData = { id: userDoc.id, ...userDoc.data()};

    // Store user data locally
    await AsyncStorage.setItem("user", JSON.stringify(userData));

    // Return stored user
    return await getStoredUser();
  } catch (error) {
    console.error("Error logging in user:", error.message);
    throw error;
  }
};

export const registerUser = async (data) => {
  const { email, password } = data;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const getStoredUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    throw error;
  }
};

export const setStoredUser = async(user) =>{
  try{
    await AsyncStorage.setItem("user", JSON.stringify(user));
  }catch(error){
    throw error;
  }
}

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("user"); // Remove user from local storage
  } catch (error) {
    throw error;
  }
};

const upload = async (uri, type) => {
  try {
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dgt35afpc/upload";
    const uploadPreset = "women696";

    // console.log("Starting upload for URI:", uri);

    const blob = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });

    const formData = new FormData();
    formData.append("file", `data:${type}/;base64,${blob}`);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", "dgt35afpc");

    console.log("FormData prepared. Starting upload to Cloudinary...");
    const uploadResponse = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    const result = await uploadResponse.json();
    // console.log("Upload response received:", result);

    if (!uploadResponse.ok) {
      throw new Error(result.error?.message || `Failed to upload ${type}`);
    }
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${type}:`, error);
    throw error;
  }
};

export const createReport = async (data) => {
  try {
    // Upload evidences and determine their types
    console.log(data.evidence.assets);
    const evidenceUrls = [];
    for (const assest of data.evidence.assets) {
      const url = await upload(assest.uri, assest.type); // Upload as image or video
      evidenceUrls.push(url);
    }
    // console.log(evidenceUrls);
    // Create the report document
    const reportData = {
      ...data,
      evidence: evidenceUrls,
      status: "unreviewed",
      createdAt: new Date(),
      severity: await getSeverity(data.types, data.additionalInfo)
    };

    console.log("Report Data:", data);
    const reportsCollection = collection(firestore, "reports");
    await addDoc(reportsCollection, reportData);

    console.log("Report created successfully!");
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};

export const fetchReportsByUserId = async (id) => {
  try {
    const reportsRef = collection(firestore, "reports");
    const q = query(reportsRef, where("userId", "==", id));
    const querySnapshot = await getDocs(q);

    const reports = [];
    querySnapshot.forEach((doc) => {
      reports.push({ id: doc.id, ...doc.data() });
    });

    return reports;
  } catch (error) {
    console.error("Error fetching reports by userId:", error);
    throw error;
  }
};

export const fetchSuperReports = async () => {
  try {
    const reportsRef = collection(firestore, "reports");
    const q = query(reportsRef, where("isSuperReport", "==", true));
    const querySnapshot = await getDocs(q);

    const reports = [];
    querySnapshot.forEach((doc) => {
      reports.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error("Error Fetching reports by userId", error);
    throw error;
  }
};

export const fetchReportsByQuery = async (filters) => {
  try {
    const reportsRef = collection(firestore, "reports");

    // Create query dynamically based on filters
    let q = reportsRef;

    if (filters.location) {
      q = query(q, where("location", "==", filters.location));
    }
    if (filters.status) {
      q = query(q, where("status", "==", filters.status));
    }
    if (filters.type) {
      q = query(q, where("type", "==", filters.type));
    }
    if (filters.description) {
      q = query(q, where("description", "==", filters.description));
    }
    if (filters.place) {
      q = query(q, where("place", "==", filters.place));
    }
    if (filters.additionalInformation) {
      q = query(
        q,
        where("additionalInformation", "==", filters.additionalInformation)
      );
    }

    const querySnapshot = await getDocs(q);

    const reports = [];
    querySnapshot.forEach((doc) => {
      reports.push({ id: doc.id, ...doc.data() });
    });

    console.log("Fetched Reports:", reports);
    return reports;
  } catch (error) {
    console.error("Error fetching reports by query:", error);
    throw error;
  }
};

export const fetchAllReports = async () => {
  try {
    const reportsCollection = collection(firestore, "reports");
    const reportSnapshot = await getDocs(reportsCollection);
    const reportsList = reportSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return reportsList;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export const updateReport = async (reportId, updatedData) => {
  try {
    const reportRef = doc(firestore, "reports", reportId);
    await updateDoc(reportRef, updatedData);
    console.log("Report updated successfully!");
  } catch (error) {
    console.error("Error updating report:", error);
    throw error;
  }
};

export const deleteReport = async (reportId, deleteReason) => {
  try {
    const reportRef = doc(firestore, "reports", reportId);
    await updateReport(reportId, { status: "deleted", deleteReason:deleteReason });
  } catch (error) {
    console.error("Error deleting report:", error);
    throw error;
  }
};

export const registerMember = async (data) => {
  try {
    const user = await registerUser(data);
    const membersCollection = collection(firestore, "members");
    await addDoc(membersCollection, { ...data, id: user.uid });
    console.log("Member added successfully!", user);
    
  } catch (error) {
    throw error;
  }
};

export const getMemberById = async (memberId) => {
  try {
    const memberRef = doc(firestore, "members", memberId);
    const memberSnapshot = await getDoc(memberRef);
    const memberData = memberSnapshot.data();
    return memberData;
  } catch (error) {
    console.error("Error getting member by ID:", error);
    throw error;
  }
};

export const updateMember = async (email, updatedData) => {
  try {
    const memberRef = collection(firestore, "members");
    const q = query(memberRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Member not found");
    }

    const memberDoc = querySnapshot.docs[0];
    const memberRefDoc = doc(firestore, "members", memberDoc.id);
    await updateDoc(memberRefDoc, updatedData);
    console.log("Member updated successfully!");
  } catch (error) {
    console.error("Error updating member:", error);
    throw error;
  }
};

export const deleteMember = async (memberId) => {
  try {
    const memberRef = doc(firestore, "members", memberId);
    await deleteDoc(memberRef);
    console.log("Member deleted successfully!");
  } catch (error) {
    console.error("Error deleting member:", error);
    throw error;
  }
};

export const addContact = async (contact) => {
  try {
    const contactsCollection = collection(firestore, "contacts");
    await addDoc(contactsCollection, contact);
    console.log("Contact added successfully!");
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
};

export const updateContact = async (contactId, updatedData) => {
  try {
    const contactRef = doc(firestore, "contacts", contactId);
    await updateDoc(contactRef, updatedData);
    console.log("Contact updated successfully!");
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};

export const deleteContact = async (contactId) => {
  try {
    const contactRef = doc(firestore, "contacts", contactId);
    await deleteDoc(contactRef);
    console.log("Contact deleted successfully!");
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
};

export const fetchContacts = async () => {
  try {
    const contactsCollection = collection(firestore, "contacts");
    const contactSnapshot = await getDocs(contactsCollection);
    const contactsList = contactSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return contactsList;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

export const fetchSingleReport = async (docId) => {
  console.log("Fetching report with Document ID:", docId);
  try {
    // Reference the specific document by its auto-generated ID
    const reportRef = doc(firestore, "reports", docId);

    // Fetch the document
    const reportDoc = await getDoc(reportRef);

    if (reportDoc.exists()) {
      console.log("Report fetched:", reportDoc.data());
      // Combine document ID with its data
      return { id: reportDoc.id, ...reportDoc.data() };
    } else {
      console.warn("No report found with the given Document ID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching single report:", error);
    throw error;
  }
};
