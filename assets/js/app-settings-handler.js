document.addEventListener("DOMContentLoaded", () => {
  const handleRangeSliders = () => {
    const distanceRange = document.getElementById("distanceRange");
    const distanceValue = document.getElementById("distance-value");
    const ageRange = document.getElementById("ageRange");
    const ageValue = document.getElementById("age-value");

    if (distanceRange && distanceValue) {
      distanceRange.addEventListener("input", (event) => {
        distanceValue.textContent = `${event.target.value} km`;
      });
    }

    if (ageRange && ageValue) {
      ageRange.addEventListener("input", (event) => {
        ageValue.textContent = `1 - ${event.target.value} years`;
      });
    }
  };

  const handleThemeSelector = () => {
    const themeOptions = document.querySelectorAll(".theme-option");
    themeOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const selectedTheme = this.dataset.theme;

        document.body.classList.remove("dark-theme");
        if (selectedTheme === "dark") {
          document.body.classList.add("dark-theme");
        }

        themeOptions.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
      });
    });
  };

  const handleAccessibilityOptions = () => {
    const reduceMotionToggle = document.getElementById("reduce-motion");
    if (reduceMotionToggle) {
      reduceMotionToggle.addEventListener("change", (event) => {
        if (event.target.checked) {
          document.body.classList.add("reduce-motion");
        } else {
          document.body.classList.remove("reduce-motion");
        }
      });
    }
  };

  const handleDeleteAccount = () => {
    const confirmButton = document.getElementById("confirmDeleteAccountBtn");
    if (!confirmButton) return;

    confirmButton.addEventListener("click", () => {
      const loggedInUserId = DataService.getLoggedInUserId();
      const isDeleted = DataService.deleteUser(loggedInUserId);

      if (isDeleted) {
        sessionStorage.clear();
        window.location.href = "./index.html";
      }
    });
  };

  handleRangeSliders();
  handleThemeSelector();
  handleAccessibilityOptions();
  handleDeleteAccount();
});
