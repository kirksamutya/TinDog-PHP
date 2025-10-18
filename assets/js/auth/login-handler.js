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
    errorAlert.style.display = "none";

    fetch(getBasePath() + "api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }
          sessionStorage.setItem("loggedInUserId", data.userId);

          const basePath = getBasePath();
          if (data.status === "active") {
            window.location.href = basePath + "app/dashboard.html";
          } else {
            window.location.href = `${basePath}app/status.html?status=${data.status}`;
          }
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
