document.addEventListener("DOMContentLoaded", () => {
  const initUserProfile = () => {
    const allUsers = JSON.parse(localStorage.getItem("tindogUsers"));
    if (!allUsers) {
      console.error("User data not found in localStorage.");
      return;
    }

    const loggedInUserId = sessionStorage.getItem("loggedInUserId");
    if (!loggedInUserId) {
      console.error("No user is logged in.");
      window.location.href = "./auth-login.html";
      return;
    }
    const userData = allUsers[loggedInUserId];

    if (!userData) {
      console.error("Logged-in user data not found.");
      window.location.href = "./auth-login.html";
      return;
    }

    const setText = (id, text) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = text || "N/A";
      }
    };

    setText("dog-name", userData.dogName);
    setText("dog-breed", userData.dogBreed);
    setText(
      "dog-sex",
      userData.dogSex
        ? userData.dogSex.charAt(0).toUpperCase() + userData.dogSex.slice(1)
        : "N/A"
    );
    setText(
      "dog-size",
      userData.dogSize
        ? userData.dogSize.charAt(0).toUpperCase() + userData.dogSize.slice(1)
        : "N/A"
    );
    setText("dog-age", userData.age ? `${userData.age} years old` : "N/A");
    setText("dog-bio", userData.bio || "No bio yet.");

    setText("owner-name", `${userData.firstName} ${userData.lastName}`);
    setText("owner-location", userData.location);
    setText("owner-bio", userData.ownerBio || "No bio yet.");

    const sidebarName = document.querySelector(".sidebar-profile-card h6");
    if (sidebarName) {
      sidebarName.textContent = `${userData.firstName} ${userData.lastName}`;
    }

    const sidebarPlan = document.querySelector(".sidebar-profile-card small");
    if (sidebarPlan) {
      const plan = userData.plan || "N/A";
      sidebarPlan.textContent = `${
        plan.charAt(0).toUpperCase() + plan.slice(1)
      } Plan`;
    }
  };

  if (document.querySelector(".page-profile")) {
    document.addEventListener("componentsLoaded", initUserProfile);
  }
});
