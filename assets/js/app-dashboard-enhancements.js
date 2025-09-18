document.addEventListener("DOMContentLoaded", () => {
  const animateDashboard = () => {
    const kpiCards = document.querySelectorAll(".kpi-card");
    const activityFeed = document.querySelector(".activity-feed-container");

    kpiCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("visible");
      }, index * 100);
    });

    if (activityFeed) {
      setTimeout(() => {
        activityFeed.classList.add("visible");
      }, kpiCards.length * 100);
    }
  };

  animateDashboard();
});
