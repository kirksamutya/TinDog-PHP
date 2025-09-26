document.addEventListener("DOMContentLoaded", () => {
  const handlePhotoPreviews = () => {
    const fileInputs = document.querySelectorAll(
      'input[type="file"][data-preview-target]'
    );

    fileInputs.forEach((input) => {
      input.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const previewTargetId = event.target.dataset.previewTarget;
        const previewImage = document.getElementById(previewTargetId);

        if (previewImage) {
          const reader = new FileReader();
          reader.onload = (e) => {
            previewImage.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    });
  };

  handlePhotoPreviews();
});
