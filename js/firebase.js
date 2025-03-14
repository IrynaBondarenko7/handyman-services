import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { validateInputs } from "./inputsValidation.js";
import { initSwiper } from "./reviewsSwiper.js";

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
  const email = document.getElementById("reviewEmail");

  const inputs = {
    username: name.value,
    userNameRef: name,
    email: email.value,
    emailRef: email,
    text: review.value,
    textRef: review,
    fieldTitle: "Review",
  };

  if (validateInputs(inputs)) {
    try {
      await addDoc(collection(db, "reviews"), {
        name: name.value,
        email: email.value,
        review: review.value,
        createdAt: new Date(),
      });

      name.value = "";
      review.value = "";
      email.value = "";

      fetchReviews();

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

export const fetchReviews = async () => {
  const swiperWrapper = document.getElementById("reviews-swiper");
  const swiperContainer = document.querySelector(".swiper-container");
  swiperWrapper.innerHTML = "Loading reviews...";

  try {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      swiperWrapper.innerHTML = `<p class="no-reviews-text">No reviews yet. Be the first to leave one!</p>`;
      return;
    }

    swiperWrapper.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const review = doc.data();

      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");

      const formatDate = (date) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        return new Date(date).toLocaleDateString("en-US", options);
      };

      slide.innerHTML = `
  <div class="review-card">
            <div>
                <svg class="quotes-icon">
                     <use xlink:href="./images/icons/icons.svg#quotes-left"></use>
                </svg>
          </div>
                <p class="review-text">${review.review}</p>
                <div class="review-user-info-wrap">
                  <div>
                    <svg class="quotes-icon">
                     <use xlink:href="./images/icons/icons.svg#circle-user"></use>
                    </svg>
                  </div>
                  <div class="review-user-info">
                    <h3 class="review-name">${review.name}</h3>
                    <small class="review-date"
                      >${formatDate(review.createdAt.toDate())}</small
                    >
                  </div>
                </div>
              </div>
`;
      swiperWrapper.appendChild(slide);
    });

    if (!swiperContainer.querySelector(".swiper-button-next")) {
      const nextButton = document.createElement("div");
      nextButton.classList.add("swiper-button-next");
      swiperContainer.appendChild(nextButton);
    }

    if (!swiperContainer.querySelector(".swiper-button-prev")) {
      const prevButton = document.createElement("div");
      prevButton.classList.add("swiper-button-prev");
      swiperContainer.appendChild(prevButton);
    }

    initSwiper();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    swiperWrapper.innerHTML = `<p class="no-reviews-text">Failed to load reviews. Please try again later.</p>`;
  }
};
