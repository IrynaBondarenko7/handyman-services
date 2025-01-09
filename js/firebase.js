import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { setError, setSuccess } from "./form.js";

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

  if (validateInputs(name, review)) {
    try {
      await addDoc(collection(db, "reviews"), {
        name: name.value,
        review: review.value,
        createdAt: new Date(),
      });

      name.value = "";
      review.value = "";

      const formModalWindow = document.getElementById("form-modal-window");
      if (formModalWindow) {
        formModalWindow.innerHTML = `
          <div class="sent-form-message">
            <p class="text-sm">Thank you! Your review has been submitted successfully.</p>
            <button id="close-success-message" class="review-form-btn mx-auto">Close</button>
          </div>
        `;

        document
          .getElementById("close-success-message")
          .addEventListener("click", () => {
            formModalWindow.remove();
          });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);

      const formModalWindow = document.getElementById("form-modal-window");
      if (formModalWindow) {
        formModalWindow.innerHTML = `
          <div class="sent-form-message">
            <p class="text-sm">An error occurred, your review was not sent, please try again</p>
            <button id="close-success-message" class="review-form-btn mx-auto">Close</button>
          </div>
        `;

        document
          .getElementById("close-success-message")
          .addEventListener("click", () => {
            formModalWindow.remove();
          });
      }
    }
  }
};

export const validateInputs = (name, review) => {
  const usernameValue = name.value.trim();
  const reviewValue = review.value.trim();
  let isValid = true;

  if (usernameValue === "") {
    setError(name, "Name is required");
    isValid = false;
  } else {
    setSuccess(name);
  }

  if (reviewValue === "") {
    setError(review, "Review text is required");
    isValid = false;
  } else {
    setSuccess(review);
  }

  return isValid;
};
