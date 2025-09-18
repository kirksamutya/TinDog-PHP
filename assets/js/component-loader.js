document.addEventListener("DOMContentLoaded", () => {
  const animateDashboardComponents = () => {
    const kpiCards = document.querySelectorAll(".kpi-card");
    const activityFeed = document.querySelector(".activity-feed-container");
    const pupsNearby = document.querySelector(".pups-nearby-card");
    const tipCard = document.querySelector(".tip-card");

    const componentsToAnimate = [
      ...kpiCards,
      pupsNearby,
      activityFeed,
      tipCard,
    ];

    componentsToAnimate.forEach((el, index) => {
      if (el) {
        setTimeout(() => {
          el.classList.add("visible");
        }, index * 100);
      }
    });
  };

  const fetchAndInjectComponent = (componentContainer) => {
    const componentUrl = componentContainer.dataset.component;
    if (!componentUrl) return;

    return fetch(componentUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Component not found at ${componentUrl}`);
        }
        return response.text();
      })
      .then((htmlContent) => {
        componentContainer.innerHTML = htmlContent;
        if (componentContainer.id === "sidebar-nav-container") {
          setActiveSidebarLink(componentContainer);
        }
      })
      .catch((error) => console.error("Component Loader Error:", error));
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

  const componentPromises = Array.from(
    document.querySelectorAll("[data-component]")
  ).map(fetchAndInjectComponent);

  Promise.all(componentPromises).then(() => {
    if (document.body.querySelector(".page-find-matches, .kpi-card")) {
      animateDashboardComponents();
    }
  });
});
