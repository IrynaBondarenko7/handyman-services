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

export const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateInputs = (inputsObject) => {
  const usernameValue = inputsObject.username.value.trim();
  const emailValue = inputsObject.email.value.trim();
  const textValue = inputsObject.text.value.trim();

  let isValid = true;

  if (usernameValue === "") {
    setError(inputsObject.username, "Name is required");
    isValid = false;
  } else {
    setSuccess(inputsObject.username);
  }

  if (emailValue === "") {
    setError(inputsObject.email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(inputsObject.email, "Provide a valid email address");
    isValid = false;
  } else {
    setSuccess(inputsObject.email);
  }

  if (textValue === "") {
    setError(inputsObject.text, `${inputsObject.fieldTitle} is required`);
    isValid = false;
  } else {
    setSuccess(inputsObject.text);
  }

  return isValid;
};
