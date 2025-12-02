document.addEventListener("DOMContentLoaded", () => {
  const editProfileForm = document.getElementById("edit-profile-form");
  const token = sessionStorage.getItem("userToken");

  // 1. Fetch and Populate Data
  const loadUserData = async () => {
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          populateForm(result.data.user);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const populateForm = (user) => {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || "";
    };

    // Dog Info
    setVal("dogName", user.dog_name || user.display_name);
    setVal("dogBreed", user.dog_breed);
    setVal("dogAge", user.dog_age);
    setVal("dogSex", user.dog_sex);
    setVal("dogSize", user.dog_size);
    setVal("dogBio", user.dog_bio);
    setVal("dogPersonalities", user.dog_personalities);

    // Owner Info
    // Split name if needed, or just use what we have
    // Assuming user.name is "First Last"
    const nameParts = (user.name || "").split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    setVal("ownerFirstName", firstName);
    setVal("ownerLastName", lastName);
    setVal("ownerLocation", user.location);
    setVal("ownerBio", user.owner_bio);
  };

  // 2. Handle Submit
  if (editProfileForm) {
    editProfileForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (!this.checkValidity()) {
        event.stopPropagation();
        this.classList.add("was-validated");
        return;
      }

      const userId = sessionStorage.getItem("loggedInUserId");
      if (!userId) {
        alert("User ID not found. Please log in again.");
        return;
      }

      // Construct payload
      const payload = {
        dog_name: document.getElementById("dogName").value,
        dog_breed: document.getElementById("dogBreed").value,
        dog_age: document.getElementById("dogAge").value,
        dog_sex: document.getElementById("dogSex").value,
        dog_size: document.getElementById("dogSize").value,
        dog_bio: document.getElementById("dogBio").value,
        dog_personalities: document.getElementById("dogPersonalities").value,

        // Combine First/Last for name
        name: `${document.getElementById("ownerFirstName").value} ${document.getElementById("ownerLastName").value}`.trim(),
        location: document.getElementById("ownerLocation").value,
        owner_bio: document.getElementById("ownerBio").value,
      };

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          // Redirect back to profile
          window.location.href = "./index.html";
        } else {
          const err = await response.json();
          alert("Failed to update profile: " + (err.message || "Unknown error"));
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("An error occurred while saving.");
      }
    });
  }

  // Load data on init
  loadUserData();
});
