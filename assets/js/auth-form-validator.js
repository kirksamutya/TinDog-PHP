document.addEventListener("DOMContentLoaded", () => {
  const initializeFormValidation = (formId, successCallback) => {
    const formToValidate = document.getElementById(formId);
    if (!formToValidate) {
      return;
    }

    formToValidate.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (formToValidate.checkValidity()) {
        if (typeof successCallback === "function") {
          successCallback(formToValidate);
        }
      }

      formToValidate.classList.add("was-validated");
    });
  };

  window.initializeFormValidation = initializeFormValidation;
});
