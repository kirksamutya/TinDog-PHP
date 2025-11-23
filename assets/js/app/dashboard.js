document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("userToken");
  if (!token) {
    window.location.href = "../auth/index.html";
    return;
  }

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          updateDashboardUI(result.data);
        }
      } else {
        console.error("Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  const updateDashboardUI = (data) => {
    // 1. Greeting
    const greetingElement = document.getElementById("welcome-greeting");
    if (greetingElement) greetingElement.textContent = data.greeting;

    // 2. Stats
    document.querySelector(".kpi-card.matches .kpi-value").textContent = data.stats.newMatches;
    document.querySelector(".kpi-card.messages .kpi-value").textContent = data.stats.unreadMessages;
    document.querySelector(".kpi-card.messages .kpi-caption").textContent = `from ${data.stats.unreadConversations} conversations`;
    document.querySelector(".kpi-card.views .kpi-value").textContent = data.stats.profileViews;
    document.querySelector(".kpi-card.plan .kpi-value").textContent = data.stats.currentPlan;

    // 3. Pups Nearby
    renderPupsNearby(data.pupsNearby);

    // 4. Tip of the Day
    const tipElement = document.getElementById("dog-tip-of-the-day");
    if (tipElement) tipElement.textContent = data.tip;

    // 5. Update Sidebar (if handler exists)
    if (typeof SidebarHandler !== 'undefined') {
      SidebarHandler.updateUI(data.user);
    }
  };

  const renderPupsNearby = (pups) => {
    const container = document.getElementById("pups-nearby-component");
    if (!container) return;

    // Clear existing content (or the placeholder component)
    container.innerHTML = `
      <div class="card h-100">
        <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Pups Nearby</h5>
        </div>
        <div class="card-body p-0">
          <div class="list-group list-group-flush" id="pups-list">
            <!-- Pups go here -->
          </div>
        </div>
      </div>
    `;

    const list = container.querySelector("#pups-list");

    if (pups.length === 0) {
      list.innerHTML = '<div class="p-3 text-center text-muted">No pups nearby yet.</div>';
      return;
    }

    pups.forEach(pup => {
      const item = document.createElement("div");
      item.className = "list-group-item d-flex align-items-center border-0 px-3 py-2";
      item.innerHTML = `
        <img src="${pup.avatar}" class="rounded-circle me-3" width="40" height="40" style="object-fit: cover;">
        <div class="flex-grow-1">
          <h6 class="mb-0">${pup.name}</h6>
          <small class="text-muted">${pup.distance}</small>
        </div>
        <button class="btn btn-sm btn-tindog-primary rounded-pill">View</button>
      `;
      list.appendChild(item);
    });
  };

  fetchDashboardData();
});
