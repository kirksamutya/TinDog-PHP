document.addEventListener("DOMContentLoaded", function () {
  // --- Logic for showing the correct tab based on URL parameter ---
  const urlParams = new URLSearchParams(window.location.search);
  const tabToShow = urlParams.get("tab");

  if (tabToShow) {
    const tabElement = document.querySelector(
      `#edit-profile-tabs a[href="#${tabToShow}-info"], .profile-card .nav-tabs a[href="#${tabToShow}-profile"]`
    );
    if (tabElement) {
      const bootstrapTab = new bootstrap.Tab(tabElement);
      bootstrapTab.show();
    }
  }

  // --- Logic for swapping the avatar image on the profile page ---
  const profilePageTabs = document.querySelectorAll(
    ".profile-card .nav-link[data-avatar-src]"
  );
  const mainAvatar = document.querySelector(".profile-avatar");

  if (profilePageTabs.length && mainAvatar) {
    profilePageTabs.forEach((tab) => {
      tab.addEventListener("shown.bs.tab", function (event) {
        const newAvatarSrc = event.target.dataset.avatarSrc;
        if (newAvatarSrc) {
          mainAvatar.src = newAvatarSrc;
        }
      });
    });
  }
});
