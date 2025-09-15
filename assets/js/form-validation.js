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

  initializeFormValidation("register-form", "./create-profile.html");
  initializeFormValidation("create-profile-form", "./dashboard.html");
  initializeFormValidation("login-form", "./dashboard.html");
  initializeFormValidation("checkout-form", "./create-profile.html"); // Corrected Redirect
});
