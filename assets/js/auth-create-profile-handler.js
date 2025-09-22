document.addEventListener("DOMContentLoaded", () => {
  const createProfileForm = document.getElementById("create-profile-form");

  if (createProfileForm) {
    createProfileForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!this.checkValidity()) {
        event.stopPropagation();
        this.classList.add("was-validated");
        return;
      }

      const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};

      const firstName = document.getElementById("ownerFirstName").value;
      const lastName = document.getElementById("ownerLastName").value;

      // Create a simple, unique ID from the user's name
      const newUserId = (firstName + "_" + lastName)
        .toLowerCase()
        .replace(/\s/g, "_");

      allUsers[newUserId] = {
        firstName: firstName,
        lastName: lastName,
        email: "new.user@example.com", // Placeholder email
        location: document.getElementById("location").value,
        dogName: document.getElementById("dogName").value,
        dogBreed: document.getElementById("dogBreed").value,
        dogSex: document.getElementById("dogSex").value,
        dogSize: document.getElementById("dogSize").value,
        age: document.getElementById("dogAge").value,
        bio: document.getElementById("dogBio").value,
        plan: "chihuahua", // Default to free plan
        status: "active",
        role: "user",
        signUpDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        lastSeen: "Just now",
      };

      localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
      window.location.href = "./app-dashboard.html";
    });
  }
});
