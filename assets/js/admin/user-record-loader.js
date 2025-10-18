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
      if (!response.ok) {
        throw new Error("User not found or server error.");
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }
      userData = result.data;
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      document.querySelector(
        ".main-content"
      ).innerHTML = `<p class="text-danger">Could not load user data for user ID ${userId}.</p>`;
      return;
    }

    const editButton = document.getElementById("editUserBtn");
    const deleteButton = document.getElementById("deleteUserBtn");

    document.getElementById("pageTitle").textContent = `User Record: ${
      userData.display_name || `${userData.first_name} ${userData.last_name}`
    }`;
    document.getElementById(
      "fullName"
    ).textContent = `${userData.first_name} ${userData.last_name}`;
    document.getElementById("email").textContent = userData.email;
    document.getElementById("signUpDate").parentElement.style.display = "none";
    document.getElementById("lastSeen").parentElement.style.display = "none";

    editButton.href = `./edit.html?user=${userId}`;

    document.getElementById("dog-profile-section").style.display = "none";
    document.getElementById("billing-tab").style.display = "none";

    if (userData.role === "admin" && userData.is_master_admin) {
      editButton.classList.add("disabled");
      deleteButton.classList.add("disabled");
    }
  };

  if (document.getElementById("pageTitle")) {
    document.addEventListener("componentsLoaded", initUserRecord);
  }
});
