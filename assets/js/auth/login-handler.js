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
  const handleUserLogin = (form) => {
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;
    const errorAlert = document.getElementById("login-error-alert");
    errorAlert.style.display = "none";

    fetch("http://127.0.0.1:8000/api/user-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw errorData;
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          sessionStorage.setItem("loggedInUserId", data.userId);

          if (data.status === "new") {
            window.location.href = getBasePath() + "auth/new-profile.html";
          } else {
            window.location.href = getBasePath() + "app/dashboard.html";
          }
        } else {
          errorAlert.textContent = data.message;
          errorAlert.style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        errorAlert.textContent =
          error.message || "An unexpected error occurred.";
        errorAlert.style.display = "block";
      });
  };

  if (window.initializeFormValidation) {
    window.initializeFormValidation("auth-login-form", handleUserLogin);
  }
});
