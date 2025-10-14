document.addEventListener("DOMContentLoaded", () => {
  const initUserManagement = () => {
    const userTableBody = document.querySelector("table tbody");
    const searchInput = document.getElementById("user-search-input");
    const sortableHeaders = document.querySelectorAll(".sortable-header");

    let allUsers = Object.entries(DataService.getAllUsers()).map(
      ([id, user]) => ({
        id,
        ...user,
      })
    );
    let currentSort = {
      key: "name",
      direction: "asc",
    };

    const renderTable = (usersToRender) => {
      userTableBody.innerHTML = "";
      if (!usersToRender.length) {
        userTableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No users found.</td></tr>`;
        return;
      }

      usersToRender.forEach((user) => {
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
                      <div>
                        <strong>${user.firstName} ${user.lastName}</strong>
                        <small class="d-block text-muted">ID: ${user.id}</small>
                      </div>
                  </div>
              </td>
              <td>${user.email}</td>
              <td>${roleText}</td>
              <td>${planText}</td>
              <td>${statusBadge}</td>
              <td class="text-end">
                  <div class="btn-group" role="group">
                      <a href="./record.html?user=${
                        user.id
                      }" class="btn btn-sm btn-outline-secondary">View</a>
                      <a href="./edit.html?user=${
                        user.id
                      }" class="btn btn-sm btn-outline-secondary ${actionsDisabled}">Edit</a>
                      <button type="button" class="btn btn-sm btn-outline-danger" data-user-id="${
                        user.id
                      }" ${actionsDisabled}>Delete</button>
                  </div>
              </td>
          </tr>
        `;
        userTableBody.innerHTML += row;
      });
    };

    const filterAndSortTable = () => {
      const searchTerm = searchInput.value.toLowerCase();
      let filteredUsers = allUsers.filter(
        (user) =>
          user.id.toLowerCase().includes(searchTerm) ||
          user.firstName.toLowerCase().includes(searchTerm) ||
          user.lastName.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
      );

      filteredUsers.sort((a, b) => {
        const aValue = a[currentSort.key] || "";
        const bValue = b[currentSort.key] || "";
        if (aValue < bValue) return currentSort.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return currentSort.direction === "asc" ? 1 : -1;
        return 0;
      });

      renderTable(filteredUsers);
    };

    searchInput.addEventListener("input", filterAndSortTable);

    sortableHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        const sortBy = header.dataset.sortBy;
        if (currentSort.key === sortBy) {
          currentSort.direction =
            currentSort.direction === "asc" ? "desc" : "asc";
        } else {
          currentSort.key = sortBy;
          currentSort.direction = "asc";
        }

        sortableHeaders.forEach((h) => h.classList.remove("asc", "desc"));
        header.classList.add(currentSort.direction);

        filterAndSortTable();
      });
    });

    const deleteModal = new bootstrap.Modal(
      document.getElementById("deleteUserModal")
    );
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    let userToDelete = null;

    userTableBody.addEventListener("click", function (event) {
      const button = event.target.closest(".btn-outline-danger");
      if (button && !button.hasAttribute("disabled")) {
        userToDelete = button.dataset.userId;
        const user = allUsers.find((u) => u.id === userToDelete);
        document.getElementById(
          "userNameToDelete"
        ).textContent = `${user.firstName} ${user.lastName}`;
        deleteModal.show();
      }
    });

    confirmDeleteBtn.addEventListener("click", function () {
      if (userToDelete) {
        DataService.deleteUser(userToDelete);
        window.location.reload();
      }
      deleteModal.hide();
    });

    filterAndSortTable();
  };

  if (document.querySelector(".table")) {
    document.addEventListener("componentsLoaded", initUserManagement);
  }
});
