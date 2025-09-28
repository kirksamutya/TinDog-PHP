document.addEventListener("DOMContentLoaded", () => {
  const initBillingPage = () => {
    const planDetails = {
      chihuahua: { name: "Chihuahua Plan", price: "₱0", cycle: "/mo" },
      labrador: { name: "Labrador Plan", price: "₱49", cycle: "/mo" },
      mastiff: { name: "Mastiff Plan", price: "₱99", cycle: "/mo" },
    };

    const loggedInUserId = DataService.getLoggedInUserId();
    const allUsers = DataService.getAllUsers();
    const currentUser = allUsers[loggedInUserId];

    if (!currentUser || !currentUser.plan) return;

    const currentPlanDetails = planDetails[currentUser.plan];
    if (!currentPlanDetails) return;

    const planNameEl = document.getElementById("billing-plan-name");
    const planPriceEl = document.getElementById("billing-plan-price");
    const planCycleEl = document.getElementById("billing-plan-cycle");
    const renewalDateEl = document.getElementById("billing-renewal-date");

    if (planNameEl) planNameEl.textContent = currentPlanDetails.name;
    if (planPriceEl) planPriceEl.textContent = currentPlanDetails.price;
    if (planCycleEl) planCycleEl.textContent = currentPlanDetails.cycle;

    if (renewalDateEl) {
      if (currentUser.plan === "chihuahua") {
        renewalDateEl.textContent = "This is a free plan.";
      } else {
        const renewalDate = new Date();
        renewalDate.setMonth(renewalDate.getMonth() + 1);
        const options = { year: "numeric", month: "long", day: "numeric" };
        renewalDateEl.textContent = `Your plan renews on ${renewalDate.toLocaleDateString(
          "en-US",
          options
        )}.`;
      }
    }
  };

  document.addEventListener("componentsLoaded", initBillingPage, {
    once: true,
  });
});
