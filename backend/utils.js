import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // React Native local storage
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { firestore, storage } from "./firebase";

const auth = getAuth();

export const registerUser = async (data) => {
  const {email, password} = data;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await AsyncStorage.setItem("user", JSON.stringify(user)); // Store user locally
    return user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data) => {
  const {email, password} = data;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await AsyncStorage.setItem("user", JSON.stringify(user)); // Store user locally
    return user;
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

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("user"); // Remove user from local storage
  } catch (error) {
    throw error;
  }
};

// Function to upload a single media
const uploadMedia = async (mediaUri) => {
  try {
    const response = await fetch(mediaUri);
    const blob = await response.blob();
    const mediaId = uuidv4();
    const mediaRef = ref(storage, `evidence_images/${mediaId}`);
    await uploadBytes(mediaRef, blob);
    const downloadUrl = await getDownloadURL(mediaRef);
    return downloadUrl; // Return the image URL for storing in Firestore
  } catch (error) {
    console.error("Error uploading media:", error);
    throw error;
  }
};

// Function to add a new report
export const createReport = async (formData) => {
  const {
    types,
    date,
    time,
    location,
    evidenceUris, // Array of local image URIs
    anonymous,
    userId,
    status,
    additionalInformation,
  }=data;
  try {
    // Upload images and get their URLs
    const evidenceUrls = [];
    for (const uri of evidenceUris) {
      const url = await uploadMedia(uri);
      evidenceUrls.push(url);
    }

    // Create the report document
    const reportData = {
      types,
      date,
      time,
      location,
      evidences: evidenceUrls,
      anonymous,
      userId: anonymous ? null : userId,
      status,
      additionalInformation,
      submittedAt:firestore.FieldValue.serverTimestamp()
    };

    const reportsCollection = collection(firestore, "reports");
    await addDoc(reportsCollection, reportData);

    console.log("Report created successfully!");
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};

export const fetchReportsByUserId = async (userId) => {
  try {
    const reportsRef = collection(db, "reports");
    const q = query(reportsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const reports = [];
    querySnapshot.forEach((doc) => {
      reports.push({ id: doc.id, ...doc.data() });
    });

    console.log("Fetched Reports:", reports);
    return reports;
  } catch (error) {
    console.error("Error fetching reports by userId:", error);
    throw error;
  }
};

export const fetchReportsByQuery = async (filters) => {
  try {
    const reportsRef = collection(db, "reports");

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
    const reportsList = reportSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
    return reportsList;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
}

export const updateReport = async (reportId, updatedData) => {
  try {
    const reportRef = doc(db, "reports", reportId);
    await updateDoc(reportRef, updatedData);
    console.log("Report updated successfully!");
  } catch (error) {
    console.error("Error updating report:", error);
    throw error;
  }
};

export const deleteReport = async (reportId) => {
  try {
    const reportRef = doc(db, "reports", reportId);
    await deleteDoc(reportRef);
    console.log("Report deleted successfully!");
  } catch (error) {
    console.error("Error deleting report:", error);
    throw error;
  }
};

export const registerMember = async (data) => {
  try {
    const membersCollection = collection(db, "members");
    await addDoc(membersCollection, data);
    console.log("Member added successfully!");
  } catch (error) {
    console.error("Error adding member:", error);
    throw error;
  }
};

export const getMemberById = async (memberId) => {
  try {
    const memberRef = doc(db, "members", memberId);
    const memberSnapshot = await getDoc(memberRef);
    const memberData = memberSnapshot.data();
    return memberData;
  } catch (error) {
    console.error("Error getting member by ID:", error);
    throw error;
  }
};

export const updateMember = async (memberId, updatedData) => {
  try {
    const memberRef = doc(db, "members", memberId);
    await updateDoc(memberRef, updatedData);
    console.log("Member updated successfully!");
  } catch (error) {
    console.error("Error updating member:", error);
    throw error;
  }
};

export const deleteMember = async (memberId) => {
  try {
    const memberRef = doc(db, "members", memberId);
    await deleteDoc(memberRef);
    console.log("Member deleted successfully!");
  } catch (error) {
    console.error("Error deleting member:", error);
    throw error;
  }
};

export const addContact = async (contact) => {
  try {
    const contactsCollection = collection(db, "contacts");
    await addDoc(contactsCollection, contact);
    console.log("Contact added successfully!");
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
};

export const updateContact = async (contactId, updatedData) => {
  try {
    const contactRef = doc(db, "contacts", contactId);
    await updateDoc(contactRef, updatedData);
    console.log("Contact updated successfully!");
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};

export const deleteContact = async (contactId) => {
  try {
    const contactRef = doc(db, "contacts", contactId);
    await deleteDoc(contactRef);
    console.log("Contact deleted successfully!");
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
};

export const fetchContacts = async () => {
  try {
    const contactsCollection = collection(db, "contacts");
    const contactSnapshot = await getDocs(contactsCollection);
    const contactsList = contactSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
    return contactsList;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
}
