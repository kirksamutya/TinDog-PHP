document.addEventListener("DOMContentLoaded", () => {
  const handleLogin = (form) => {
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;
    const rememberMe = form.querySelector("#rememberMe").checked;
    const errorAlert = document.getElementById("login-error-alert");
    const allUsers = JSON.parse(localStorage.getItem("tindogUsers"));

    let loggedInUserId = null;
    errorAlert.style.display = "none";

    if (allUsers) {
      for (const userId in allUsers) {
        if (Object.prototype.hasOwnProperty.call(allUsers, userId)) {
          const user = allUsers[userId];
          if (
            user.email === email &&
            user.password === password &&
            user.role === "user"
          ) {
            loggedInUserId = userId;
            break;
          }
        }
      }
    }

    if (loggedInUserId) {
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      sessionStorage.setItem("loggedInUserId", loggedInUserId);
      window.location.href = "./app-dashboard.html";
    } else {
      errorAlert.textContent = "Invalid user credentials. Please try again.";
      errorAlert.style.display = "block";
    }
  };

  const emailInput = document.getElementById("email");
  const rememberMeCheckbox = document.getElementById("rememberMe");
  const rememberedEmail = localStorage.getItem("rememberedEmail");

  if (rememberedEmail && emailInput) {
    emailInput.value = rememberedEmail;
    rememberMeCheckbox.checked = true;
  }

  if (window.initializeFormValidation) {
    window.initializeFormValidation("login-form", handleLogin);
  }
});
