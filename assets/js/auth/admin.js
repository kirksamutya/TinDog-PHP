document.addEventListener("DOMContentLoaded", () => {
  const handleAdminLogin = (form) => {
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;
    const errorAlert = document.getElementById("login-error-alert");
    const allUsers = JSON.parse(localStorage.getItem("tindogUsers"));

    let loggedInAdminId = null;
    if (errorAlert) {
      errorAlert.style.display = "none";
    }

    if (allUsers) {
      for (const userId in allUsers) {
        if (Object.prototype.hasOwnProperty.call(allUsers, userId)) {
          const user = allUsers[userId];
          if (
            user.email === email &&
            user.password === password &&
            user.role === "admin"
          ) {
            loggedInAdminId = userId;
            break;
          }
        }
      }
    }

    if (loggedInAdminId) {
      sessionStorage.setItem("loggedInAdminId", loggedInAdminId);
      window.location.href = "./admin-dashboard.html";
    } else if (errorAlert) {
      errorAlert.textContent =
        "Invalid administrator credentials. Please try again.";
      errorAlert.style.display = "block";
    }
  };

  if (window.initializeFormValidation) {
    window.initializeFormValidation("auth-admin-form", handleAdminLogin);
  }
});
