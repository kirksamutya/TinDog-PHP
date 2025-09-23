document.addEventListener("DOMContentLoaded", function () {
  const isPremiumUser = false; // Change this to `false` to test the basic mode.

  const images = document.querySelectorAll(".liked-by-img");

  const upgradeElements = document.querySelectorAll(
    ".page-header p, .btn-tindog-primary"
  );

  function setBasicMode() {
    images.forEach((img) => {
      img.classList.add("liked-by-img");
    });
    upgradeElements.forEach((el) => {
      el.style.display = "block";
    });
  }

  function setPremiumMode() {
    images.forEach((img) => {
      img.classList.remove("liked-by-img");
    });
    upgradeElements.forEach((el) => {
      el.style.display = "none";
    });
  }

  if (isPremiumUser) {
    setPremiumMode();
  } else {
    setBasicMode();
  }
});
