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
  const initAdminProfile = async () => {
    const adminProfileSection = document.querySelector(".page-header");
    if (!adminProfileSection) return;

    const loggedInAdminId = sessionStorage.getItem("loggedInUserId");
    const token = sessionStorage.getItem("userToken");

    if (!loggedInAdminId || !token) {
      window.location.href = getBasePath() + "auth/admin.html";
      return;
    }

    let adminUser;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${loggedInAdminId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to load admin data.");
      }

      const result = await response.json();
      adminUser = result.data || result;
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      document.querySelector(".main-content").innerHTML =
        '<p class="text-danger p-4">Error loading admin profile. Please try again.</p>';
      return;
    }

    const profileForm = document.getElementById("admin-profile-form");
    if (!profileForm) return;

    const passwordForm = document.getElementById("change-password-form");
    const passwordModal = new bootstrap.Modal(
      document.getElementById("changePasswordModal")
    );

    const avatar = document.getElementById("admin-avatar");
    const displayName = document.getElementById("admin-displayname");
    const displayNameInput = document.getElementById("displayName");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const adminRole = document.getElementById("admin-role");

    const loadAdminData = () => {
      avatar.textContent =
        adminUser.first_name.charAt(0) + adminUser.last_name.charAt(0);
      displayName.textContent = adminUser.display_name;
      displayNameInput.value = adminUser.display_name;
      firstNameInput.value = adminUser.first_name;
      lastNameInput.value = adminUser.last_name;
      emailInput.value = adminUser.email;
      adminRole.textContent = adminUser.is_master_admin
        ? "Master Admin"
        : "Administrator";
    };

    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Save changes functionality is not yet implemented.");
    });

    passwordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Change password functionality is not yet implemented.");
    });

    loadAdminData();
  };

  document.addEventListener("componentsLoaded", initAdminProfile, {
    once: true,
  });
});
