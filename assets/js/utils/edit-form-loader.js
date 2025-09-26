document.addEventListener("DOMContentLoaded", () => {
  const initEditForm = () => {
    const form = document.querySelector("form");
    if (!form) return;

    const urlParams = new URLSearchParams(window.location.search);
    const userId =
      urlParams.get("user") || sessionStorage.getItem("loggedInUserId");
    const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};
    const userData = allUsers[userId];

    if (!userData) {
      console.error("User data not found for ID:", userId);
      return;
    }

    const fields = {
      // User and Admin
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      // User only
      dogName: userData.dogName,
      dogBreed: userData.dogBreed,
      dogAge: userData.age,
      dogSex: userData.dogSex,
      dogSize: userData.dogSize,
      dogBio: userData.bio,
      ownerFirstName: userData.firstName,
      ownerLastName: userData.lastName,
      ownerLocation: userData.location,
      ownerBio: userData.ownerBio,
      // Admin only
      displayName: userData.displayName,
      accountStatus: userData.status,
      subscriptionPlan: userData.plan,
    };

    for (const id in fields) {
      const element = document.getElementById(id);
      if (element) {
        element.value = fields[id] || "";
      }
    }

    // Handle conditional UI for admin user edit page
    if (form.id === "edit-user-form") {
      const pageTitle = document.getElementById("pageTitle");
      const pageSubtitle = document.getElementById("pageSubtitle");
      const standardUserFields = document.getElementById(
        "standard-user-fields"
      );
      const adminUserFields = document.getElementById("admin-user-fields");

      pageTitle.textContent = `Edit User: ${userData.firstName} ${userData.lastName}`;

      if (userData.role === "admin") {
        pageSubtitle.textContent =
          "Modify the account details for an Administrator.";
        standardUserFields.style.display = "none";
        adminUserFields.style.display = "block";
      } else {
        pageSubtitle.textContent =
          "Modify the account details for a Standard User.";
        standardUserFields.style.display = "block";
        adminUserFields.style.display = "none";
      }
    }
  };

  document.addEventListener("componentsLoaded", initEditForm, { once: true });
});
