import { collection, addDoc } from "firebase/firestore";
import { validateInputs } from "./inputsValidation.js";
import { db } from "./firebaseConfig.js";
import { fetchReviews } from "./fetchReviews.js";

export const addReviewFormSubmit = async (e) => {
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

      reviewSubmittingResult();

      fetchReviews();
    } catch (error) {
      reviewSubmittingResult(error);
    }
  }
};

function submittingReviewFeedbackHTML(error = null) {
  return `
          <div class="sent-form-message">
            <p class="text-sm">${
              error
                ? "An error occurred, your review was not sent, please try again"
                : "Thank you! Your review has been submitted successfully."
            }</p>
            <button id="close-result-message" class="review-form-btn mx-auto">Close</button>
          </div>
        `;
}

function reviewSubmittingResult(error = null) {
  const formModalWindow = document.getElementById("form-modal-window");
  if (formModalWindow) {
    formModalWindow.innerHTML = submittingReviewFeedbackHTML(error);

    document
      .getElementById("close-result-message")
      .addEventListener("click", () => {
        formModalWindow.remove();
      });
  }
}
