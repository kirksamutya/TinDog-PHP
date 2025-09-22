document.addEventListener("DOMContentLoaded", () => {
  const sampleUsers = {
    cruz_juan: {
      firstName: "Juan",
      lastName: "Cruz",
      email: "juan.cruz@example.com",
      plan: "mastiff",
      status: "active",
      role: "admin",
      location: "Cebu City, Cebu",
      dogName: "Bantay",
      dogBreed: "Aspin",
      dogSex: "male",
      dogSize: "medium",
    },
    santos_maria: {
      firstName: "Maria",
      lastName: "Santos",
      email: "maria.santos@example.com",
      plan: "labrador",
      status: "active",
      role: "user",
      location: "Mandaue City, Cebu",
      dogName: "Kisses",
      dogBreed: "Shih Tzu",
      dogSex: "female",
      dogSize: "small",
    },
  };

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("user");

  const allUsers =
    JSON.parse(localStorage.getItem("tindogUsers")) || sampleUsers;
  const userData = allUsers[userId] || sampleUsers.cruz_juan;

  document.getElementById(
    "pageTitle"
  ).textContent = `Edit User: ${userData.firstName} ${userData.lastName}`;
  document.getElementById("firstName").value = userData.firstName;
  document.getElementById("lastName").value = userData.lastName;
  document.getElementById("email").value = userData.email;
  document.getElementById("ownerLocation").value = userData.location;
  document.getElementById("dogName").value = userData.dogName;
  document.getElementById("dogBreed").value = userData.dogBreed;
  document.getElementById("dogSex").value = userData.dogSex;
  document.getElementById("dogSize").value = userData.dogSize;
  document.getElementById("subscriptionPlan").value = userData.plan;
  document.getElementById("accountStatus").value = userData.status;

  const editForm = document.getElementById("edit-user-form");
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const updatedData = {
      ...userData, // Preserve existing data like role, etc.
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      location: document.getElementById("ownerLocation").value,
      dogName: document.getElementById("dogName").value,
      dogBreed: document.getElementById("dogBreed").value,
      dogSex: document.getElementById("dogSex").value,
      dogSize: document.getElementById("dogSize").value,
      plan: document.getElementById("subscriptionPlan").value,
      status: document.getElementById("accountStatus").value,
    };

    allUsers[userId] = updatedData;
    localStorage.setItem("tindogUsers", JSON.stringify(allUsers));

    window.location.href = "./admin-user-management.html";
  });
});
