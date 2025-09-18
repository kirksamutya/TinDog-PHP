document.addEventListener("DOMContentLoaded", () => {
  const fetchAndInjectComponent = (componentContainer) => {
    const componentUrl = componentContainer.dataset.component;
    if (!componentUrl) return;

    fetch(componentUrl)
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

  document
    .querySelectorAll("[data-component]")
    .forEach(fetchAndInjectComponent);
});
