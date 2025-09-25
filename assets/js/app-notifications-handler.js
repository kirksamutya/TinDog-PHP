document.addEventListener("DOMContentLoaded", () => {
  const renderNotifications = () => {
    const notifications = DataService.getNotifications();
    const notificationList = document.getElementById("notification-list");

    if (!notificationList) return;

    notificationList.innerHTML = "";

    if (notifications.length === 0) {
      notificationList.innerHTML = `<p class="text-muted text-center mt-4">You have no new notifications.</p>`;
      return;
    }

    const notificationGroup = (title, notificationItems) => {
      return `
        <div class="notification-group">
          <h5 class="notification-group-title">${title}</h5>
          ${notificationItems.map(notificationCard).join("")}
        </div>
      `;
    };

    const notificationCard = (notification) => {
      const { type, message, time, user } = notification;
      const isMatch = type === "match";
      const iconClass = isMatch ? "bi-heart-fill" : "bi-chat-dots-fill";
      const buttonText = isMatch ? "View Profile" : "Reply";
      const buttonClass = isMatch
        ? "btn-outline-secondary"
        : "btn-tindog-primary";
      const link = isMatch
        ? `./app-view-profile.html?user=${user.id}`
        : `./app-messages.html`;

      return `
        <div class="card notification-card unread">
          <div class="card-body d-flex align-items-center">
            <div class="icon-wrapper activity-${type} me-3">
              <i class="bi ${iconClass}"></i>
            </div>
            <div class="activity-text flex-grow-1">${message}</div>
            <a href="${link}" class="btn btn-sm ${buttonClass} ms-3">${buttonText}</a>
            <small class="text-muted ms-3 text-nowrap" style="min-width: 60px; text-align: right">${time}</small>
          </div>
        </div>
      `;
    };

    notificationList.innerHTML = notificationGroup("Today", notifications);
  };

  renderNotifications();
});
