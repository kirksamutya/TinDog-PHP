document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get("tab");

  if (tab) {
    const tabElement = document.querySelector(
      `#edit-profile-tabs a[href="#${tab}-info"]`
    );
    if (tabElement) {
      const bootstrapTab = new bootstrap.Tab(tabElement);
      bootstrapTab.show();
    }
  }
});
