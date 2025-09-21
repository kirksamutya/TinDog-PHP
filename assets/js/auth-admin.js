document.addEventListener("DOMContentLoaded", () => {
  const adminLoginForm = document.getElementById("auth-admin-form");

  if (!adminLoginForm) {
    return;
  }

  const handleAdminFormSubmission = (event) => {
    event.preventDefault();
    const isFormValid = adminLoginForm.checkValidity();

    if (!isFormValid) {
      event.stopPropagation();
    } else {
      window.location.href = "./admin-dashboard.html";
    }
    adminLoginForm.classList.add("was-validated");
  };

  adminLoginForm.addEventListener("submit", handleAdminFormSubmission);
});
