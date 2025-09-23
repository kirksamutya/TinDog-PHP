// document.addEventListener("DOMContentLoaded", () => {
//   // --- Initialize dummy stats ---
//   let stats = {
//     totalUsers: 980, // new users stat
//     totalMatches: 1245,
//     revenue: 1250, // replaced premiumMatches
//     reports: 45, // replaced engagementRate
//   };

//   const users = [
//     "Bella",
//     "Max",
//     "Charlie",
//     "Lucy",
//     "Daisy",
//     "Rocky",
//     "Luna",
//     "Cooper",
//     "Milo",
//     "Chloe",
//   ];
//   const statuses = ["Active", "Ended", "Inactive"];

//   function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

//   // --- Update stats and UI ---
//   function updateStats() {
//     // Randomly adjust stats for live feel
//     stats.totalUsers += Math.random() > 0.8 ? 1 : 0; // simulate new users
//     stats.totalMatches += getRandomInt(0, 3);

//     // --- LIVE Revenue ---
//     stats.revenue += getRandomInt(-20, 50); // revenue fluctuates
//     stats.revenue = Math.max(0, stats.revenue); // no negative revenue

//     // --- LIVE Reports ---
//     stats.reports += getRandomInt(-2, 3); // reports fluctuate
//     stats.reports = Math.min(100, Math.max(0, stats.reports));

//     // Update cards
//     const usersEl = document.getElementById("total-users");
//     const matchesEl = document.getElementById("total-matches");
//     const revenueEl = document.getElementById("revenue-amount");
//     const reportsEl = document.getElementById("reports-count");
//     const revenueBar = document.getElementById("revenue-progress");
//     const reportsBar = document.getElementById("reports-progress");

//     if (usersEl) usersEl.textContent = stats.totalUsers.toLocaleString();
//     if (matchesEl) matchesEl.textContent = stats.totalMatches.toLocaleString();
//     if (revenueEl) revenueEl.textContent = `$${stats.revenue.toLocaleString()}`;
//     if (reportsEl) reportsEl.textContent = stats.reports.toLocaleString();

//     if (revenueBar)
//       revenueBar.style.width = Math.min(100, stats.revenue / 50) + "%";
//     if (reportsBar) reportsBar.style.width = stats.reports + "%";

//     // --- Update Matches table if exists ---
//     const tbody = document.getElementById("matches-table-body");
//     if (tbody) {
//       const userA = users[getRandomInt(0, users.length - 1)];
//       let userB;
//       do {
//         userB = users[getRandomInt(0, users.length - 1)];
//       } while (userB === userA);

//       const dateStr = new Date().toISOString().split("T")[0];
//       const status = statuses[getRandomInt(0, statuses.length - 1)];
//       const messages = getRandomInt(5, 200);

//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${userA}</td>
//         <td>${userB}</td>
//         <td>${dateStr}</td>
//         <td><span class="badge ${
//           status === "Active"
//             ? "bg-success"
//             : status === "Ended"
//             ? "bg-secondary"
//             : "bg-warning text-dark"
//         }">${status}</span></td>
//         <td>${messages}</td>
//       `;
//       tbody.prepend(row);
//       if (tbody.rows.length > 5) tbody.deleteRow(-1);
//     }
//   }

//   // Initial render
//   updateStats();

//   // Live update every 4s
//   setInterval(updateStats, 4000);
// });
