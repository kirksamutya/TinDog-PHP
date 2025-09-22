document.addEventListener("DOMContentLoaded", () => {
  const handleRegistration = (form) => {
    window.location.href = "./auth-create-profile.html";
  };

  const termsCheckbox = document.getElementById("terms");
  const registerButton = document.getElementById("register-button");
  const termsModal = document.getElementById("termsModal");
  let termsContent = null;

  const toggleRegisterButton = () => {
    if (termsCheckbox && registerButton) {
      registerButton.disabled = !termsCheckbox.checked;
    }
  };

  const fetchTermsContent = () => {
    const modalBody = termsModal.querySelector(".modal-body");

    if (termsContent) {
      modalBody.innerHTML = termsContent;
      return;
    }

    fetch("./page-terms.html")
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const contentElement = doc.querySelector("#terms-main-content");

        if (contentElement) {
          termsContent = contentElement.innerHTML;
          modalBody.innerHTML = termsContent;
        } else {
          modalBody.innerHTML = "Could not load the terms and conditions.";
        }
      })
      .catch((error) => {
        console.error("Error fetching terms:", error);
        modalBody.innerHTML = "Could not load the terms and conditions.";
      });
  };

  if (termsCheckbox) {
    toggleRegisterButton();
    termsCheckbox.addEventListener("change", toggleRegisterButton);
  }

  if (termsModal) {
    termsModal.addEventListener("show.bs.modal", fetchTermsContent);
  }

  if (window.initializeFormValidation) {
    window.initializeFormValidation("register-form", handleRegistration);
  }
});
