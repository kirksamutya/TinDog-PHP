document.addEventListener("DOMContentLoaded", () => {
  const clearCacheButton = document.getElementById("clear-cache-btn");
  const originalButtonText = document.getElementById("clear-cache-text");
  const successMessage = document.getElementById("cache-cleared-text");

  if (clearCacheButton) {
    clearCacheButton.addEventListener("click", () => {
      if (originalButtonText.style.display !== "none") {
        originalButtonText.style.display = "none";
        successMessage.style.display = "inline";

        setTimeout(() => {
          originalButtonText.style.display = "inline";
          successMessage.style.display = "none";
        }, 2000);
      }
    });
  }
});
