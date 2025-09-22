document.addEventListener("DOMContentLoaded", () => {
  const createUserForm = document.getElementById("create-user-form");

  if (createUserForm) {
    createUserForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;

      const newUserId = (firstName + "_" + lastName)
        .toLowerCase()
        .replace(/\s/g, "_");

      allUsers[newUserId] = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        location: document.getElementById("ownerLocation").value,
        dogName: document.getElementById("dogName").value,
        dogBreed: document.getElementById("dogBreed").value,
        dogSex: document.getElementById("dogSex").value,
        dogSize: document.getElementById("dogSize").value,
        plan: document.getElementById("subscriptionPlan").value,
        status: "active",
        role: document.getElementById("userRole").value,
      };

      localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
      window.location.href = "./admin-user-management.html";
    });
  }
});
