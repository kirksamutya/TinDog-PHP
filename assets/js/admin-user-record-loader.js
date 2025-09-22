document.addEventListener("DOMContentLoaded", () => {
  const initUserRecord = () => {
    const sampleUsers = {
      eugene_stepnov: {
        fullName: "Eugene Stepnov",
        email: "eugene.stepnov@example.com",
        signUpDate: "6 years ago",
        lastSeen: "Yesterday",
        dogName: "Jorjee",
        breed: "Shih Tzu",
        age: "3 years old",
        sex: "Female",
        size: "Small (0-10kg)",
        location: "Consolacion, PH",
        bio: "Energetic and playful, loves chasing balls and long walks. Looking for a companion to explore with!",
        plan: "Mastiff (₱99/mo)",
        nextPayment: "Oct 12, 2025",
        paymentMethod: "Visa **** 4242",
      },
      maria_s: {
        fullName: "Maria S.",
        email: "maria.s@example.com",
        signUpDate: "1 year ago",
        lastSeen: "3 days ago",
        dogName: "Max",
        breed: "Golden Retriever",
        age: "2 years old",
        sex: "Male",
        size: "Large (26kg+)",
        location: "Mandaue, PH",
        bio: "Loves the beach and playing fetch.",
        plan: "Labrador (₱49/mo)",
        nextPayment: "Oct 15, 2025",
        paymentMethod: "GCash",
      },
      john_d: {
        fullName: "John D.",
        email: "john.d@example.com",
        signUpDate: "2 months ago",
        lastSeen: "1 week ago",
        dogName: "Luna",
        breed: "Poodle",
        age: "5 years old",
        sex: "Female",
        size: "Small (0-10kg)",
        location: "Cebu City, PH",
        bio: "A calm and gentle soul.",
        plan: "Chihuahua (Free)",
        nextPayment: "N/A",
        paymentMethod: "N/A",
      },
    };

    const allUsers =
      JSON.parse(localStorage.getItem("tindogUsers")) || sampleUsers;
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user");
    const userData = allUsers[userId] || sampleUsers.eugene_stepnov;

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
