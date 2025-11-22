function getBasePath() {
  const path = window.location.pathname;
  const repoName = "/TinDog-PHP/";
  const repoIndex = path.indexOf(repoName);
  if (repoIndex > -1) {
    return path.substring(0, repoIndex + repoName.length);
  }
  return "/";
}

document.addEventListener("DOMContentLoaded", () => {
  const handleAdminLogin = (form) => {
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;
    const errorAlert = document.getElementById("login-error-alert");
    errorAlert.style.display = "none";

    fetch("http://127.0.0.1:8000/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          sessionStorage.setItem("loggedInAdminId", data.adminId);
          sessionStorage.setItem("adminToken", data.token);
          sessionStorage.setItem("adminRole", data.role);
          sessionStorage.setItem("isMasterAdmin", data.is_master_admin ? "true" : "false");
          window.location.href = getBasePath() + "admin/dashboard.html";
        } else {
          errorAlert.textContent = data.message;
          errorAlert.style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        errorAlert.textContent = "An unexpected error occurred.";
        errorAlert.style.display = "block";
      });
  };

  if (window.initializeFormValidation) {
    window.initializeFormValidation("auth-admin-form", handleAdminLogin);
  }
});
