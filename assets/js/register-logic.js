document.addEventListener("DOMContentLoaded", () => {
  const termsCheckbox = document.getElementById("terms");
  const registerButton = document.getElementById("register-button");
  const termsModal = document.getElementById("termsModal");

  if (termsCheckbox && registerButton) {
    registerButton.disabled = true;
    termsCheckbox.addEventListener("change", () => {
      registerButton.disabled = !termsCheckbox.checked;
    });
  }

  if (termsModal) {
    termsModal.addEventListener("show.bs.modal", (event) => {
      const modalBody = termsModal.querySelector(".modal-body");

      fetch("./terms.html")
        .then((response) => response.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const content = doc.querySelector("#terms-main-content");
          if (content) {
            modalBody.innerHTML = content.innerHTML;
          } else {
            modalBody.innerHTML =
              "Could not load the terms and conditions. Please visit the main page.";
          }
        })
        .catch((error) => {
          console.error("Error fetching terms:", error);
          modalBody.innerHTML = "Could not load the terms and conditions.";
        });
    });
  }
});
