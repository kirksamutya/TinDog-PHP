document.addEventListener("DOMContentLoaded", () => {
  const renderActivityFeed = () => {
    const activities = DataService.getActivityFeed();
    const activityList = document.getElementById("activity-feed-list");

    if (!activityList) return;

    activityList.innerHTML = "";

    if (activities.length === 0) {
      activityList.innerHTML = `<li class="list-group-item text-muted">No recent activity.</li>`;
      return;
    }

    activities.forEach((activity) => {
      const { type, message } = activity;
      const isMatch = type === "match";
      const iconClass = isMatch ? "bi-heart-fill" : "bi-chat-dots-fill";
      const iconWrapperClass = `activity-${type}`;
      const button = isMatch
        ? `<a href="./app-matches.html" class="btn btn-sm btn-outline-secondary ms-auto">View</a>`
        : `<a href="./app-messages.html" class="btn btn-sm btn-tindog-primary ms-auto">Reply</a>`;

      const listItem = document.createElement("li");
      listItem.className = "list-group-item d-flex align-items-center";
      listItem.innerHTML = `
        <div class="icon-wrapper ${iconWrapperClass} me-3">
          <i class="bi ${iconClass}"></i>
        </div>
        <div class="activity-text flex-grow-1">${message}</div>
        ${button}
      `;
      activityList.appendChild(listItem);
    });
  };

  if (document.getElementById("activity-feed-list")) {
    renderActivityFeed();
  } else {
    document.addEventListener("componentsLoaded", renderActivityFeed, {
      once: true,
    });
  }
});
