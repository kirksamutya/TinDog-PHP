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
      // 1. Get the adminToken
      const token = sessionStorage.getItem("adminToken");
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      // 2. THIS IS THE FIX: Fetch from the correct Laravel API
      const response = await fetch("http://127.0.0.1:8000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // 3. Send the token
        },
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the actual error text
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      allUsers = await response.json();
    } catch (error) {
      console.error("Failed to fetch users:", error);
      userTableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Error: ${error.message}</td></tr>`;
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
          case "new":
            statusBadge = `<span class="badge bg-success">Active</span>`;
            break;
          case "suspended":
            statusBadge = `<span class="badge bg-warning text-dark">Suspended</span>`;
            break;
          case "banned":
            statusBadge = `<span class="badge bg-danger">Banned</span>`;
            break;
          default:
            statusBadge = `<span class="badge bg-secondary">${
              user.status || "Unknown"
            }</span>`;
        }

        // Use 'display_name' if it exists, otherwise "N/A"
        const displayName = user.display_name || "N/A";
        const initials =
          displayName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase() || "??";
        const plan = user.plan || "N/A";
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
                                <div class="user-avatar-initials me-3">${initials}</div>
                                <div><strong>${displayName}</strong><small class="d-block text-muted">ID: ${user.id}</small></div>
                            </div>
                        </td>
                        <td>${user.email}</td>
                        <td>${roleText}</td>
                        <td>${plan}</td>
                        <td>${statusBadge}</td>
                        <td class="text-end">
                            <div class="btn-group" role="group">
                                <a href="./record.html?user=${user.id}" class="btn btn-sm btn-outline-secondary">View</a>
                                <a href="./edit.html?user=${user.id}" class="btn btn-sm btn-outline-secondary">Edit</a>
                                <button type="button" class="btn btn-sm btn-outline-danger" data-user-id="${user.id}" data-user-name="${displayName}" ${actionsDisabled}>Delete</button>
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
          (user.display_name &&
            user.display_name.toLowerCase().includes(searchTerm)) ||
          user.email.toLowerCase().includes(searchTerm)
      );
      renderTable(filteredUsers);
    };

    if (searchInput) {
      searchInput.addEventListener("input", filterTable);
    }

    const deleteModalElement = document.getElementById("deleteUserModal");
    if (deleteModalElement) {
      const deleteModal = new bootstrap.Modal(deleteModalElement);
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

      if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener("click", async function () {
          if (userToDelete) {
            try {
              const response = await fetch(
                getBasePath() + "api/delete-user.php",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ userId: userToDelete }),
                }
              );
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
      }
    }

    renderTable(allUsers);
  };

  if (document.querySelector("table")) {
    document.addEventListener("componentsLoaded", initUserManagement);
  }
});
