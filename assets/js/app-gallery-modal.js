document.addEventListener("DOMContentLoaded", () => {
  const galleryModalElement = document.getElementById("galleryModal");
  if (!galleryModalElement) return;

  galleryModalElement.addEventListener("show.bs.modal", function (event) {
    const triggerElement = event.relatedTarget;
    const imageSource = triggerElement.getAttribute("data-bs-image-src");
    const modalImage = galleryModalElement.querySelector(".modal-body img");
    modalImage.src = imageSource;
  });
});
