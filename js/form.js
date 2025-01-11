import { init, sendForm } from "@emailjs/browser";
import { refs } from "./refs.js";

export const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

export const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateInputs = () => {
  const usernameValue = refs.username.value.trim();
  const emailValue = refs.email.value.trim();
  const messageValue = refs.message.value.trim();

  let isValid = true;

  if (usernameValue === "") {
    setError(refs.username, "Name is required");
    isValid = false;
  } else {
    setSuccess(refs.username);
  }

  if (emailValue === "") {
    setError(refs.email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(refs.email, "Provide a valid email address");
    isValid = false;
  } else {
    setSuccess(refs.email);
  }

  if (messageValue === "") {
    setError(refs.message, "Message is required");
    isValid = false;
  } else {
    setSuccess(refs.message);
  }

  return isValid;
};

export const handleFormSubmit = () => {
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
  if (status === "success") {
    const modalWindow = `
        <div id="form-modal-window"
      class="form-modal-window-backdrop">
      <div
        class="form-modal-window">
        <p class="text-xs xl:text-xl">
          Thank you! Your message has been successfully sent!
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

    document.getElementById("close-modal").addEventListener("click", () => {
      const modal = document.getElementById("form-modal-window");
      if (modal) modal.remove();
    });
  }
  if (status === "error") {
    const modalWindow = `
        <div id="form-modal-window"
      class="form-modal-window-backdrop">
      <div
        class="form-modal-window">
        <p class="text-xs xl:text-xl">
          Something went wrong, try again!
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

    document.getElementById("close-modal").addEventListener("click", () => {
      const modal = document.getElementById("form-modal-window");
      if (modal) modal.remove();
    });
  }
}
