document.addEventListener("DOMContentLoaded", () => {
  const initUserRecord = () => {
    const allUsers = JSON.parse(localStorage.getItem("tindogUsers"));
    if (!allUsers) return;

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user");
    const userData = allUsers[userId];
    if (!userData) return;

    const editButton = document.getElementById("editUserBtn");
    const deleteButton = document.getElementById("deleteUserBtn");

    document.getElementById("pageTitle").textContent = `User Record: ${
      userData.displayName || `${userData.firstName} ${userData.lastName}`
    }`;
    document.getElementById(
      "fullName"
    ).textContent = `${userData.firstName} ${userData.lastName}`;
    document.getElementById("email").textContent = userData.email;
    document.getElementById("signUpDate").textContent =
      userData.signUpDate || "N/A";
    document.getElementById("lastSeen").textContent =
      userData.lastSeen || "N/A";
    editButton.href = `./admin-user-edit.html?user=${userId}`;

    if (userData.role === "admin") {
      document.getElementById("details-title").textContent = "Account Details";
      document.getElementById("billing-tab").style.display = "none";
      document.getElementById("dog-profile-section").style.display = "none";

      if (userData.masterAdmin) {
        editButton.classList.add("disabled");
        deleteButton.classList.add("disabled");
      }
    } else {
      document.getElementById("dogName").textContent = userData.dogName;
      document.getElementById("dogBreed").textContent = userData.dogBreed;
      document.getElementById("dogAge").textContent = userData.age || "N/A";
      document.getElementById("dogSex").textContent = userData.dogSex;
      document.getElementById("dogSize").textContent = userData.dogSize;
      document.getElementById("dogLocation").textContent = userData.location;
      document.getElementById("dogBio").textContent = userData.bio || "";
      document.getElementById("billingPlan").textContent = userData.plan;
    }

    const deleteModal = new bootstrap.Modal(
      document.getElementById("deleteUserModal")
    );
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

    deleteButton.addEventListener("click", () => {
      if (deleteButton.classList.contains("disabled")) return;
      document.getElementById(
        "userNameToDelete"
      ).textContent = `${userData.firstName} ${userData.lastName}`;
      deleteModal.show();
    });

    confirmDeleteBtn.addEventListener("click", () => {
      delete allUsers[userId];
      localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
      window.location.href = "./admin-user-management.html";
    });
  };

  if (document.getElementById("pageTitle")) {
    document.addEventListener("componentsLoaded", initUserRecord);
  }
});
