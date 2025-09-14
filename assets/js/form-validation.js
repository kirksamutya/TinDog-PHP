document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("register-form");
  const createProfileForm = document.getElementById("create-profile-form");
  const loginForm = document.getElementById("login-form");

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      if (!registerForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault(); // Prevent default submission
        window.location.href = "./create-profile.html";
      }
      registerForm.classList.add("was-validated");
    });
  }

  if (createProfileForm) {
    createProfileForm.addEventListener("submit", function (event) {
      if (!createProfileForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault(); // Prevent default submission
        window.location.href = "./dashboard.html";
      }
      createProfileForm.classList.add("was-validated");
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      if (!loginForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault(); // Prevent default submission
        window.location.href = "./dashboard.html";
      }
      loginForm.classList.add("was-validated");
    });
  }
});
