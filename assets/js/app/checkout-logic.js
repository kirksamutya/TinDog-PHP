document.addEventListener("DOMContentLoaded", () => {
  const planDetails = {
    labrador: {
      name: "Labrador Plan",
      monthly: {
        price: "₱49.00",
        billed: "₱49.00",
        cycleText: "/mo",
      },
      annual: {
        price: "₱490.00",
        billed: "₱490.00",
        cycleText: "/yr",
      },
      features: ["Unlimited Matches", "Unlimited Messages", "Advanced Filters"],
    },
    mastiff: {
      name: "Mastiff Plan",
      monthly: {
        price: "₱99.00",
        billed: "₱99.00",
        cycleText: "/mo",
      },
      annual: {
        price: "₱990.00",
        billed: "₱990.00",
        cycleText: "/yr",
      },
      features: [
        "Unlimited Matches & Messages",
        "Advanced Filters",
        "Priority Listing",
      ],
    },
  };

  const getUrlParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  const updateTextContent = (elementId, text) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    }
  };

  const updateFeaturesList = (features) => {
    const featuresListElement = document.getElementById("plan-features");
    if (!featuresListElement) return;
    featuresListElement.innerHTML = "";
    features.forEach((featureText) => {
      const listItem = document.createElement("li");
      listItem.className = "mb-2";
      listItem.innerHTML = `<i class="bi bi-check-circle-fill text-success me-2"></i>${featureText}`;
      featuresListElement.appendChild(listItem);
    });
  };

  const initializeCheckoutPage = () => {
    const selectedPlanKey = getUrlParameter("plan") || "labrador";
    const selectedBilling = getUrlParameter("billing") || "monthly";
    const currentPlan = planDetails[selectedPlanKey];

    if (currentPlan) {
      const planData = currentPlan[selectedBilling] || currentPlan.monthly;

      updateTextContent("plan-name", currentPlan.name);
      updateTextContent("plan-price", planData.price);
      updateTextContent("price-cycle", planData.cycleText);
      updateTextContent("billed-now", planData.billed);
      updateFeaturesList(currentPlan.features);
    }
  };

  const handleCheckout = () => {
    window.location.href = "./auth-create-profile.html";
  };

  initializeCheckoutPage();

  if (window.initializeFormValidation) {
    window.initializeFormValidation("checkout-form", handleCheckout);
  }
});
