document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".btn-filter");
  const matchCardContainers = document.querySelectorAll(
    ".match-card-container"
  );
  const noMatchesMessage = document.getElementById("no-matches-found");

  const filterMatches = (filter) => {
    let matchesFound = false;
    matchCardContainers.forEach((cardContainer) => {
      const status = cardContainer.dataset.status;
      const shouldBeVisible = filter === "all" || status === filter;

      cardContainer.style.display = shouldBeVisible ? "block" : "none";

      if (shouldBeVisible) {
        matchesFound = true;
      }
    });

    if (noMatchesMessage) {
      noMatchesMessage.style.display = matchesFound ? "none" : "block";
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      const filterValue = this.dataset.filter;
      filterMatches(filterValue);
    });
  });

  const animateMatchCards = () => {
    const matchCards = document.querySelectorAll(".match-card-container");
    matchCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("visible");
      }, index * 100);
    });
  };

  const observer = new MutationObserver((mutations, obs) => {
    const grid = document.getElementById("matches-grid");
    if (grid && grid.children.length > 0) {
      animateMatchCards();
      obs.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
