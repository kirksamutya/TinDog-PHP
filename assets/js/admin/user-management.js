document.addEventListener("DOMContentLoaded", () => {
  function getBasePath() {
    const path = window.location.pathname;
    const repoName = "/TinDog-PHP/";
    const repoIndex = path.indexOf(repoName);
    if (repoIndex > -1) {
      return path.substring(0, repoIndex + repoName.length);
    }
    return "/";
  }

  const initUserManagement = async () => {
    const userTableBody = document.querySelector("table tbody");
    const searchInput = document.getElementById("user-search-input");

    let allUsers = [];
    try {
      const response = await fetch(getBasePath() + "api/get-users.php");
      allUsers = await response.json();
    } catch (error) {
      console.error("Failed to fetch users:", error);
      userTableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Could not load user data. Check API path and console.</td></tr>`;
      return;
    }

    const renderTable = (usersToRender) => {
      userTableBody.innerHTML = "";
      if (!usersToRender.length) {
        userTableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No users found.</td></tr>`;
        return;
      }

      usersToRender.forEach((user) => {
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

        let roleText =
          user.role === "admin"
            ? user.is_master_admin
              ? "Master Admin"
              : "Administrator"
            : "Standard User";
        const actionsDisabled = user.is_master_admin ? "disabled" : "";

        const row = `
                    <tr>
                        <td>
                            <div class="d-flex align-items-center">
                                <div class="user-avatar-initials me-3">${user.first_name.charAt(
                                  0
                                )}${user.last_name.charAt(0)}</div>
                                <div><strong>${user.first_name} ${
          user.last_name
        }</strong><small class="d-block text-muted">ID: ${user.id}</small></div>
                            </div>
                        </td>
                        <td>${user.email}</td>
                        <td>${roleText}</td>
                        <td>N/A</td>
                        <td>${statusBadge}</td>
                        <td class="text-end">
                            <div class="btn-group" role="group">
                                <a href="./record.html?user=${
                                  user.id
                                }" class="btn btn-sm btn-outline-secondary">View</a>
                                <a href="./edit.html?user=${
                                  user.id
                                }" class="btn btn-sm btn-outline-secondary">Edit</a>
                                <button type="button" class="btn btn-sm btn-outline-danger" data-user-id="${
                                  user.id
                                }" data-user-name="${user.first_name} ${
          user.last_name
        }" ${actionsDisabled}>Delete</button>
                            </div>
                        </td>
                    </tr>`;
        userTableBody.innerHTML += row;
      });
    };

    const filterTable = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredUsers = allUsers.filter(
        (user) =>
          user.id.toString().includes(searchTerm) ||
          `${user.first_name} ${user.last_name}`
            .toLowerCase()
            .includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
      );
      renderTable(filteredUsers);
    };

    searchInput.addEventListener("input", filterTable);

    const deleteModal = new bootstrap.Modal(
      document.getElementById("deleteUserModal")
    );
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    let userToDelete = null;

    userTableBody.addEventListener("click", function (event) {
      const button = event.target.closest(".btn-outline-danger");
      if (button && !button.hasAttribute("disabled")) {
        userToDelete = button.dataset.userId;
        document.getElementById("userNameToDelete").textContent =
          button.dataset.userName;
        deleteModal.show();
      }
    });

    confirmDeleteBtn.addEventListener("click", async function () {
      if (userToDelete) {
        try {
          const response = await fetch(getBasePath() + "api/delete-user.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: userToDelete }),
          });
          const data = await response.json();
          if (data.success) {
            window.location.reload();
          } else {
            alert("Error: " + data.message);
          }
        } catch (error) {
          console.error("Delete failed:", error);
          alert("An error occurred while deleting the user.");
        }
        deleteModal.hide();
      }
    });

    renderTable(allUsers);
  };

  if (document.querySelector("table")) {
    document.addEventListener("componentsLoaded", initUserManagement);
  }
});
