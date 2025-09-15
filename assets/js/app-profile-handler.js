document.addEventListener("DOMContentLoaded", function () {
  const handleTabSwitchFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabToShow = urlParams.get("tab");
    if (!tabToShow) return;

    const tabElement = document.querySelector(
      `#edit-profile-tabs a[href="#${tabToShow}-info"], .profile-card .nav-tabs a[href="#${tabToShow}-profile"]`
    );
    if (tabElement) {
      const bootstrapTab = new bootstrap.Tab(tabElement);
      bootstrapTab.show();
    }
  };

  const handleAvatarSwapping = () => {
    const profilePageTabs = document.querySelectorAll(
      ".profile-card .nav-link[data-avatar-src]"
    );
    const mainAvatar = document.querySelector(".profile-avatar");
    if (!profilePageTabs.length || !mainAvatar) return;

    profilePageTabs.forEach((tab) => {
      tab.addEventListener("shown.bs.tab", function (event) {
        const newAvatarSource = event.target.dataset.avatarSrc;
        if (newAvatarSource) {
          mainAvatar.src = newAvatarSource;
        }
      });
    });
  };

  handleTabSwitchFromUrl();
  handleAvatarSwapping();
});
