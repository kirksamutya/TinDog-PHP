document.addEventListener("DOMContentLoaded", () => {
  const settingsForm = document.querySelector(".card-body");
  if (!settingsForm) return;

  const defaultSettings = {
    autoFlagImages: true,
    reportThreshold: 5,
    locationWeight: 75,
    enableSuperLikes: false,
    maintenanceMode: false,
  };

  let currentSettings =
    JSON.parse(localStorage.getItem("tindogSystemSettings")) || defaultSettings;

  const saveSettings = () => {
    localStorage.setItem(
      "tindogSystemSettings",
      JSON.stringify(currentSettings)
    );
  };

  const loadSettings = () => {
    const inputs = settingsForm.querySelectorAll("[data-setting]");
    inputs.forEach((input) => {
      const key = input.dataset.setting;
      if (input.type === "checkbox") {
        input.checked = currentSettings[key];
      } else {
        input.value = currentSettings[key];
      }
    });
  };

  settingsForm.addEventListener("change", (e) => {
    const target = e.target;
    if (target.dataset.setting) {
      const key = target.dataset.setting;
      const value = target.type === "checkbox" ? target.checked : target.value;
      currentSettings[key] = value;
      saveSettings();
    }
  });

  loadSettings();
});
