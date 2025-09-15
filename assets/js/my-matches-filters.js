document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".btn-filter");
  const matchCardContainers = document.querySelectorAll(
    ".match-card-container"
  );

  const filterMatches = (filter) => {
    matchCardContainers.forEach((cardContainer) => {
      const card = cardContainer.querySelector(".match-card");
      const status = card.dataset.status;
      const shouldBeVisible = filter === "all" || status === filter;

      if (shouldBeVisible) {
        cardContainer.classList.remove("hidden");
      } else {
        cardContainer.classList.add("hidden");
      }
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      const filterValue = this.dataset.filter;
      filterMatches(filterValue);
    });
  });
});
