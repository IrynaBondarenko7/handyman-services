import { addReview } from "./firebase.js";
import { refs } from "./refs.js";

export function addReviewFormModalWindow() {
  const modalWindow = `
           <div id="form-modal-window" class="form-modal-window-backdrop">
            <form id="reviewsForm" class="reviewsForm">
              <input
                type="text"
                id="name"
                placeholder="Your name"
                class="w-full h-8 xl:h-9 border-main border-2 rounded-lg p-2 focus:outline-secondColor text-xs xl:text-base text-slate-700"
              />
              <textarea
                name="review"
                id="review"
                placeholder="Please add your review here"
                class="resize-none w-full h-40 border-main border-2 rounded-lg p-2 focus:outline-secondColor text-xs xl:text-base block text-slate-700"
              ></textarea>
              <div
                class="mt-3 flex flex-col gap-4 md:flex-row md:justify-center"
              >
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
