import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // Import Firebase Authentication

async function validateUser(data) {
    const { email, password } = data;

    try {
        // Use Firebase Authentication to sign in
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        
        // If successful, return success message
        return { success: true, message: "Login successful!", user: userCredential.user };
    } catch (error) {
        // Handle errors here
        return { success: false, message: error.message };
    }
}

async function registerUser(data) {
    const { email, password } = data;

    try {
        // Use Firebase Authentication to create a new user
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        
        // If successful, return success message
        return { success: true, message: "Registration successful!", user: userCredential.user };
    } catch (error) {
        // Handle errors here
        return { success: false, message: error.message };
    }
}

// Export the function
export { validateUser,registerUser };