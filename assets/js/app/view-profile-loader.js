document.addEventListener("DOMContentLoaded", function () {
  const loadUserProfile = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user");

    const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};
    const userData = allUsers[userId];

    if (userData) {
      document.getElementById(
        "dog-name"
      ).textContent = `${userData.dogName}, ${userData.age}`;
      document.getElementById("dog-breed").textContent = userData.dogBreed;
      document.getElementById("dog-sex").textContent = userData.dogSex;
      document.getElementById("dog-size").textContent = userData.dogSize;
      document.getElementById(
        "dog-age"
      ).textContent = `${userData.age} years old`;
      document.getElementById("dog-bio").textContent = userData.bio;

      document.getElementById(
        "owner-name"
      ).textContent = `${userData.firstName} ${userData.lastName}`;
      document.getElementById("owner-location").textContent = userData.location;
      document.getElementById("owner-bio").textContent =
        userData.ownerBio || "No owner bio provided.";

      const messageUserBtn = document.getElementById("message-user-btn");
      if (messageUserBtn) {
        messageUserBtn.href = `./app-messages.html?user=${userId}`;
      }

      const profileAvatar = document.getElementById("profile-avatar");
      if (profileAvatar && userData.dogAvatar) {
        profileAvatar.src = userData.dogAvatar;
        profileAvatar.alt = `${userData.dogName}'s profile avatar`;
      }

      const coverPhoto = document.getElementById("cover-photo");
      if (coverPhoto && userData.dogCoverPhoto) {
        coverPhoto.src = userData.dogCoverPhoto;
        coverPhoto.alt = `${userData.dogName}'s cover photo`;
      }
    }
  };

  if (document.querySelector(".page-profile")) {
    document.addEventListener("componentsLoaded", loadUserProfile);
  }
});
