document.addEventListener("DOMContentLoaded", () => {
  const sampleUsers = {
    eugene_stepnov: {
      firstName: "Eugene",
      lastName: "Stepnov",
      email: "eugene.stepnov@example.com",
      location: "Consolacion, PH",
      dogName: "Jorjee",
      dogBreed: "Shih Tzu",
      dogSex: "female",
      dogSize: "small",
      plan: "mastiff",
      status: "active",
    },
    maria_s: {
      firstName: "Maria",
      lastName: "S.",
      email: "maria.s@example.com",
      location: "Mandaue, PH",
      dogName: "Max",
      dogBreed: "Golden Retriever",
      dogSex: "male",
      dogSize: "large",
      plan: "labrador",
      status: "active",
    },
    john_d: {
      firstName: "John",
      lastName: "D.",
      email: "john.d@example.com",
      location: "Cebu City, PH",
      dogName: "Luna",
      dogBreed: "Poodle",
      dogSex: "female",
      dogSize: "small",
      plan: "chihuahua",
      status: "suspended",
    },
  };

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("user");

  const allUsers =
    JSON.parse(localStorage.getItem("tindogUsers")) || sampleUsers;
  const userData = allUsers[userId] || sampleUsers.eugene_stepnov;

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
