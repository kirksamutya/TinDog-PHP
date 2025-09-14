document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (!scrollBtn) return;

  const scrollThreshold = 200;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", handleScroll);
  scrollBtn.addEventListener("click", scrollToTop);
});
