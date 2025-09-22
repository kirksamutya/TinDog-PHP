document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  if (!loginForm) return;

  const emailInput = document.getElementById("email");
  const rememberMeCheckbox = document.getElementById("rememberMe");
  const errorAlert = document.getElementById("login-error-alert");

  const rememberedEmail = localStorage.getItem("rememberedEmail");
  if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberMeCheckbox.checked = true;
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    errorAlert.style.display = "none";

    if (!this.checkValidity()) {
      event.stopPropagation();
      this.classList.add("was-validated");
      return;
    }

    const email = emailInput.value;
    const password = document.getElementById("password").value;
    const allUsers = JSON.parse(localStorage.getItem("tindogUsers"));

    let loggedInUserId = null;
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
      if (rememberMeCheckbox.checked) {
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
  });
});
