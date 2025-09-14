document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (element) => {
    const url = element.dataset.component;
    if (url) {
      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error(`Component not found at ${url}`);
          return response.text();
        })
        .then((data) => {
          element.innerHTML = data;
          if (element.id === "sidebar-nav-container") {
            setActiveNavLink(element);
          }
        })
        .catch((error) => console.error(`Error loading component:`, error));
    }
  };

  const setActiveNavLink = (sidebar) => {
    const navLinks = sidebar.querySelectorAll(".nav-link");
    const currentPage = window.location.pathname.split("/").pop();
    navLinks.forEach((link) => {
      const linkPage = link.getAttribute("href").split("/").pop();
      if (linkPage === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  document.querySelectorAll("[data-component]").forEach(loadComponent);
});
