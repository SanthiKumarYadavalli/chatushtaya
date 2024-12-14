import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // React Native local storage
import { addDoc, collection, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // Install: npm install uuid
import { firestore, storage } from "./firebase";

const auth = getAuth();

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // console.log(user);
    await AsyncStorage.setItem("user", JSON.stringify(user)); // Store user locally
    return user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log(user);
    await AsyncStorage.setItem("user", JSON.stringify(user)); // Store user locally
    return await getStoredUser();
  } catch (error) {
    throw error;
  }
};

export const getStoredUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    // console.log("getstore", user);
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

// Function to upload a single image
import * as FileSystem from "expo-file-system";

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
    };

    console.log("Report Data:", data);
    const reportsCollection = collection(firestore, "reports");
    await addDoc(reportsCollection, reportData);

    console.log("Report created successfully!");
    console.log(await fetchAllReports());
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};

export const fetchAllReports = async () => {
  try {
    const reportsCollection = collection(firestore, "reports");
    const querySnapshot = await getDocs(reportsCollection);

    const reports = [];
    querySnapshot.forEach((doc) => {
      reports.push({ id: doc.id, ...doc.data() });
    });

    return reports;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

const fetchReportsByUserId = async (userId) => {
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

const fetchReportsByQuery = async (filters) => {
  try {
    const reportsRef = collection(db, "reports");

    // Create query dynamically based on filters
    let q = reportsRef;

    if (filters.location) {
      q = query(q, where("location", "==", filters.location));
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
