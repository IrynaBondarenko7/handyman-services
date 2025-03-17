export function removeModal() {
  document.getElementById("close-modal").addEventListener("click", () => {
    const modal = document.getElementById("form-modal-window");
    if (modal) modal.remove();
  });
}
