// --- START: Accurate Base Path Calculation ---
let basePath = "/"; // Default for local development
(function () {
  const path = window.location.pathname;
  const repoName = "/TinDog-PHP/";
  const repoIndex = path.indexOf(repoName);
  if (repoIndex > -1) {
    basePath = path.substring(0, repoIndex + repoName.length);
  }
})();
// --- END: Accurate Base Path Calculation ---

document.addEventListener("DOMContentLoaded", () => {
  const fetchAndInjectComponent = async (componentContainer) => {
    const componentUrl = componentContainer.dataset.component;
    if (!componentUrl) return;

    // Use the pre-calculated basePath to fetch the component correctly
    const finalComponentUrl = new URL(componentUrl, window.location.href)
      .pathname;

    try {
      const response = await fetch(finalComponentUrl);
      if (!response.ok) {
        throw new Error(`Component not found at ${finalComponentUrl}`);
      }
      let htmlContent = await response.text();

      // Regex to find src or href attributes that start with "/" but not "//"
      // and prepend the correct basePath.
      htmlContent = htmlContent.replace(
        /(src|href)="\/(?!\/)/g,
        `$1="${basePath}`
      );

      componentContainer.innerHTML = htmlContent;

      if (componentContainer.id === "sidebar-nav-container") {
        setActiveSidebarLink(componentContainer);
      }
    } catch (error) {
      console.error("Component Loader Error:", error);
    }
  };

  const setActiveSidebarLink = (sidebar) => {
    const currentPagePath = window.location.pathname;
    const navLinks = sidebar.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      // Create a full URL object to easily get the pathname
      const linkPath = new URL(link.href, window.location.origin).pathname;
      if (currentPagePath === linkPath) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  const animateDashboardComponents = () => {
    const componentsToAnimate = document.querySelectorAll(
      ".kpi-card, .pups-nearby-card, .activity-feed-container, .tip-card"
    );
    componentsToAnimate.forEach((el, index) => {
      if (el) {
        setTimeout(() => {
          el.classList.add("visible");
        }, index * 100);
      }
    });
  };

  const componentPromises = Array.from(
    document.querySelectorAll("[data-component]")
  ).map(fetchAndInjectComponent);

  Promise.all(componentPromises).then(() => {
    document.dispatchEvent(new Event("componentsLoaded"));
    if (document.body.querySelector(".page-find-matches, .kpi-card")) {
      animateDashboardComponents();
    }
  });
});
