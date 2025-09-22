// Fake analytics updater
document.addEventListener("DOMContentLoaded", () => {
  let users = 1200;
  let matches = 320;
  let reports = 15;
  let revenue = 5400;

  function updateDashboard() {
    // Random growth
    users += Math.floor(Math.random() * 5);
    matches += Math.floor(Math.random() * 3);
    reports += Math.random() > 0.8 ? 1 : 0;
    revenue += Math.floor(Math.random() * 20);

    // Update text
    document.getElementById("total-users").textContent = users.toLocaleString();
    document.getElementById("active-matches").textContent =
      matches.toLocaleString();
    document.getElementById("reports").textContent = reports.toLocaleString();
    document.getElementById(
      "revenue"
    ).textContent = `$${revenue.toLocaleString()}`;

    // Progress Bars (relative fake scaling)
    document.getElementById("reports-progress").style.width = `${Math.min(
      reports,
      100
    )}%`;
    document.getElementById("revenue-progress").style.width = `${Math.min(
      revenue / 100,
      100
    )}%`;
  }

  // Initial update
  updateDashboard();

  // Update every 3 seconds
  setInterval(updateDashboard, 3000);
});
