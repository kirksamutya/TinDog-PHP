document.addEventListener("DOMContentLoaded", () => {
  const termsCheckbox = document.getElementById("terms");
  const registerButton = document.getElementById("register-button");
  const termsModal = document.getElementById("termsModal");

  const toggleRegisterButton = () => {
    if (termsCheckbox && registerButton) {
      registerButton.disabled = !termsCheckbox.checked;
    }
  };

  const fetchTermsContent = () => {
    const modalBody = termsModal.querySelector(".modal-body");
    fetch("./page-terms.html")
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const content = doc.querySelector("#terms-main-content");
        if (content) {
          modalBody.innerHTML = content.innerHTML;
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
});
