import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

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
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  class="quotes-icon"
                >
                  <path
                    d="M7.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.357-0.056 0.724-0.086 1.097-0.086zM25.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.358-0.056 0.724-0.086 1.097-0.086z"
                  ></path>
                </svg>
          </div>
                <p class="review-text">${review.review}</p>
                <div class="review-user-info-wrap">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_1"
                      data-name="Layer 1"
                      viewBox="0 0 24 24"
                      class="user-icon"
                    >
                      <path
                        d="m16,23.314c-1.252.444-2.598.686-4,.686s-2.748-.242-4-.686v-2.314c0-2.206,1.794-4,4-4s4,1.794,4,4v2.314ZM12,7c-1.103,0-2,.897-2,2s.897,2,2,2,2-.897,2-2-.897-2-2-2Zm12,5c0,4.433-2.416,8.311-6,10.389v-1.389c0-3.309-2.691-6-6-6s-6,2.691-6,6v1.389C2.416,20.311,0,16.433,0,12,0,5.383,5.383,0,12,0s12,5.383,12,12Zm-8-3c0-2.206-1.794-4-4-4s-4,1.794-4,4,1.794,4,4,4,4-1.794,4-4Z"
                      />
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
    swiperWrapper.innerHTML =
      "<p>Failed to load reviews. Please try again later.</p>";
  }
};

let swiperInstance;

const initSwiper = () => {
  if (swiperInstance) swiperInstance.destroy();

  swiperInstance = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1440: {
        slidesPerView: 3,
      },
    },
  });
};
