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
  const usernameValue = inputsObject.username.trim();
  const emailValue = inputsObject.email.trim();
  const textValue = inputsObject.text.trim();

  let isValid = true;

  if (usernameValue === "") {
    setError(inputsObject.userNameRef, "Name is required");
    isValid = false;
  } else {
    setSuccess(inputsObject.userNameRef);
  }

  if (emailValue === "") {
    setError(inputsObject.emailRef, "Email is required");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(inputsObject.emailRef, "Provide a valid email address");
    isValid = false;
  } else {
    setSuccess(inputsObject.emailRef);
  }

  if (textValue === "") {
    setError(inputsObject.textRef, `${inputsObject.fieldTitle} is required`);
    isValid = false;
  } else {
    setSuccess(inputsObject.textRef);
  }

  return isValid;
};
