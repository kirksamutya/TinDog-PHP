document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopButton = document.getElementById("scrollToTopBtn");
  if (!scrollToTopButton) return;

  const scrollThreshold = 200;

  const toggleButtonVisibility = () => {
    if (window.scrollY > scrollThreshold) {
      scrollToTopButton.classList.add("show");
    } else {
      scrollToTopButton.classList.remove("show");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleButtonVisibility);
  scrollToTopButton.addEventListener("click", scrollToTop);
});
