import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submission

export const addReview = async (e) => {
  e.preventDefault();

  const name = document.getElementById("name");
  const review = document.getElementById("review");

  try {
    await addDoc(collection(db, "reviews"), {
      name: name.value,
      review: review.value,
      timestamp: new Date(),
    });
    alert("Feedback submitted successfully!");
    name.value = "";
    review.value = "";
  } catch (error) {
    console.error("Error submitting feedback:", error);
    alert("Failed to submit feedback. Try again later.");
  }
};
