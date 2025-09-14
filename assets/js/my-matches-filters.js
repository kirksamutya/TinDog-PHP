document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".btn-filter");
  const matchCards = document.querySelectorAll(".match-card");

  function filterMatches(filter) {
    matchCards.forEach((card) => {
      const status = card.dataset.status;
      if (filter === "all" || status === filter) {
        card.parentElement.style.display = "block";
      } else {
        card.parentElement.style.display = "none";
      }
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;
      filterMatches(filter);
    });
  });

  filterMatches("all");
});
