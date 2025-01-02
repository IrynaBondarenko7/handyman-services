import { init, sendForm } from "@emailjs/browser";
import { refs } from "./refs.js";

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
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

  if (usernameValue === "") {
    setError(refs.username, "Name is required");
  } else {
    setSuccess(refs.username);
  }

  if (emailValue === "") {
    setError(refs.email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(refs.email, "Provide a valid email address");
  } else {
    setSuccess(refs.email);
  }

  if (messageValue === "") {
    setError(refs.message, "Message is required");
  } else {
    setSuccess(refs.message);
  }
};
init(import.meta.env.VITE_PUBLIC_KEY);

export const handleFormSubmit = () => {
  // Відправлення форми
  sendForm(
    import.meta.env.VITE_SERVICE_ID,
    import.meta.env.VITE_TEMPLATE_ID,
    "#form"
  )
    .then(() => {
      console.log("Form successfully sent!");
    })
    .catch((err) => {
      console.error("Error sending form:", err);
    });
};
