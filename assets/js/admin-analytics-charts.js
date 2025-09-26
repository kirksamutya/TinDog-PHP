document.addEventListener("DOMContentLoaded", () => {
  const allUsers = DataService.getAllUsers();
  const allLikes = DataService.getAllLikes();
  const allConversations = DataService.getAllMessages();

  const calculateStats = () => {
    const userList = Object.values(allUsers);
    const totalUsers = userList.filter((u) => u.role === "user").length;

    const planCounts = { chihuahua: 0, labrador: 0, mastiff: 0 };
    const sizeCounts = { small: 0, medium: 0, large: 0 };
    userList.forEach((user) => {
      if (user.plan && planCounts[user.plan] !== undefined) {
        planCounts[user.plan]++;
      }
      if (user.dogSize && sizeCounts[user.dogSize] !== undefined) {
        sizeCounts[user.dogSize]++;
      }
    });

    return { planCounts, sizeCounts };
  };

  const generatePlaceholderData = (numPoints, min, max) => {
    return Array.from({ length: numPoints }, () =>
      Math.floor(Math.random() * (max - min + 1) + min)
    );
  };

  const renderUserGrowthChart = () => {
    const ctx = document.getElementById("userGrowthChart")?.getContext("2d");
    if (!ctx) return;
    new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
        datasets: [
          {
            label: "New Users",
            data: generatePlaceholderData(30, 1, 20),
            borderColor: "#ff4c68",
            tension: 0.1,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  };

  const renderDogSizeChart = (stats) => {
    const ctx = document.getElementById("dogSizeChart")?.getContext("2d");
    if (!ctx) return;
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Small", "Medium", "Large"],
        datasets: [
          {
            data: [
              stats.sizeCounts.small,
              stats.sizeCounts.medium,
              stats.sizeCounts.large,
            ],
            backgroundColor: ["#ffcd56", "#4bc0c0", "#9966ff"],
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  };

  const renderDailyActiveUsersChart = () => {
    const ctx = document
      .getElementById("dailyActiveUsersChart")
      ?.getContext("2d");
    if (!ctx) return;
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
        datasets: [
          {
            label: "DAU",
            data: generatePlaceholderData(30, 50, 250),
            backgroundColor: "#36a2eb",
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  };

  const renderSessionDurationChart = () => {
    const ctx = document
      .getElementById("sessionDurationChart")
      ?.getContext("2d");
    if (!ctx) return;
    new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
        datasets: [
          {
            label: "Avg. Session (min)",
            data: generatePlaceholderData(30, 5, 25),
            borderColor: "#ff9f40",
            tension: 0.1,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  };

  const renderRetentionCohortTable = () => {
    const tableBody = document.getElementById("retention-cohort-table");
    if (!tableBody) return;
    const cohorts = [
      { cohort: "Sep 1 - Sep 7", values: ["100%", "55%", "40%", "30%"] },
      { cohort: "Sep 8 - Sep 14", values: ["100%", "60%", "45%", "—"] },
      { cohort: "Sep 15 - Sep 21", values: ["100%", "65%", "—", "—"] },
      { cohort: "Sep 22 - Today", values: ["100%", "—", "—", "—"] },
    ];
    tableBody.innerHTML = cohorts
      .map(
        (c) => `
      <tr>
        <th class="text-start">${c.cohort}</th>
        ${c.values.map((v) => `<td>${v}</td>`).join("")}
      </tr>
    `
      )
      .join("");
  };

  const renderRevenueByPlanChart = (stats) => {
    const ctx = document.getElementById("revenueByPlanChart")?.getContext("2d");
    if (!ctx) return;
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Labrador", "Mastiff"],
        datasets: [
          {
            data: [
              stats.planCounts.labrador * 49,
              stats.planCounts.mastiff * 99,
            ],
            backgroundColor: ["#4bc0c0", "#9966ff"],
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  };

  const renderMrrGrowthChart = () => {
    const ctx = document.getElementById("mrrGrowthChart")?.getContext("2d");
    if (!ctx) return;
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        datasets: [
          {
            label: "MRR (PHP)",
            data: [18000, 21000, 24500, 23000, 26000, 29000],
            backgroundColor: "#ff6384",
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  };

  const stats = calculateStats();
  renderUserGrowthChart();
  renderDogSizeChart(stats);
  renderDailyActiveUsersChart();
  renderSessionDurationChart();
  renderRetentionCohortTable();
  renderRevenueByPlanChart(stats);
  renderMrrGrowthChart();
});
