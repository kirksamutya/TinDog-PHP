document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("admin-profile-form");
  if (!profileForm) return;

  const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};
  const adminUser = allUsers["master_admin"];

  const avatar = document.getElementById("admin-avatar");
  const displayName = document.getElementById("admin-displayname");
  const displayNameInput = document.getElementById("displayName");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");

  const loadAdminData = () => {
    if (adminUser) {
      avatar.textContent =
        adminUser.firstName.charAt(0) + adminUser.lastName.charAt(0);
      displayName.textContent = adminUser.displayName;
      displayNameInput.value = adminUser.displayName;
      firstNameInput.value = adminUser.firstName;
      lastNameInput.value = adminUser.lastName;
      emailInput.value = adminUser.email;
    }
  };

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    adminUser.displayName = displayNameInput.value;
    adminUser.firstName = firstNameInput.value;
    adminUser.lastName = lastNameInput.value;
    adminUser.email = emailInput.value;

    allUsers["master_admin"] = adminUser;
    localStorage.setItem("tindogUsers", JSON.stringify(allUsers));

    window.location.href = "./admin-user-management.html";
  });

  loadAdminData();
});
