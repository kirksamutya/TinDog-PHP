function getBasePath() {
  const path = window.location.pathname;
  const repoName = "/TinDog-PHP/";
  const repoIndex = path.indexOf(repoName);
  if (repoIndex > -1) {
    return path.substring(0, repoIndex + repoName.length);
  }
  return "/";
}

document.addEventListener("componentsLoaded", () => {
  const initUserRecord = async () => {
    console.log("✅ initUserRecord running...");

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
      if (!response.ok) throw new Error("User not found or server error.");
      const result = await response.json();
      if (!result.success) throw new Error(result.message);

      userData = result.data;
      console.log("📦 Got userData:", userData);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      document.querySelector(
        ".main-content"
      ).innerHTML = `<p class="text-danger">Could not load user data for user ID ${userId}.</p>`;
      return;
    }

    // === Populate Owner Details ===
    const fullNameEl = document.getElementById("fullName");
    const emailEl = document.getElementById("email");
    const signUpDateEl = document.getElementById("signUpDate");
    const lastSeenEl = document.getElementById("lastSeen");

    fullNameEl.textContent = `${userData.first_name} ${userData.last_name}`;
    emailEl.textContent = userData.email;
    signUpDateEl.textContent = userData.signup_date || "";
    lastSeenEl.textContent = userData.last_seen || "";

    // Make sure owner details are visible
    [fullNameEl, emailEl].forEach((el) => (el.style.display = "block"));
    [signUpDateEl.parentElement, lastSeenEl.parentElement].forEach((el) => {
      el.style.display = el.textContent.trim() ? "block" : "none";
    });

    console.log("Owner details:", fullNameEl.textContent, emailEl.textContent);

    // === Buttons ===
    const editButton = document.getElementById("editUserBtn");
    const deleteButton = document.getElementById("deleteUserBtn");
    editButton.href = `./edit.html?user=${userId}`;
    if (userData.role === "admin" && userData.is_master_admin) {
      editButton.classList.add("disabled");
      deleteButton.classList.add("disabled");
    }

    // === Dog Profile (hide if empty) ===
    const dogSection = document.getElementById("dog-profile-section");
    if (!userData.dog_name && !userData.dog_breed && !userData.dog_age) {
      dogSection.style.display = "none";
    } else {
      dogSection.style.display = "block";
    }

    // === Activity Tab ===
    const activityTab = document.getElementById("activity-tab");
    const activityPane = document.getElementById("activity");
    if (!userData.activity || userData.activity.length === 0) {
      activityTab.style.display = "none";
      activityPane.style.display = "none";
    } else {
      activityTab.style.display = "block";
      activityPane.style.display = "block";
      activityPane.innerHTML = ""; // populate with activity items if needed
    }

    // === Billing Tab ===
    const billingTab = document.getElementById("billing-tab");
    const billingPane = document.getElementById("billing");
    const billingPlanEl = document.getElementById("billingPlan");
    const billingNextEl = document.getElementById("billingNextPayment");
    const billingMethodEl = document.getElementById("billingPaymentMethod");

    billingPlanEl.textContent = userData.billing_plan || "";
    billingNextEl.textContent = userData.billing_next_payment || "";
    billingMethodEl.textContent = userData.billing_payment_method || "";

    // Only show billing tab/pane if at least one field has data
    const hasBillingData =
      billingPlanEl.textContent.trim() ||
      billingNextEl.textContent.trim() ||
      billingMethodEl.textContent.trim();

    if (!hasBillingData) {
      billingTab.style.display = "none";
      billingPane.style.display = "none";
    } else {
      billingTab.style.display = "block";
      billingPane.style.display = "block";
    }

    // === Ensure Overview Tab is visible ===
    const overviewPane = document.getElementById("overview");
    overviewPane.classList.add("show", "active");
    overviewPane.style.display = "block";

    console.log("🎯 Finished rendering user details");
  };

  initUserRecord();
});
