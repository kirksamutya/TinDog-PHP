document.addEventListener("DOMContentLoaded", async () => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
        console.error("No admin token found. Redirecting...");
        window.location.href = "../../auth/admin.html";
        return;
    }

    const apiBase = "http://127.0.0.1:8000/api/analytics";
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
    };

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

    const fetchRecentActivity = async () => {
        try {
            const response = await fetch(`${apiBase}/recent-activity`, { headers });
            const result = await response.json();
            if (result.success) {
                renderRecentActivity(result.data);
            }
        } catch (error) {
            console.error("Error fetching recent activity:", error);
        }
    };

    const updateOverviewCards = (data) => {
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

    const renderRecentActivity = (activities) => {
        const container = document.querySelector('.activity-feed');
        if (!container) return;

        // Keep the header
        const header = container.querySelector('h5');
        container.innerHTML = '';
        container.appendChild(header);

        if (activities.length === 0) {
            container.innerHTML += '<p class="text-muted">No recent activity.</p>';
            return;
        }

        activities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item d-flex';

            let iconClass = 'bi-bell-fill';
            let bgClass = 'icon-bg-primary';

            if (activity.type === 'user') {
                iconClass = 'bi-person-plus-fill';
                bgClass = 'icon-bg-primary';
            } else if (activity.type === 'report') {
                iconClass = 'bi-flag-fill';
                bgClass = 'icon-bg-accent'; // Red/Orange usually
            }

            item.innerHTML = `
        <div class="activity-icon ${bgClass}">
          <i class="bi ${iconClass}"></i>
        </div>
        <div>
          <strong>${activity.message}</strong>
          <div class="text-muted small">${activity.time}</div>
        </div>
      `;
            container.appendChild(item);
        });
    };

    await fetchOverview();
    await fetchRecentActivity();
});
