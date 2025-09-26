document.addEventListener("DOMContentLoaded", () => {
  const settingsKey = "tindogDiscoverySettings";
  const allUsers = DataService.getAllUsers();
  const loggedInUserId = DataService.getLoggedInUserId();
  const currentUser = allUsers[loggedInUserId];
  const isMastiffUser = currentUser && currentUser.plan === "mastiff";

  const defaultSettings = {
    distance: 50,
    age: 8,
    dogSex: "any",
    dogSize: "any",
    showOnTindog: true,
  };

  let currentSettings =
    JSON.parse(localStorage.getItem(settingsKey)) || defaultSettings;

  const distanceRange = document.getElementById("distanceRange");
  const distanceValue = document.getElementById("distance-value");
  const ageRange = document.getElementById("ageRange");
  const ageValue = document.getElementById("age-value");
  const sexFilter = document.getElementById("filterDogSex");
  const sizeFilter = document.getElementById("filterDogSize");
  const showOnTindogToggle = document.getElementById("show-on-tindog");

  const saveSettings = () => {
    localStorage.setItem(settingsKey, JSON.stringify(currentSettings));
  };

  const loadSettings = () => {
    if (distanceRange) distanceRange.value = currentSettings.distance;
    if (distanceValue)
      distanceValue.textContent = `${currentSettings.distance} km`;
    if (ageRange) ageRange.value = currentSettings.age;
    if (ageValue) ageValue.textContent = `1 - ${currentSettings.age} years`;
    if (sexFilter) sexFilter.value = currentSettings.dogSex;
    if (sizeFilter) sizeFilter.value = currentSettings.dogSize;
    if (showOnTindogToggle)
      showOnTindogToggle.checked = currentSettings.showOnTindog;
  };

  const handleRangeSliders = () => {
    if (distanceRange) {
      distanceRange.addEventListener("input", (event) => {
        const value = event.target.value;
        distanceValue.textContent = `${value} km`;
        currentSettings.distance = value;
        saveSettings();
      });
    }
    if (ageRange) {
      ageRange.addEventListener("input", (event) => {
        const value = event.target.value;
        ageValue.textContent = `1 - ${value} years`;
        currentSettings.age = value;
        saveSettings();
      });
    }
  };

  const handleAdvancedFilters = () => {
    const fieldset = document.getElementById("advanced-filters-fieldset");
    const upgradePrompt = document.getElementById("upgrade-for-filters");

    if (!fieldset || !upgradePrompt) return;

    if (isMastiffUser) {
      fieldset.disabled = false;
      upgradePrompt.style.display = "none";
      if (sexFilter) {
        sexFilter.addEventListener("change", (e) => {
          currentSettings.dogSex = e.target.value;
          saveSettings();
        });
      }
      if (sizeFilter) {
        sizeFilter.addEventListener("change", (e) => {
          currentSettings.dogSize = e.target.value;
          saveSettings();
        });
      }
    } else {
      fieldset.disabled = true;
      upgradePrompt.style.display = "block";
    }
  };

  if (showOnTindogToggle) {
    showOnTindogToggle.addEventListener("change", (e) => {
      currentSettings.showOnTindog = e.target.checked;
      saveSettings();
    });
  }

  loadSettings();
  handleRangeSliders();
  handleAdvancedFilters();
});
