export function closeModalWindow(evt) {
  if (evt.code === "Escape") {
    const modal = document.getElementById("form-modal-window");
    if (modal) {
      modal.remove();
      window.removeEventListener("keydown", closeModalWindow);
    }
  }
}

export function removeModal() {
  const modal = document.getElementById("form-modal-window");
  const closeModalButton = document.getElementById("close-modal");
  const backdrop = document.querySelector(".form-modal-window-backdrop");

  const closeModal = () => {
    if (modal) {
      modal.remove();
      window.removeEventListener("keydown", closeModalWindow);
    }
  };

  closeModalButton.addEventListener("click", closeModal);

  backdrop.addEventListener("click", (evt) => {
    if (evt.target === backdrop) {
      closeModal();
    }
  });
}
