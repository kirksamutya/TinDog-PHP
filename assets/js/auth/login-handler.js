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
  const handleLogin = (form) => {
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;
    const rememberMe = form.querySelector("#rememberMe").checked;
    const errorAlert = document.getElementById("login-error-alert");
    const allUsers = JSON.parse(localStorage.getItem("tindogUsers"));

    let loggedInUser = null;
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
            loggedInUser = { id: userId, ...user };
            break;
          }
        }
      }
    }

    if (loggedInUser) {
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      sessionStorage.setItem("loggedInUserId", loggedInUser.id);

      const basePath = getBasePath();
      if (loggedInUser.status === "active") {
        window.location.href = basePath + "app/dashboard.html";
      } else {
        window.location.href = `${basePath}app/status.html?status=${loggedInUser.status}`;
      }
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
