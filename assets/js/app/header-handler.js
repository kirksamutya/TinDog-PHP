document.addEventListener("DOMContentLoaded", () => {
  const initHeaderNotifications = () => {
    const notifications = DataService.getNotifications();
    const badge = document.getElementById("notification-badge");
    const itemsContainer = document.getElementById("notification-items");

    if (!badge || !itemsContainer) return;

    if (notifications.length > 0) {
      badge.textContent = notifications.length;
      badge.style.display = "block";
    } else {
      badge.style.display = "none";
    }

    if (notifications.length === 0) {
      itemsContainer.innerHTML = `<li><p class="text-muted text-center my-2">No new notifications</p></li>`;
    } else {
      itemsContainer.innerHTML = notifications
        .map((n) => {
          const isMatch = n.type === "match";
          const iconClass = isMatch
            ? "bi-heart-fill text-danger"
            : "bi-chat-dots-fill text-primary";
          const link = isMatch
            ? "./matches/index.html"
            : `./messages.html?user=${n.user.id}`;
          return `
            <li>
              <a class="dropdown-item d-flex align-items-start py-2" href="${link}">
                <i class="bi ${iconClass} me-2 mt-1"></i>
                <div>
                  ${n.message}
                  <small class="d-block text-muted">${n.time}</small>
                </div>
              </a>
            </li>
          `;
        })
        .join("");
    }
  };

  document.addEventListener("componentsLoaded", initHeaderNotifications, {
    once: true,
  });
});
