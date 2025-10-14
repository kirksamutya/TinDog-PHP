function getBasePath() {
  const path = window.location.pathname;
  const repoName = "/TinDog-PHP/";
  const repoIndex = path.indexOf(repoName);
  if (repoIndex > -1) {
    return path.substring(0, repoIndex + repoName.length);
  }
  return "/";
}

document.addEventListener("DOMContentLoaded", () => {
  const fetchAndInjectComponent = async (componentContainer) => {
    const componentUrl = componentContainer.dataset.component;
    if (!componentUrl) return;

    try {
      const response = await fetch(componentUrl);
      if (!response.ok) {
        throw new Error(`Component not found at ${componentUrl}`);
      }
      let htmlContent = await response.text();
      const basePath = getBasePath();

      htmlContent = htmlContent.replace(/(src|href)="\//g, `$1="${basePath}`);

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
      const linkPath = new URL(link.href).pathname;
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
