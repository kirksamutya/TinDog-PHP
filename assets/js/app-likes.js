document.addEventListener("DOMContentLoaded", function () {
  const page = document.getElementById("likes-page");
  if (!page) return;

  const allUsers = DataService.getAllUsers();
  const loggedInUserId = DataService.getLoggedInUserId();
  const currentUser = allUsers[loggedInUserId];

  const isPremiumUser =
    currentUser &&
    (currentUser.plan === "labrador" || currentUser.plan === "mastiff");

  const images = document.querySelectorAll(".liked-by-img");
  const upgradeMessage = document.getElementById("upgrade-message");
  const upgradeButton = document.getElementById("upgrade-button");

  if (isPremiumUser) {
    images.forEach((img) => {
      img.classList.remove("liked-by-img");
      img.classList.add("liked-by-img-unblurred");
    });
    if (upgradeMessage) upgradeMessage.style.display = "none";
    if (upgradeButton) upgradeButton.style.display = "none";
  } else {
    images.forEach((img) => {
      img.classList.add("liked-by-img");
      img.classList.remove("liked-by-img-unblurred");
    });
    if (upgradeMessage) upgradeMessage.style.display = "block";
    if (upgradeButton) upgradeButton.style.display = "block";
  }
});
