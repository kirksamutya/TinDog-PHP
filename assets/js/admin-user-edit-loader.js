document.addEventListener("DOMContentLoaded", () => {
  const editForm = document.getElementById("edit-user-form");
  if (!editForm) return;

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("user");
  const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};
  const userData = allUsers[userId];

  const pageTitle = document.getElementById("pageTitle");
  const pageSubtitle = document.getElementById("pageSubtitle");
  const standardUserFields = document.getElementById("standard-user-fields");
  const adminUserFields = document.getElementById("admin-user-fields");

  const loadUserData = () => {
    if (!userData) return;

    pageTitle.textContent = `Edit User: ${userData.firstName} ${userData.lastName}`;

    document.getElementById("firstName").value = userData.firstName;
    document.getElementById("lastName").value = userData.lastName;
    document.getElementById("email").value = userData.email;
    document.getElementById("accountStatus").value = userData.status;

    if (userData.role === "admin") {
      pageSubtitle.textContent =
        "Modify the account details for an Administrator.";
      standardUserFields.style.display = "none";
      adminUserFields.style.display = "block";
      document.getElementById("displayName").value = userData.displayName || "";
    } else {
      pageSubtitle.textContent =
        "Modify the account details for a Standard User.";
      standardUserFields.style.display = "block";
      adminUserFields.style.display = "none";
      document.getElementById("ownerLocation").value = userData.location || "";
      document.getElementById("dogName").value = userData.dogName || "";
      document.getElementById("dogBreed").value = userData.dogBreed || "";
      document.getElementById("dogSex").value = userData.dogSex || "male";
      document.getElementById("dogSize").value = userData.dogSize || "small";
      document.getElementById("subscriptionPlan").value =
        userData.plan || "free";
    }
  };

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let updatedData = {
      ...userData,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      status: document.getElementById("accountStatus").value,
    };

    if (userData.role === "admin") {
      updatedData.displayName = document.getElementById("displayName").value;
    } else {
      updatedData.location = document.getElementById("ownerLocation").value;
      updatedData.dogName = document.getElementById("dogName").value;
      updatedData.dogBreed = document.getElementById("dogBreed").value;
      updatedData.dogSex = document.getElementById("dogSex").value;
      updatedData.dogSize = document.getElementById("dogSize").value;
      updatedData.plan = document.getElementById("subscriptionPlan").value;
    }

    allUsers[userId] = updatedData;
    localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
    window.location.href = "./admin-user-management.html";
  });

  loadUserData();
});
