document.addEventListener("DOMContentLoaded", () => {
  const createUserForm = document.getElementById("create-user-form");

  if (createUserForm) {
    createUserForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!this.checkValidity()) {
        event.stopPropagation();
        this.classList.add("was-validated");
        return;
      }

      const userRole = document.getElementById("userRole").value;
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const newUserData = {
        firstName,
        lastName,
        email,
        password,
        role: userRole,
      };

      if (userRole === "user") {
        newUserData.location = document.getElementById("ownerLocation").value;
        newUserData.dogName = document.getElementById("dogName").value;
        newUserData.dogBreed = document.getElementById("dogBreed").value;
        newUserData.dogSex = document.getElementById("dogSex").value;
        newUserData.dogSize = document.getElementById("dogSize").value;
        newUserData.plan = document.getElementById("subscriptionPlan").value;
      } else {
        newUserData.displayName = `${firstName} ${lastName}`;
        newUserData.plan = "N/A";
      }

      const newUserId = createUser(newUserData);
      window.location.href = `./admin-user-record.html?user=${newUserId}`;
    });
  }
});
