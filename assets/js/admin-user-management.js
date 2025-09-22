document.addEventListener("DOMContentLoaded", () => {
  const initUserManagement = () => {
    const sampleUsers = {
      master_admin: {
        firstName: "Master",
        lastName: "Admin",
        email: "admin@test.com",
        password: "Admin123",
        plan: "mastiff",
        status: "active",
        role: "admin",
        masterAdmin: true,
      },
      saavedra_roel: {
        firstName: "Roel Anthony",
        lastName: "Saavedra",
        email: "roel.saavedra@example.com",
        password: "Test123",
        plan: "labrador",
        status: "active",
        role: "user",
        location: "Consolacion, Cebu",
        dogName: "Jorjee",
        dogBreed: "Shih Tzu",
        dogSex: "female",
        dogSize: "small",
        age: 3,
        bio: "Energetic and playful, loves chasing balls and long walks. Looking for a companion to explore with!",
        ownerBio:
          "Guides our technical direction and translates creative concepts into functional, polished applications.",
        signUpDate: "Jul 01, 2024",
        lastSeen: "5 minutes ago",
      },
      cruz_juan: {
        firstName: "Juan",
        lastName: "Cruz",
        email: "juan.cruz@example.com",
        password: "Password123",
        plan: "mastiff",
        status: "active",
        role: "admin",
        location: "Cebu City, Cebu",
        dogName: "Bantay",
        dogBreed: "Aspin",
        dogSex: "male",
        dogSize: "medium",
        signUpDate: "Sep 22, 2023",
        lastSeen: "2 hours ago",
      },
      santos_maria: {
        firstName: "Maria",
        lastName: "Santos",
        email: "maria.santos@example.com",
        password: "Password123",
        plan: "labrador",
        status: "active",
        role: "user",
        location: "Mandaue City, Cebu",
        dogName: "Kisses",
        dogBreed: "Shih Tzu",
        dogSex: "female",
        dogSize: "small",
        signUpDate: "Jan 15, 2024",
        lastSeen: "Yesterday",
      },
      gonzales_pedro: {
        firstName: "Pedro",
        lastName: "Gonzales",
        email: "pedro.g@example.com",
        password: "Password123",
        plan: "chihuahua",
        status: "suspended",
        role: "user",
        location: "Lapu-Lapu City, Cebu",
        dogName: "Max",
        dogBreed: "Pomeranian",
        dogSex: "male",
        dogSize: "small",
        signUpDate: "Mar 01, 2024",
        lastSeen: "1 week ago",
      },
      reyes_sofia: {
        firstName: "Sofia",
        lastName: "Reyes",
        email: "sofia.reyes@example.com",
        password: "Password123",
        plan: "labrador",
        status: "active",
        role: "user",
        location: "Talisay City, Cebu",
        dogName: "Bella",
        dogBreed: "Golden Retriever",
        dogSex: "female",
        dogSize: "large",
        signUpDate: "Jun 10, 2024",
        lastSeen: "3 days ago",
      },
      tan_andres: {
        firstName: "Andres",
        lastName: "Tan",
        email: "andres.tan@example.com",
        password: "Password123",
        plan: "chihuahua",
        status: "banned",
        role: "user",
        location: "Consolacion, Cebu",
        dogName: "Rocky",
        dogBreed: "Bulldog",
        dogSex: "male",
        dogSize: "medium",
        signUpDate: "Jul 04, 2024",
        lastSeen: "1 month ago",
      },
    };

    const sampleReports = [
      {
        id: 1,
        reportedUserId: "tan_andres",
        reportedByUserId: "santos_maria",
        reason: "Inappropriate Photo",
        date: "Sep 22, 2025",
        status: "banned",
      },
      {
        id: 2,
        reportedUserId: "gonzales_pedro",
        reportedByUserId: "cruz_juan",
        reason: "Spam / Bot",
        date: "Sep 21, 2025",
        status: "suspended",
      },
      {
        id: 3,
        reportedUserId: "santos_maria",
        reportedByUserId: "gonzales_pedro",
        reason: "Harassment",
        date: "Sep 20, 2025",
        status: "dismissed",
      },
      {
        id: 4,
        reportedUserId: "reyes_sofia",
        reportedByUserId: "tan_andres",
        reason: "Fake Profile",
        date: "Sep 22, 2025",
        status: "open",
      },
    ];

    const allUsers =
      JSON.parse(localStorage.getItem("tindogUsers")) || sampleUsers;
    localStorage.setItem("tindogUsers", JSON.stringify(allUsers));

    if (!localStorage.getItem("tindogReports")) {
      localStorage.setItem("tindogReports", JSON.stringify(sampleReports));
    }

    const userTableBody = document.querySelector("table tbody");
    userTableBody.innerHTML = "";

    Object.keys(allUsers).forEach((userId) => {
      const user = allUsers[userId];
      const planText = user.plan.charAt(0).toUpperCase() + user.plan.slice(1);

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

      const roleText =
        user.role === "admin" ? "Administrator" : "Standard User";

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
        initUserManagement();
      }
      deleteModal.hide();
    });
  };

  if (document.querySelector(".table")) {
    document.addEventListener("componentsLoaded", initUserManagement);
  }
});
