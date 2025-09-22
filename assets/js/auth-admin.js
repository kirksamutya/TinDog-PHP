document.addEventListener("DOMContentLoaded", () => {
  const adminLoginForm = document.getElementById("auth-admin-form");
  const errorAlert = document.getElementById("login-error-alert");

  if (!adminLoginForm) {
    return;
  }

  const handleAdminFormSubmission = (event) => {
    event.preventDefault();
    errorAlert.style.display = "none";

    if (!adminLoginForm.checkValidity()) {
      event.stopPropagation();
      adminLoginForm.classList.add("was-validated");
      return;
    }

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const allUsers = JSON.parse(localStorage.getItem("tindogUsers"));

    let isValid = false;
    if (allUsers) {
      const user = Object.values(allUsers).find(
        (u) =>
          u.email === email && u.password === password && u.role === "admin"
      );
      if (user) {
        isValid = true;
      }
    }

    if (isValid) {
      window.location.href = "./admin-dashboard.html";
    } else {
      errorAlert.textContent = "Invalid admin credentials. Please try again.";
      errorAlert.style.display = "block";
    }
  };

  adminLoginForm.addEventListener("submit", handleAdminFormSubmission);
});
