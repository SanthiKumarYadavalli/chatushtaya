import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // React Native local storage
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
    return user;
  } catch (error) {
    throw error;
  }
};

export const getStoredUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    console.log("getstore", user);
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
const uploadImage = async (imageUri) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const imageId = uuidv4();
    const imageRef = ref(storage, `evidence_images/${imageId}`);
    await uploadBytes(imageRef, blob);
    const downloadUrl = await getDownloadURL(imageRef);
    return downloadUrl; // Return the image URL for storing in Firestore
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Function to add a new report
export const createReport = async ({
  type,
  date,
  time,
  location,
  evidenceUris, // Array of local image URIs
  anonymous,
  userId,
  status,
  additionalInformation,
}) => {
  try {
    // Upload images and get their URLs
    const evidenceUrls = [];
    for (const uri of evidenceUris) {
      const url = await uploadImage(uri);
      evidenceUrls.push(url);
    }

    // Create the report document
    const reportData = {
      type,
      date,
      time,
      location,
      evidences: evidenceUrls,
      anonymous,
      userId: anonymous ? null : userId,
      status,
      additionalInformation,
    };

    const reportsCollection = collection(firestore, "reports");
    await addDoc(reportsCollection, reportData);

    console.log("Report created successfully!");
  } catch (error) {
    console.error("Error creating report:", error);
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
