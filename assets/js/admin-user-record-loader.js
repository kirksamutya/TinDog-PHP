document.addEventListener("DOMContentLoaded", () => {
  const initUserRecord = () => {
    const sampleUsers = {
      cruz_juan: {
        fullName: "Juan Cruz",
        email: "juan.cruz@example.com",
        signUpDate: "Sep 22, 2023",
        lastSeen: "2 hours ago",
        dogName: "Bantay",
        breed: "Aspin",
        age: "3 years old",
        sex: "Male",
        size: "Medium (11-25kg)",
        location: "Cebu City, Cebu",
        bio: "Loyal and protective. Loves going for long walks by the sea.",
        plan: "Mastiff (₱299/mo)",
        nextPayment: "Oct 22, 2025",
        paymentMethod: "Visa **** 1234",
      },
      santos_maria: {
        fullName: "Maria Santos",
        email: "maria.santos@example.com",
        signUpDate: "Jan 15, 2024",
        lastSeen: "Yesterday",
        dogName: "Kisses",
        breed: "Shih Tzu",
        age: "2 years old",
        sex: "Female",
        size: "Small (0-10kg)",
        location: "Mandaue City, Cebu",
        bio: "A sweet and cuddly companion. Prefers laps over parks.",
        plan: "Labrador (₱149/mo)",
        nextPayment: "Oct 15, 2025",
        paymentMethod: "GCash",
      },
    };

    const allUsers =
      JSON.parse(localStorage.getItem("tindogUsers")) || sampleUsers;
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user");
    const userData = allUsers[userId] || sampleUsers.cruz_juan;

    document.getElementById("pageTitle").textContent = `User Record: ${
      userData.fullName || userData.firstName + " " + userData.lastName
    }`;
    document.getElementById("fullName").textContent =
      userData.fullName || userData.firstName + " " + userData.lastName;
    document.getElementById("email").textContent = userData.email;
    document.getElementById("signUpDate").textContent =
      userData.signUpDate || "N/A";
    document.getElementById("lastSeen").textContent =
      userData.lastSeen || "N/A";
    document.getElementById("dogName").textContent = userData.dogName;
    document.getElementById("dogBreed").textContent =
      userData.breed || userData.dogBreed;
    document.getElementById("dogAge").textContent = userData.age || "N/A";
    document.getElementById("dogSex").textContent =
      userData.sex || userData.dogSex;
    document.getElementById("dogSize").textContent =
      userData.size || userData.dogSize;
    document.getElementById("dogLocation").textContent =
      userData.location || userData.ownerLocation;
    document.getElementById("dogBio").textContent = userData.bio || "";
    document.getElementById("billingPlan").textContent = userData.plan;
    document.getElementById("billingNextPayment").textContent =
      userData.nextPayment;
    document.getElementById(
      "billingPaymentMethod"
    ).innerHTML = `<i class="bi bi-credit-card-2-front-fill me-2"></i> ${userData.paymentMethod}`;

    const editButton = document.getElementById("editUserBtn");
    const deleteButton = document.getElementById("deleteUserBtn");

    editButton.href = `./admin-user-edit.html?user=${userId}`;

    const deleteModal = new bootstrap.Modal(
      document.getElementById("deleteUserModal")
    );
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

    deleteButton.addEventListener("click", () => {
      document.getElementById("userNameToDelete").textContent =
        userData.fullName || userData.firstName + " " + userData.lastName;
      deleteModal.show();
    });

    confirmDeleteBtn.addEventListener("click", () => {
      delete allUsers[userId];
      localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
      window.location.href = "./admin-user-management.html";
    });
  };

  if (document.getElementById("pageTitle")) {
    document.addEventListener("componentsLoaded", initUserRecord);
  }
});
