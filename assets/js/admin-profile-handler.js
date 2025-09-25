document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("admin-profile-form");
  const passwordForm = document.getElementById("change-password-form");
  const allUsers = DataService.getAllUsers();
  const adminUser = allUsers["master_admin"];
  const passwordModal = new bootstrap.Modal(
    document.getElementById("changePasswordModal")
  );

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

  const showPasswordAlert = (message, isError = false) => {
    const alertDiv = document.getElementById("password-change-alert");
    alertDiv.textContent = message;
    alertDiv.className = `alert mt-3 ${
      isError ? "alert-danger" : "alert-success"
    }`;
    alertDiv.style.display = "block";
  };

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!profileForm.checkValidity()) {
      profileForm.classList.add("was-validated");
      return;
    }
    adminUser.displayName = displayNameInput.value;
    adminUser.firstName = firstNameInput.value;
    adminUser.lastName = lastNameInput.value;
    adminUser.email = emailInput.value;
    allUsers["master_admin"] = adminUser;
    localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
    window.location.reload();
  });

  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword =
      document.getElementById("confirmNewPassword").value;

    if (currentPassword !== adminUser.password) {
      document.getElementById("currentPassword").classList.add("is-invalid");
      showPasswordAlert("Incorrect current password.", true);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      document.getElementById("confirmNewPassword").classList.add("is-invalid");
      showPasswordAlert("New passwords do not match.", true);
      return;
    }
    if (!passwordForm.checkValidity()) {
      passwordForm.classList.add("was-validated");
      showPasswordAlert("Please fix the validation errors.", true);
      return;
    }

    adminUser.password = newPassword;
    allUsers["master_admin"] = adminUser;
    localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
    passwordModal.hide();
    alert("Password changed successfully!");
    window.location.reload();
  });

  document
    .getElementById("changePasswordModal")
    .addEventListener("hidden.bs.modal", () => {
      passwordForm.reset();
      passwordForm.classList.remove("was-validated");
      document.getElementById("password-change-alert").style.display = "none";
      document.querySelectorAll(".form-control").forEach((input) => {
        input.classList.remove("is-invalid");
      });
    });

  loadAdminData();
});
