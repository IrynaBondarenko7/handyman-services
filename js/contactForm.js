import { init, sendForm } from "@emailjs/browser";
import { refs } from "./refs.js";
import { closeModalWindow, removeModal } from "./removeModal.js";

export const handleContactFormSubmit = () => {
  init(import.meta.env.VITE_PUBLIC_KEY);

  sendForm(
    import.meta.env.VITE_SERVICE_ID,
    import.meta.env.VITE_TEMPLATE_ID,
    "#form"
  )
    .then(() => {
      refs.username.value = "";
      refs.email.value = "";
      refs.message.value = "";
      showSentFormFeedback("success");
    })
    .catch((err) => {
      showSentFormFeedback("error");
      console.error("Error sending form:", err);
    });
};

function showSentFormFeedback(status) {
  const modalWindow = `
        <div id="form-modal-window"
      class="form-modal-window-backdrop">
      <div
        class="form-modal-window">
        <p class="text-xs xl:text-xl">
        ${
          status === "success"
            ? "Thank you! Your message has been successfully sent!"
            : "Something went wrong, try again!"
        }
          
        </p>
        <button
          id="close-modal"
          class="w-36 mt-5 text-white bg-accent py-2 px-3 self-start text-sm md:text-base xl:text-lg xl:px-4 xl:mt-5 rounded-xl hover:bg-main hover:text-bgColor transition-all duration-300">
          OK
        </button>
      </div>
    </div>
      `;

  document.body.insertAdjacentHTML("beforeend", modalWindow);

  window.addEventListener("keydown", closeModalWindow);
  removeModal();
}
