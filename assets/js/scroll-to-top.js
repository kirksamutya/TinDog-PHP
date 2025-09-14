document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  const scrollThreshold = 200;
  let lastScrollY = window.scrollY;

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > scrollThreshold && currentScrollY > lastScrollY) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }

    lastScrollY = currentScrollY;
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  window.addEventListener("scroll", handleScroll);
  scrollBtn.addEventListener("click", scrollToTop);
});
