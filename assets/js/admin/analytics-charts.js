document.addEventListener("DOMContentLoaded", async () => {
  const token = sessionStorage.getItem("userToken");
  if (!token) {
    console.error("No admin token found. Redirecting...");
    window.location.href = "../auth/admin.html";
    return;
  }

  const apiBase = "http://127.0.0.1:8000/api/analytics";
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Accept": "application/json"
  };

  // --- Fetch Functions ---

  const fetchOverview = async () => {
    try {
      const response = await fetch(`${apiBase}/overview`, { headers });
      const result = await response.json();
      if (result.success) {
        updateOverviewCards(result.data);
      }
    } catch (error) {
      console.error("Error fetching overview:", error);
    }
  };

  const fetchUserGrowth = async () => {
    try {
      const response = await fetch(`${apiBase}/user-growth`, { headers });
      const result = await response.json();
      if (result.success) {
        renderUserGrowthChart(result.data);
      }
    } catch (error) {
      console.error("Error fetching user growth:", error);
    }
  };

  const fetchDemographics = async () => {
    try {
      const response = await fetch(`${apiBase}/demographics`, { headers });
      const result = await response.json();
      if (result.success) {
        renderDogSizeChart(result.data.dog_sizes);
      }
    } catch (error) {
      console.error("Error fetching demographics:", error);
    }
  };

  const fetchEngagement = async () => {
    try {
      const response = await fetch(`${apiBase}/engagement`, { headers });
      const result = await response.json();
      if (result.success) {
        renderEngagementCharts(result.data);
      }
    } catch (error) {
      console.error("Error fetching engagement:", error);
    }
  };

  const fetchRevenue = async () => {
    try {
      const response = await fetch(`${apiBase}/revenue`, { headers });
      const result = await response.json();
      if (result.success) {
        renderRevenueCharts(result.data);
      }
    } catch (error) {
      console.error("Error fetching revenue:", error);
    }
  };

  // --- Render Functions ---

  const updateOverviewCards = (data) => {
    // Update KPI cards if they have specific IDs. 
    // Since the HTML didn't have IDs for values, we might need to add them or select by class carefully.
    // For robustness, let's assume we'll update the HTML to have IDs or use querySelector.
    // Based on previous file view, they didn't have unique IDs.
    // Let's try to find them by context or just update the text if we can identify the element.

    // Strategy: Select all .kpi-value and update in order? Risky.
    // Better: Update the HTML to include IDs. But I can't edit HTML right now easily without context switch.
    // Let's use specific selectors based on the icon or title.

    const cards = document.querySelectorAll('.kpi-card');
    cards.forEach(card => {
      const title = card.querySelector('.kpi-title').textContent.trim();
      const valueEl = card.querySelector('.kpi-value');

      if (title === 'Total Users') valueEl.textContent = data.total_users.toLocaleString();
      if (title === 'Monthly Revenue') valueEl.textContent = '₱' + data.monthly_revenue.toLocaleString();
      if (title === 'Open Reports') valueEl.textContent = data.open_reports;
      if (title === 'System Status') {
        valueEl.textContent = data.system_status;
        valueEl.className = `kpi-value mb-0 text-${data.system_status === 'Online' ? 'success' : 'danger'}`;
      }
    });
  };

  const renderUserGrowthChart = (data) => {
    const ctx = document.getElementById("userGrowthChart")?.getContext("2d");
    if (!ctx) return;
    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "New Users",
            data: data.values,
            borderColor: "#ff4c68",
            tension: 0.1,
            fill: true,
            backgroundColor: "rgba(255, 76, 104, 0.1)"
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  };

  const renderDogSizeChart = (sizes) => {
    const ctx = document.getElementById("dogSizeChart")?.getContext("2d");
    if (!ctx) return;
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Small", "Medium", "Large"],
        datasets: [
          {
            data: [sizes.small, sizes.medium, sizes.large],
            backgroundColor: ["#ffcd56", "#4bc0c0", "#9966ff"],
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  };

  const renderEngagementCharts = (data) => {
    // DAU Chart
    const dauCtx = document.getElementById("dailyActiveUsersChart")?.getContext("2d");
    if (dauCtx) {
      // Since we only have current DAU, we'll show a single bar or a placeholder message if history is empty
      if (data.dau_history && data.dau_history.length > 0) {
        // Render history if available
      } else {
        // Show current DAU as a single big number or a single bar?
        // Let's do a single bar for "Today"
        new Chart(dauCtx, {
          type: "bar",
          data: {
            labels: ["Today"],
            datasets: [{
              label: "Active Users",
              data: [data.current_dau],
              backgroundColor: "#36a2eb",
            }]
          },
          options: { responsive: true, maintainAspectRatio: false }
        });
      }
    }

    // Session Duration - We don't have data, so maybe hide or show "No Data"
    const sessionCtx = document.getElementById("sessionDurationChart")?.getContext("2d");
    if (sessionCtx) {
      // Placeholder for now as agreed (or just leave empty)
      // new Chart(sessionCtx, { ... });
    }
  };

  const renderRevenueCharts = (data) => {
    // Revenue by Plan
    const planCtx = document.getElementById("revenueByPlanChart")?.getContext("2d");
    if (planCtx) {
      new Chart(planCtx, {
        type: "doughnut",
        data: {
          labels: ["Labrador", "Mastiff"],
          datasets: [
            {
              data: [data.breakdown.labrador, data.breakdown.mastiff],
              backgroundColor: ["#4bc0c0", "#9966ff"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed !== null) {
                    label += new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(context.parsed);
                  }
                  return label;
                }
              }
            }
          }
        },
      });
    }

    // MRR Growth
    const mrrCtx = document.getElementById("mrrGrowthChart")?.getContext("2d");
    if (mrrCtx) {
      new Chart(mrrCtx, {
        type: "bar",
        data: {
          labels: data.history.labels,
          datasets: [
            {
              label: "MRR (PHP)",
              data: data.history.values,
              backgroundColor: "#ff6384",
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }
  };

  // Initial Load
  await fetchOverview();
  await fetchUserGrowth();
  await fetchDemographics();
  await fetchEngagement();
  await fetchRevenue();

  // Static table render (can be dynamic later)
  // Static table render (can be dynamic later)
  const renderRetentionCohortTable = () => {
    const tableBody = document.getElementById("retention-cohort-table");
    if (!tableBody) return;

    // Empty state for now to avoid fake data
    tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No retention data available yet.</td></tr>`;
  };
  renderRetentionCohortTable();
});
