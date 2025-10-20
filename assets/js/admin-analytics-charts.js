document.addEventListener("DOMContentLoaded", () => {
  const renderUserGrowthChart = () => {
    const ctx = document.getElementById("userGrowthChart")?.getContext("2d");
    if (!ctx) return;
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "New Users",
            data: [12, 19, 3, 5, 2, 3, 10],
            backgroundColor: "rgba(255, 76, 104, 0.2)",
            borderColor: "rgba(255, 76, 104, 1)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const renderSubscriptionChart = () => {
    const ctx = document.getElementById("subscriptionChart")?.getContext("2d");
    if (!ctx) return;
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Chihuahua (Free)", "Labrador", "Mastiff"],
        datasets: [
          {
            label: "Subscription Tiers",
            data: [650, 450, 148],
            backgroundColor: [
              "rgba(108, 117, 125, 0.7)",
              "rgba(0, 191, 255, 0.7)",
              "rgba(255, 76, 104, 0.7)",
            ],
            borderColor: ["#6c757d", "#00bfff", "#ff4c68"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  };

  const renderRevenueChart = () => {
    const ctx = document.getElementById("revenueChart")?.getContext("2d");
    if (!ctx) return;
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Monthly Revenue (PHP)",
            data: [12000, 19000, 15000, 21000, 18000, 24500],
            backgroundColor: "rgba(0, 191, 255, 0.7)",
            borderColor: "rgba(0, 191, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  };

  renderUserGrowthChart();
  renderSubscriptionChart();
  renderRevenueChart();
});
