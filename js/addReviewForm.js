import { addReviewFormSubmit } from "./handleReviewFormSubmit.js";
import { closeModalWindow, removeModal } from "./removeModal.js";

export function addReviewFormModalWindow() {
  const modalWindow = createReviewModalWindowHTML();

  document.body.insertAdjacentHTML("beforeend", modalWindow);

  window.addEventListener("keydown", closeModalWindow);
  removeModal();

  const reviewsForm = document.getElementById("reviewsForm");
  if (reviewsForm) {
    reviewsForm.addEventListener("submit", addReviewFormSubmit);
  }
}

function createReviewModalWindowHTML() {
  return `
   <div id="form-modal-window" class="form-modal-window-backdrop">
      <form id="reviewsForm" class="reviewsForm">
        <div class="input-control reviews-input-wrap">
          <label
            for="name"
            class="text-secondColor text-sm xl:text-xl font-bold"
            >Name</label
          >
          <input
            type="text"
            id="name"
            name="name"
            maxlength="40"
            placeholder="Your name"
            class="reviews-form-input"
          />
          <div class="error"></div>
        </div>
        <div class="input-control reviews-input-wrap">
          <label
            for="email"
            class="text-secondColor text-sm xl:text-xl font-bold"
            >Email</label
          >
          <input
            type="text"
            id="reviewEmail"
            name="email"
            placeholder="example@mail.com"
            class="reviews-form-input"
          />
          <div class="error"></div>
        </div>
        <div class="input-control reviews-input-wrap">
          <label
            for="review"
            class="text-secondColor text-sm xl:text-xl font-bold"
            >Review</label
          >
          <textarea
            name="review"
            id="review"
            maxlength="450"
            placeholder="Please add your review here"
            class="reviews-form-textarea"
          ></textarea>
          <div class="error"></div>
        </div>
        <div class="reviews-form-btn-wrap">
          <button type="submit" class="review-form-btn">Submit</button>
          <button id="close-modal" class="review-form-btn">Cancel</button>
        </div>
      </form>
    </div>
  `;
}
