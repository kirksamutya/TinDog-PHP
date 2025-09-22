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

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user");
    const userData = sampleUsers[userId] || sampleUsers.eugene_stepnov;

    document.getElementById(
      "pageTitle"
    ).textContent = `User Record: ${userData.fullName}`;
    document.getElementById("fullName").textContent = userData.fullName;
    document.getElementById("email").textContent = userData.email;
    document.getElementById("signUpDate").textContent = userData.signUpDate;
    document.getElementById("lastSeen").textContent = userData.lastSeen;
    document.getElementById("dogName").textContent = userData.dogName;
    document.getElementById("dogBreed").textContent = userData.breed;
    document.getElementById("dogAge").textContent = userData.age;
    document.getElementById("dogSex").textContent = userData.sex;
    document.getElementById("dogSize").textContent = userData.size;
    document.getElementById("dogLocation").textContent = userData.location;
    document.getElementById("dogBio").textContent = userData.bio;
    document.getElementById("billingPlan").textContent = userData.plan;
    document.getElementById("billingNextPayment").textContent =
      userData.nextPayment;
    document.getElementById(
      "billingPaymentMethod"
    ).innerHTML = `<i class="bi bi-credit-card-2-front-fill me-2"></i> ${userData.paymentMethod}`;
  };

  if (document.querySelector("#pageTitle")) {
    document.addEventListener("componentsLoaded", initUserRecord);
  }
});
