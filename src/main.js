import "./style.css";

import { refs } from "../js/refs.js";
import {
  onCloseModal,
  onBackdropModalClick,
  onModalOpen,
} from "../js/modal.js";
import { handleFormSubmit, validateInputs } from "../js/form.js";

refs.openMenuBtn.addEventListener("click", onModalOpen);
refs.btnBurgerClose.addEventListener("click", onCloseModal);
refs.burgerBackdrop.addEventListener("click", onBackdropModalClick);
refs.menuList.addEventListener("click", onCloseModal);

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
  handleFormSubmit();
});
