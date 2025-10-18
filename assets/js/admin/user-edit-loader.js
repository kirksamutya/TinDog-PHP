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
  const initEditForm = async () => {
    const form = document.getElementById("edit-user-form");
    if (!form) return;

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
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      userData = result.data;
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      document.querySelector(
        ".main-content"
      ).innerHTML = `<p class="text-danger">Could not load user data.</p>`;
      return;
    }

    const setInputValue = (id, value) => {
      const element = document.getElementById(id);
      if (element) {
        element.value = value || "";
      }
    };

    const pageTitle = document.getElementById("pageTitle");
    const pageSubtitle = document.getElementById("pageSubtitle");
    const standardUserFields = document.getElementById("standard-user-fields");
    const adminUserFields = document.getElementById("admin-user-fields");

    pageTitle.textContent = `Edit User: ${userData.first_name} ${userData.last_name}`;

    setInputValue("firstName", userData.first_name);
    setInputValue("lastName", userData.last_name);
    setInputValue("email", userData.email);
    setInputValue("accountStatus", userData.status);

    if (userData.role === "admin") {
      pageSubtitle.textContent =
        "Modify the account details for an Administrator.";
      if (standardUserFields) standardUserFields.style.display = "none";
      if (adminUserFields) adminUserFields.style.display = "block";
      setInputValue("displayName", userData.display_name);
    } else {
      pageSubtitle.textContent =
        "Modify the account details for a Standard User.";
      if (standardUserFields) standardUserFields.style.display = "block";
      if (adminUserFields) adminUserFields.style.display = "none";
    }
  };

  document.addEventListener("componentsLoaded", initEditForm, { once: true });
});
