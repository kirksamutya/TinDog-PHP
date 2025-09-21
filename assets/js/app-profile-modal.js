document.addEventListener("DOMContentLoaded", () => {
  const profileModal = new bootstrap.Modal(
    document.getElementById("profileDetailModal")
  );
  const modalTitle = document.getElementById("profileModalLabel");
  const modalImage = document.getElementById("modal-main-image");
  const modalMetaInfo = document.getElementById("modal-meta-info");
  const modalBio = document.getElementById("modal-bio");
  const modalTags = document.getElementById("modal-tags");
  const modalGallery = document.getElementById("modal-photo-gallery");

  // This is placeholders, wait for PHP
  const dogProfiles = {
    Bruce: {
      name: "Bruce, 3",
      meta: `<div class="meta-item"><i class="bi bi-person-badge"></i><span>American Bulldog</span></div><div class="meta-item"><i class="bi bi-geo-alt"></i><span>Cebu City, PH</span></div>`,
      bio: "A tough guy with a heart of gold. Loves tummy rubs and long naps in the sun.",
      tags: ["Loyal", "Gentle", "Sleepy"],
      images: ["./assets/images/bruce.jpg"],
    },
    Pebbles: {
      name: "Pebbles, 4",
      meta: `<div class="meta-item"><i class="bi bi-person-badge"></i><span>Golden Retriever</span></div><div class="meta-item"><i class="bi bi-geo-alt"></i><span>Mandaue City, PH</span></div>`,
      bio: "Loves fetch and swimming. I can play all day long! Looking for a friend who can keep up.",
      tags: ["Energetic", "Friendly", "Playful"],
      images: ["./assets/images/dog-img.jpg"],
    },
    Dumbledoor: {
      name: "Rocky, 4",
      meta: `<div class="meta-item"><i class="bi bi-person-badge"></i><span>Shih Tzu</span></div><div class="meta-item"><i class="bi bi-geo-alt"></i><span>Lapu-Lapu City, PH</span></div>`,
      bio: "A gentle giant who loves long naps and considers himself a wizard. He enjoys quiet afternoons and thoughtful conversation.",
      tags: ["Wise", "Calm", "Cuddly", "Magical"],
      images: ["https://placedog.net/400/400?id=45"],
    },
  };

  document.querySelectorAll(".info-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevents the card from being dragged when clicking the button
      const dogName = e.currentTarget.dataset.dog;
      const profile = dogProfiles[dogName];

      if (profile) {
        modalTitle.textContent = profile.name;
        modalImage.src = profile.images[0];
        modalMetaInfo.innerHTML = profile.meta;
        modalBio.textContent = profile.bio;

        modalTags.innerHTML = "";
        profile.tags.forEach((tag) => {
          const span = document.createElement("span");
          span.className = "profile-tag";
          span.textContent = tag;
          modalTags.appendChild(span);
        });

        profileModal.show();
      }
    });
  });
});
