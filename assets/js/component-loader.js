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
            setActiveNavLink();
          }
        })
        .catch((error) => console.error(`Error loading component:`, error));
    }
  };

  const setActiveNavLink = () => {
    const navLinks = document.querySelectorAll(
      "#sidebar-nav-container .nav-link"
    );
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

  const specificComponents = [
    { selector: "#app-header", url: "./app-header.html" },
    { selector: "#sidebar-nav-container", url: "./sidebar-nav-content.html" },
  ];

  specificComponents.forEach((comp) => {
    const element = document.querySelector(comp.selector);
    if (element) {
      element.dataset.component = comp.url;
      loadComponent(element);
    }
  });

  document.querySelectorAll("[data-component]").forEach(loadComponent);
});
