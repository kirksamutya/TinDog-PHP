// assets/js/app-profile-modal.js
document.addEventListener("DOMContentLoaded", () => {
  const profileModalElement = document.getElementById("profileDetailModal");
  if (!profileModalElement) return;

  const profileModal = new bootstrap.Modal(profileModalElement);
  const modalTitle = document.getElementById("profileModalLabel");
  const modalImage = document.getElementById("modal-main-image");
  const modalMetaInfo = document.getElementById("modal-meta-info");
  const modalBio = document.getElementById("modal-bio");

  const showProfileModal = (userId) => {
    const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};
    const user = allUsers[userId];

    if (user) {
      modalTitle.textContent = `${user.dogName}, ${user.age}`;
      modalImage.src = `https://placedog.net/400/400?id=${user.age}`; // Placeholder image
      modalMetaInfo.innerHTML = `
        <div class="meta-item"><i class="bi bi-person-badge"></i><span>${user.dogBreed}</span></div>
        <div class="meta-item"><i class="bi bi-geo-alt"></i><span>${user.location}</span></div>
      `;
      modalBio.textContent = user.bio || "No bio provided.";
      profileModal.show();
    }
  };

  document.body.addEventListener("click", (event) => {
    const infoButton = event.target.closest(".info-button");
    if (infoButton) {
      event.stopPropagation();
      const userId = infoButton.dataset.userId;
      if (userId) {
        showProfileModal(userId);
      }
    }
  });
});
