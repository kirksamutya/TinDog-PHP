document.addEventListener("DOMContentLoaded", () => {
  const initUserProfile = () => {
    const allUsers = JSON.parse(localStorage.getItem("tindogUsers"));
    if (!allUsers) {
      console.error("User data not found in localStorage.");
      return;
    }

    const loggedInUserId =
      sessionStorage.getItem("loggedInUserId") || "saavedra_roel";
    const userData = allUsers[loggedInUserId];

    if (!userData) {
      console.error("Logged-in user data not found.");
      return;
    }

    document.getElementById("dog-name").textContent = userData.dogName;
    document.getElementById("dog-breed").textContent = userData.dogBreed;
    document.getElementById("dog-sex").textContent =
      userData.dogSex.charAt(0).toUpperCase() + userData.dogSex.slice(1);
    document.getElementById("dog-size").textContent =
      userData.dogSize.charAt(0).toUpperCase() + userData.dogSize.slice(1);
    document.getElementById("dog-age").textContent = `${
      userData.age || 2
    } years old`;
    document.getElementById("dog-bio").textContent = userData.bio || "";

    document.getElementById(
      "owner-name"
    ).textContent = `${userData.firstName} ${userData.lastName}`;
    document.getElementById("owner-location").textContent = userData.location;
    document.getElementById("owner-bio").textContent = userData.ownerBio || "";

    const sidebarName = document.querySelector(".sidebar-profile-card h6");
    if (sidebarName)
      sidebarName.textContent = `${userData.firstName} ${userData.lastName}`;

    const sidebarPlan = document.querySelector(".sidebar-profile-card small");
    if (sidebarPlan)
      sidebarPlan.textContent = `${
        userData.plan.charAt(0).toUpperCase() + userData.plan.slice(1)
      } Plan`;
  };

  if (document.querySelector(".page-profile")) {
    document.addEventListener("componentsLoaded", initUserProfile);
  }
});
