document.addEventListener("DOMContentLoaded", () => {
  const initializeFormValidation = (formId, redirectUrl) => {
    const formToValidate = document.getElementById(formId);

    if (!formToValidate) {
      return;
    }

    const handleFormSubmission = (event) => {
      event.preventDefault();
      const isFormValid = formToValidate.checkValidity();

      if (!isFormValid) {
        event.stopPropagation();
      } else {
        window.location.href = redirectUrl;
      }
      formToValidate.classList.add("was-validated");
    };

    formToValidate.addEventListener("submit", handleFormSubmission);
  };

  initializeFormValidation("register-form", "./auth-create-profile.html");
  initializeFormValidation("login-form", "./app-dashboard.html");
  initializeFormValidation("checkout-form", "./auth-create-profile.html");
  initializeFormValidation("edit-profile-form", "./app-profile.html");
});
