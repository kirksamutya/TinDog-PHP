document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.querySelector(".swipe-deck");
  const actionButtons = document.querySelector(".swipe-actions");
  let candidates = [];

  const initSwipeHandler = async () => {
    const token = sessionStorage.getItem("userToken");
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/discovery", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          candidates = result.data;
          renderCards();
        }
      }
    } catch (error) {
      console.error("Discovery Error:", error);
    }
  };

  const renderCards = () => {
    if (!cardContainer) return;
    cardContainer.innerHTML = "";

    if (candidates.length === 0) {
      const noMoreState = document.getElementById("no-more-matches");
      if (noMoreState) noMoreState.style.display = "block";
      if (actionButtons) actionButtons.style.display = "none";
      return;
    }

    const noMoreState = document.getElementById("no-more-matches");
    if (noMoreState) noMoreState.style.display = "none";
    if (actionButtons) actionButtons.style.display = "flex";

    // Render in reverse order so the first one is on top
    candidates.slice().reverse().forEach((candidate, index) => {
      const card = document.createElement("div");
      card.classList.add("match-card");

      // Resolve avatar path
      const avatarSrc = DataService.resolvePath(candidate.avatar) || DataService.resolvePath('assets/images/default-avatar.png');

      card.innerHTML = `
        <img src="${avatarSrc}" class="card-img-top" alt="${candidate.name}">
        <div class="card-info-overlay">
          <h3 class="card-title mb-0">${candidate.name}, ${candidate.age}</h3>
          <p class="mb-0 small">${candidate.breed}</p>
          <button class="btn btn-light btn-sm info-button rounded-circle" type="button">
            <i class="bi bi-info-lg"></i>
          </button>
        </div>
      `;

      // Add click listener for info button
      const infoBtn = card.querySelector(".info-button");
      if (infoBtn) {
        infoBtn.addEventListener("click", (e) => {
          e.stopPropagation(); // Prevent card drag/swipe if implemented later
          openProfileModal(candidate);
        });
      }

      cardContainer.appendChild(card);
    });
  };

  const handleSwipe = async (type) => {
    if (candidates.length === 0) return;

    const currentCandidate = candidates[0]; // The one on top
    const token = sessionStorage.getItem("userToken");

    // Optimistic UI update: Remove card immediately
    const cards = document.querySelectorAll(".match-card");
    const topCard = cards[cards.length - 1]; // Last one rendered is on top

    if (topCard) {
      topCard.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      if (type === 'like' || type === 'super_like') {
        topCard.style.transform = "translateX(1000px) rotate(30deg)";
      } else {
        topCard.style.transform = "translateX(-1000px) rotate(-30deg)";
      }
      topCard.style.opacity = "0";

      setTimeout(() => {
        topCard.remove();
      }, 500);
    }

    // Remove from local array
    candidates.shift();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/swipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          target_user_id: currentCandidate.id,
          type: type,
        }),
      });

      const result = await response.json();
      console.log("Swipe Result:", result); // Debug log
      if (result.success && result.is_match) {
        console.log("It's a match! Showing modal..."); // Debug log
        showMatchModal(currentCandidate);
      }

      if (candidates.length === 0) {
        renderCards(); // Show "No more pups" message
      }

    } catch (error) {
      console.error("Swipe Error:", error);
      // Revert UI if error? For now, just log it.
    }
  };

  const showMatchModal = (candidate) => {
    // Check if modal container exists, if not create it
    let modal = document.getElementById("match-modal");

    // Resolve avatars
    const candidateAvatar = DataService.resolvePath(candidate.avatar) || DataService.resolvePath('assets/images/default-avatar.png');
    // Try to get my avatar from sidebar or default
    const sidebarAvatar = document.getElementById("sidebar-user-avatar");
    const myAvatarSrc = sidebarAvatar ? sidebarAvatar.src : DataService.resolvePath('assets/images/default-avatar.png');

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "match-modal";
      modal.classList.add("modal", "fade");
      modal.setAttribute("tabindex", "-1");
      modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-center p-4" style="background: linear-gradient(to right, #ff4b2b, #ff416c); color: white;">
            <div class="modal-body">
              <h2 class="display-4 fw-bold mb-3">It's a Match!</h2>
              <p class="lead">You and ${candidate.name} have liked each other.</p>
              <div class="d-flex justify-content-center gap-4 my-4">
                <img src="${myAvatarSrc}" id="match-my-avatar" class="rounded-circle border border-3 border-white" width="100" height="100" style="object-fit: cover;">
                <img src="${candidateAvatar}" id="match-candidate-avatar" class="rounded-circle border border-3 border-white" width="100" height="100" style="object-fit: cover;">
              </div>
              <div class="d-grid gap-2">
                <a href="../messages.html" class="btn btn-light btn-lg rounded-pill text-danger fw-bold">Send a Message</a>
                <button type="button" class="btn btn-outline-light btn-lg rounded-pill" data-bs-dismiss="modal">Keep Swiping</button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    } else {
      // Update candidate image if modal already exists
      const candidateImg = modal.querySelector("#match-candidate-avatar");
      const myImg = modal.querySelector("#match-my-avatar");
      const nameEl = modal.querySelector("p.lead");

      if (candidateImg) candidateImg.src = candidateAvatar;
      if (myImg) myImg.src = myAvatarSrc;
      if (nameEl) nameEl.textContent = `You and ${candidate.name} have liked each other.`;
    }

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
  };

  const openProfileModal = (candidate) => {
    const modalEl = document.getElementById("profileDetailModal");
    if (!modalEl) return;

    const mainImage = document.getElementById("modal-main-image");
    const metaInfo = document.getElementById("modal-meta-info");
    const bio = document.getElementById("modal-bio");
    const modalTitle = document.getElementById("profileModalLabel");

    // Resolve avatar
    const avatarSrc = DataService.resolvePath(candidate.avatar) || DataService.resolvePath('assets/images/default-avatar.png');

    if (mainImage) mainImage.src = avatarSrc;
    if (modalTitle) modalTitle.textContent = candidate.name;
    if (bio) bio.textContent = candidate.bio || "No bio available.";

    if (metaInfo) {
      // Personalities
      let personalitiesHtml = '';
      const rawPersonalities = candidate.personalities;
      if (rawPersonalities) {
        const personalities = rawPersonalities.split(',').filter(p => p.trim());
        if (personalities.length > 0) {
          personalitiesHtml = '<div class="mb-2">' + personalities.map(p =>
            `<span class="badge badge-gradient rounded-pill me-1 mb-1">${p.trim()}</span>`
          ).join('') + '</div>';
        }
      }

      metaInfo.innerHTML = `
        ${personalitiesHtml}
        <div class="d-flex flex-wrap gap-2">
            <span class="badge bg-light text-dark border"><i class="bi bi-geo-alt-fill text-danger me-1"></i>${candidate.distance || 'Nearby'}</span>
            <span class="badge bg-light text-dark border"><i class="bi bi-gender-ambiguous text-primary me-1"></i>${candidate.gender || 'Dog'}</span>
            <span class="badge bg-light text-dark border"><i class="bi bi-paw text-warning me-1"></i>${candidate.breed}</span>
        </div>
      `;
    }

    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  };

  // Bind buttons
  const dislikeBtn = document.querySelector(".btn-swipe.dislike");
  const likeBtn = document.querySelector(".btn-swipe.like");

  if (dislikeBtn) dislikeBtn.addEventListener("click", () => handleSwipe('nope'));
  if (likeBtn) likeBtn.addEventListener("click", () => handleSwipe('like'));

  initSwipeHandler();
});
