document.addEventListener("DOMContentLoaded", () => {
  const initUserManagement = () => {
    const sampleUsers = {
      eugene_stepnov: {
        firstName: "Eugene",
        lastName: "Stepnov",
        email: "eugene.stepnov@example.com",
        plan: "mastiff",
        status: "active",
      },
      maria_s: {
        firstName: "Maria",
        lastName: "S.",
        email: "maria.s@example.com",
        plan: "labrador",
        status: "active",
      },
      john_d: {
        firstName: "John",
        lastName: "D.",
        email: "john.d@example.com",
        plan: "chihuahua",
        status: "suspended",
      },
    };

    const allUsers =
      JSON.parse(localStorage.getItem("tindogUsers")) || sampleUsers;
    const userTableBody = document.querySelector("table tbody");
    userTableBody.innerHTML = ""; // Clear existing static content

    Object.keys(allUsers).forEach((userId) => {
      const user = allUsers[userId];
      const planText = user.plan.charAt(0).toUpperCase() + user.plan.slice(1);
      const statusBadge =
        user.status === "active"
          ? `<span class="badge bg-success">Active</span>`
          : `<span class="badge bg-danger">Suspended</span>`;

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
                    <td>${planText}</td>
                    <td>${statusBadge}</td>
                    <td class="text-end">
                        <div class="btn-group" role="group">
                            <a href="./admin-user-record.html?user=${userId}" class="btn btn-sm btn-outline-secondary">View</a>
                            <a href="./admin-user-edit.html?user=${userId}" class="btn btn-sm btn-outline-secondary">Edit</a>
                            <button type="button" class="btn btn-sm btn-outline-danger" data-user-id="${userId}">Delete</button>
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
      if (event.target.classList.contains("btn-outline-danger")) {
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
        initUserManagement(); // Re-render the table
      }
      deleteModal.hide();
    });
  };

  if (document.querySelector(".table")) {
    document.addEventListener("componentsLoaded", initUserManagement);
  }
});
