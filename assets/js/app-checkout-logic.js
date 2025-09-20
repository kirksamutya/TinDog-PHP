document.addEventListener("DOMContentLoaded", () => {
  const planDetails = {
    labrador: {
      name: "Labrador Plan",
      monthly: {
        price: "₱149.00",
        subtotal: "₱149.00",
        tax: "₱17.88",
        billed: "₱166.88",
        cycleText: "/mo",
      },
      annual: {
        price: "₱1,490.00",
        subtotal: "₱1,490.00",
        tax: "₱178.80",
        billed: "₱1,668.80",
        cycleText: "/yr",
      },
      features: ["Unlimited Matches", "Unlimited Messages", "Advanced Filters"],
    },
    mastiff: {
      name: "Mastiff Plan",
      monthly: {
        price: "₱299.00",
        subtotal: "₱299.00",
        tax: "₱35.88",
        billed: "₱334.88",
        cycleText: "/mo",
      },
      annual: {
        price: "₱2,990.00",
        subtotal: "₱2,990.00",
        tax: "₱358.80",
        billed: "₱3,348.80",
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
      updateTextContent("subtotal-amount", planData.subtotal);
      updateTextContent("tax-amount", planData.tax);
      updateTextContent("billed-now", planData.billed);
      updateFeaturesList(currentPlan.features);
    }
  };

  initializeCheckoutPage();
});
