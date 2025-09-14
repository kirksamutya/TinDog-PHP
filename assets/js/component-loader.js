document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (selector, url) => {
    const element = document.querySelector(selector);
    if (element) {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Component not found at ${url}`);
          }
          return response.text();
        })
        .then((data) => {
          element.innerHTML = data;
          if (selector === "#sidebar-nav-container") {
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

  loadComponent("#site-header", "./header.html");
  loadComponent("#app-header", "./app-header.html");
  loadComponent("#site-footer", "./footer.html");
  loadComponent("#sidebar-nav-container", "./sidebar-nav-content.html");
});
