function getBasePath() {
  const path = window.location.pathname;
  const repoName = "/TinDog-PHP/";
  const repoIndex = path.indexOf(repoName);
  if (repoIndex > -1) {
    return path.substring(0, repoIndex + repoName.length);
  }
  return "/";
}

document.addEventListener("DOMContentLoaded", () => {
  const initUserRecord = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user");
    if (!userId) {
      document.querySelector(".main-content").innerHTML =
        '<p class="text-danger">No user ID provided.</p>';
      return;
    }

    let userData;
    try {
      const response = await fetch(
        getBasePath() + `api/get-user-details.php?user=${userId}`
      );
      if (!response.ok) throw new Error("User not found or server error.");
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      userData = result.data;
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      document.querySelector(
        ".main-content"
      ).innerHTML = `<p class="text-danger">Could not load user data for user ID ${userId}.</p>`;
      return;
    }

    const setText = (id, text) => {
      const element = document.getElementById(id);
      if (element) element.textContent = text || "N/A";
    };

    const editButton = document.getElementById("editUserBtn");
    const deleteButton = document.getElementById("deleteUserBtn");

    document.getElementById("pageTitle").textContent = `User Record: ${
      userData.display_name || `${userData.first_name} ${userData.last_name}`
    }`;

    setText("fullName", `${userData.first_name} ${userData.last_name}`);
    setText("email", userData.email);
    setText("signUpDate", new Date(userData.created_at).toLocaleDateString());
    setText("lastSeen", new Date(userData.last_seen).toLocaleString());

    editButton.href = `./edit.html?user=${userId}`;

    const dogProfileSection = document.getElementById("dog-profile-section");
    const billingTab = document.getElementById("billing-tab");

    if (userData.role === "admin") {
      document.getElementById("details-title").textContent = "Admin Details";
      if (dogProfileSection) dogProfileSection.style.display = "none";
      if (billingTab) billingTab.style.display = "none";
    } else {
      if (dogProfileSection) dogProfileSection.style.display = "block";
      setText("dogName", userData.dog_name);
      setText("dogBreed", userData.dog_breed);
      setText("dogAge", userData.dog_age);
      setText("dogSex", userData.dog_sex);
      setText("dogSize", userData.dog_size);
      setText("dogLocation", userData.location);
      setText("dogBio", userData.dog_bio);
    }

    if (userData.is_master_admin) {
      editButton.classList.add("disabled");
      deleteButton.disabled = true;
    }
  };

  if (document.getElementById("pageTitle")) {
    document.addEventListener("componentsLoaded", initUserRecord);
  }
});
