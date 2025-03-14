import "./style.css";

import { refs } from "../js/refs.js";
import {
  onCloseModal,
  onBackdropModalClick,
  onModalOpen,
} from "../js/modal.js";
import { handleFormSubmit } from "../js/form.js";
import { validateInputs } from "../js/inputsValidation.js";
import { headerScrollPosition } from "../js/headerscroll.js";
import { fetchReviews } from "../js/firebase.js";
import { addReviewFormModalWindow } from "../js/addReviewForm.js";
import { gallerySwiper } from "../js/gallerySwiper.js";

refs.openMenuBtn.addEventListener("click", onModalOpen);
refs.btnBurgerClose.addEventListener("click", onCloseModal);
refs.burgerBackdrop.addEventListener("click", onBackdropModalClick);
refs.menuList.addEventListener("click", onCloseModal);

gallerySwiper();

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = {
    username: refs.username.value,
    userNameRef: refs.username,
    email: refs.email.value,
    emailRef: refs.email,
    text: refs.message.value,
    textRef: refs.message,
    fieldTitle: "Message",
  };

  const isValid = validateInputs(inputs);

  if (isValid) {
    handleFormSubmit();
  }
});

window.addEventListener("scroll", () => {
  headerScrollPosition();
});

refs.addReviewBtn.addEventListener("click", addReviewFormModalWindow);

document.addEventListener("DOMContentLoaded", () => {
  fetchReviews();
});
