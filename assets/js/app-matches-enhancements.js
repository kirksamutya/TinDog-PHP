document.addEventListener("DOMContentLoaded", () => {
  const animateMatchCards = () => {
    const matchCards = document.querySelectorAll(".match-card-container");
    matchCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("visible");
      }, index * 100);
    });
  };

  // Run animations after the component is loaded
  const observer = new MutationObserver((mutations, obs) => {
    const grid = document.getElementById("matches-grid");
    if (grid && grid.children.length > 0) {
      animateMatchCards();
      obs.disconnect(); // Stop observing once the cards are loaded
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
