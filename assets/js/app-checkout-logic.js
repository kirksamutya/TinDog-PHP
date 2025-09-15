document.addEventListener("DOMContentLoaded", () => {
  const planDetails = {
    labrador: {
      name: "Labrador Plan",
      price: "₱149.00",
      subtotal: "₱149.00",
      tax: "₱17.88",
      billed: "₱166.88",
      features: ["Unlimited Matches", "Unlimited Messages", "Advanced Filters"],
    },
    mastiff: {
      name: "Mastiff Plan",
      price: "₱299.00",
      subtotal: "₱299.00",
      tax: "₱35.88",
      billed: "₱334.88",
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
    const currentPlan = planDetails[selectedPlanKey];

    if (currentPlan) {
      updateTextContent("plan-name", currentPlan.name);
      updateTextContent("plan-price", currentPlan.price);
      updateTextContent("subtotal-amount", currentPlan.subtotal);
      updateTextContent("tax-amount", currentPlan.tax);
      updateTextContent("billed-now", currentPlan.billed);
      updateFeaturesList(currentPlan.features);
    }
  };

  initializeCheckoutPage();
});
