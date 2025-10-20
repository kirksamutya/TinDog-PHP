document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".notification-filter-btn");
  const activityItems = document.querySelectorAll(".activity-item");
  const emptyState = document.querySelector(".notifications-empty-state");

  const filterNotifications = (category) => {
    let itemsFound = false;
    activityItems.forEach((item) => {
      const itemCategory = item.dataset.category;
      if (category === "all" || itemCategory === category) {
        item.style.display = "flex";
        itemsFound = true;
      } else {
        item.style.display = "none";
      }
    });

    if (emptyState) {
      emptyState.style.display = itemsFound ? "none" : "block";
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      const filterCategory = this.dataset.filter;
      filterNotifications(filterCategory);
    });
  });
});
