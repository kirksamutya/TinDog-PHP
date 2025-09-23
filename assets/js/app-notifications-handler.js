document.addEventListener("DOMContentLoaded", () => {
  const renderNotifications = () => {
    const notifications = DataService.getNotifications();
    const notificationList = document.getElementById("notification-list");
    notificationList.innerHTML = "";

    if (notifications.length === 0) {
      notificationList.innerHTML = `<p class="text-muted text-center mt-4">You have no new notifications.</p>`;
      return;
    }

    const today = new Date();
    const todayNotifications = notifications.filter(
      (n) => new Date(n.time) <= today
    );

    const notificationGroup = (title, notifications) => {
      if (notifications.length === 0) return "";
      return `
        <div class="notification-group">
          <h5 class="notification-group-title">${title}</h5>
          ${notifications.map(notificationCard).join("")}
        </div>
      `;
    };

    const notificationCard = (notification) => {
      const { type, message, time, user } = notification;
      const isMatch = type === "match";
      const iconClass = isMatch ? "bi-heart-fill" : "bi-chat-dots-fill";
      const button = isMatch
        ? `<a href="./app-profile.html?user=${user.id}" class="btn btn-sm btn-outline-secondary ms-3">View Profile</a>`
        : `<a href="./app-messages.html" class="btn btn-sm btn-tindog-primary ms-3">Reply</a>`;

      return `
        <div class="card notification-card unread">
          <div class="card-body d-flex align-items-center">
            <div class="icon-wrapper activity-${type} me-3">
              <i class="bi ${iconClass}"></i>
            </div>
            <div class="activity-text flex-grow-1">${message}</div>
            ${button}
            <small class="text-muted ms-3 text-nowrap" style="min-width: 60px; text-align: right">${time}</small>
          </div>
        </div>
      `;
    };

    notificationList.innerHTML = notificationGroup("Today", todayNotifications);
  };

  renderNotifications();
});
