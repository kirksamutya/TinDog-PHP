document.addEventListener("DOMContentLoaded", function () {
  const handleFormSubmit = (formId, redirectUrl) => {
    const form = document.getElementById(formId);
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!form.checkValidity()) {
          event.stopPropagation();
        } else {
          window.location.href = redirectUrl;
        }
        form.classList.add("was-validated");
      });
    }
  };

  handleFormSubmit("register-form", "./create-profile.html");
  handleFormSubmit("create-profile-form", "./dashboard.html");
  handleFormSubmit("login-form", "./dashboard.html");
});
