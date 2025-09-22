document.addEventListener("DOMContentLoaded", () => {
  const editProfileForm = document.getElementById("edit-profile-form");

  if (editProfileForm) {
    editProfileForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!this.checkValidity()) {
        event.stopPropagation();
        this.classList.add("was-validated");
        return;
      }

      const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};
      const loggedInUserId = "saavedra_roel";

      allUsers[loggedInUserId] = {
        ...allUsers[loggedInUserId],
        dogName: document.getElementById("dogName").value,
        dogBreed: document.getElementById("dogBreed").value,
        age: document.getElementById("dogAge").value,
        dogSex: document.getElementById("dogSex").value,
        dogSize: document.getElementById("dogSize").value,
        bio: document.getElementById("dogBio").value,
        firstName: document.getElementById("ownerFirstName").value,
        lastName: document.getElementById("ownerLastName").value,
        location: document.getElementById("ownerLocation").value,
        ownerBio: document.getElementById("ownerBio").value,
      };

      localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
      window.location.href = "./app-profile.html";
    });
  }
});
