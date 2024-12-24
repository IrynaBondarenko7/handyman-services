export function onModalOpen() {
  window.addEventListener("keydown", onEscKeyPress);
  document.body.classList.add("show-modal");
  document.body.style.overflow = "hidden";
}
export function onCloseModal() {
  window.removeEventListener("keydown", onEscKeyPress);
  document.body.classList.remove("show-modal");
  document.body.style.overflow = "auto";
}
export function onBackdropModalClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}

export function onEscKeyPress(evt) {
  if (evt.code === "Escape") {
    onCloseModal();
  }
}
