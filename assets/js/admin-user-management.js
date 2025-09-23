document.addEventListener("DOMContentLoaded", () => {
  const initUserManagement = () => {
    const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};
    const userTableBody = document.querySelector("table tbody");
    userTableBody.innerHTML = "";

    Object.keys(allUsers).forEach((userId) => {
      const user = allUsers[userId];
      const planText = user.plan
        ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1)
        : "N/A";

      let statusBadge;
      switch (user.status) {
        case "active":
          statusBadge = `<span class="badge bg-success">Active</span>`;
          break;
        case "suspended":
          statusBadge = `<span class="badge bg-warning text-dark">Suspended</span>`;
          break;
        case "banned":
          statusBadge = `<span class="badge bg-danger">Banned</span>`;
          break;
        default:
          statusBadge = `<span class="badge bg-secondary">Unknown</span>`;
      }

      let roleText = "Standard User";
      if (user.role === "admin" && user.masterAdmin) {
        roleText = "Master Admin";
      } else if (user.role === "admin") {
        roleText = "Administrator";
      }

      const actionsDisabled = user.masterAdmin ? "disabled" : "";

      const row = `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <div class="user-avatar-initials me-3">${user.firstName.charAt(
                      0
                    )}${user.lastName.charAt(0)}</div>
                    <div><strong>${user.firstName} ${
        user.lastName
      }</strong></div>
                </div>
            </td>
            <td>${user.email}</td>
            <td>${roleText}</td>
            <td>${planText}</td>
            <td>${statusBadge}</td>
            <td class="text-end">
                <div class="btn-group" role="group">
                    <a href="./admin-user-record.html?user=${userId}" class="btn btn-sm btn-outline-secondary">View</a>
                    <a href="./admin-user-edit.html?user=${userId}" class="btn btn-sm btn-outline-secondary ${actionsDisabled}">Edit</a>
                    <button type="button" class="btn btn-sm btn-outline-danger" data-user-id="${userId}" ${actionsDisabled}>Delete</button>
                </div>
            </td>
        </tr>
      `;
      userTableBody.innerHTML += row;
    });

    const deleteModal = new bootstrap.Modal(
      document.getElementById("deleteUserModal")
    );
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    let userToDelete = null;

    userTableBody.addEventListener("click", function (event) {
      if (
        event.target.classList.contains("btn-outline-danger") &&
        !event.target.hasAttribute("disabled")
      ) {
        userToDelete = event.target.dataset.userId;
        const userFullName =
          allUsers[userToDelete].firstName +
          " " +
          allUsers[userToDelete].lastName;
        document.getElementById("userNameToDelete").textContent = userFullName;
        deleteModal.show();
      }
    });

    confirmDeleteBtn.addEventListener("click", function () {
      if (userToDelete) {
        delete allUsers[userToDelete];
        localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
        window.location.reload();
      }
      deleteModal.hide();
    });
  };

  if (document.querySelector(".table")) {
    document.addEventListener("componentsLoaded", initUserManagement);
  }
});
