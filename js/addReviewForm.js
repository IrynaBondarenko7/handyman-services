import { addReview } from "./firebase.js";

export function addReviewFormModalWindow() {
  const modalWindow = `
    <div id="form-modal-window" class="form-modal-window-backdrop">
      <form id="reviewsForm" class="reviewsForm">
        <div class="input-control reviews-input-wrap">
          <label
            for="name"
            class="text-secondColor text-sm xl:text-xl font-bold">Name</label>
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
            for="review"
            class="text-secondColor text-sm xl:text-xl font-bold">Review</label>
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

  document.body.insertAdjacentHTML("beforeend", modalWindow);

  document.getElementById("close-modal").addEventListener("click", () => {
    const modal = document.getElementById("form-modal-window");
    if (modal) modal.remove();
  });

  const reviewsForm = document.getElementById("reviewsForm");
  if (reviewsForm) {
    reviewsForm.addEventListener("submit", addReview);
  }
}
