document.addEventListener("DOMContentLoaded", () => {
  const initUserProfile = async () => {
    const token = sessionStorage.getItem("userToken");
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          populateProfile(result.data.user);
        }
      }
    } catch (error) {
      console.error("Profile Load Error:", error);
    }
  };

  const populateProfile = (user) => {
    const setText = (id, text) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = text || "N/A";
      }
    };

    // Dog Profile
    setText("dog-name", user.dog_name || user.display_name || "Your Dog");
    setText("dog-breed", user.dog_breed || "Breed not set");
    setText("dog-sex", user.dog_sex ? (user.dog_sex.charAt(0).toUpperCase() + user.dog_sex.slice(1)) : "Sex not set");
    setText("dog-size", user.dog_size ? (user.dog_size.charAt(0).toUpperCase() + user.dog_size.slice(1)) : "Size not set");
    setText("dog-age", user.dog_age ? `${user.dog_age} years old` : "Age not set");
    setText("dog-bio", user.dog_bio || "No bio yet.");

    // Owner Profile
    setText("owner-name", user.name);
    setText("owner-location", user.location || "Location not set");
    setText("owner-bio", user.owner_bio || "No bio yet.");

    // Images
    const coverPhoto = document.querySelector(".profile-cover-photo img");
    const dogProfileAvatar = document.querySelector(".profile-avatar");

    const defaultCover = "../../assets/images/default-cover.jpg";
    const defaultDogAvatar = "../../assets/images/default-avatar.png";
    const defaultPersonAvatar = "../../assets/images/default-person.png";

    // Cover photo
    if (coverPhoto) coverPhoto.src = user.dog_cover_photo || defaultCover;

    // Set initial avatar for Dog's Profile (default view)
    if (dogProfileAvatar) {
      dogProfileAvatar.src = user.dog_avatar || defaultDogAvatar;
    }

    // Handle tab switching to change the avatar
    const dogTab = document.querySelector('a[href="#dog-profile"]');
    const ownerTab = document.querySelector('a[href="#owner-profile"]');

    if (dogTab && ownerTab && dogProfileAvatar) {
      dogTab.addEventListener('click', () => {
        dogProfileAvatar.src = user.dog_avatar || defaultDogAvatar;
      });

      ownerTab.addEventListener('click', () => {
        dogProfileAvatar.src = user.owner_avatar || defaultPersonAvatar;
      });
    }

    // Personalities
    const personalitiesContainer = document.querySelector(".profile-details .mt-2");
    if (personalitiesContainer && user.dog_personalities) {
      const personalities = user.dog_personalities.split(',').filter(p => p.trim());
      if (personalities.length > 0) {
        personalitiesContainer.innerHTML = personalities.map(p =>
          `<span class="profile-tag">${p.trim()}</span>`
        ).join('');
      }
    }

    // Hide photo gallery if no photos
    const photoGallery = document.querySelector(".photo-gallery-grid");
    if (photoGallery) {
      photoGallery.style.display = "none";
      const galleryHeading = Array.from(document.querySelectorAll('h5')).find(h =>
        h.textContent.includes('Photo Gallery')
      );
      if (galleryHeading) {
        galleryHeading.style.display = "none";
      }
    }
  };

  if (document.querySelector(".page-profile")) {
    document.addEventListener("componentsLoaded", initUserProfile);
  }
});
