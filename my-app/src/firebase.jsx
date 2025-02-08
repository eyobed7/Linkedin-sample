// Import required modules
import { initializeApp } from 'firebase/app'; // Core Firebase app
import { getFirestore } from 'firebase/firestore'; // Firestore database
import { getAuth } from 'firebase/auth'; // Authentication

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbpzRmx4SJkBHcOsYoo-qX1S6-cggQ-Yc",
  authDomain: "linkedin-clone-24379.firebaseapp.com",
  projectId: "linkedin-clone-24379",
  storageBucket: "linkedin-clone-24379.firebasestorage.app",
  messagingSenderId: "1039852003243",
  appId: "1:1039852003243:web:c00188cb8ccc2ca7bffcee"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore and Auth instances
const db = getFirestore(app); // Firestore database
const auth = getAuth(app); // Authentication

// Export Firestore and Auth for use in other parts of your app
export { db, auth };