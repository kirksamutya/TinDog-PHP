document.addEventListener("DOMContentLoaded", () => {
  const billingToggle = document.getElementById("billing-toggle");
  if (!billingToggle) return;

  const pricingCards = document.querySelectorAll(".pricing-card");
  const checkoutLinks = document.querySelectorAll(".checkout-link");

  billingToggle.addEventListener("change", () => {
    const isAnnual = billingToggle.checked;

    pricingCards.forEach((card) => {
      const monthlyPrice = card.dataset.monthlyPrice;
      const annualPrice = card.dataset.annualPrice;
      const priceElement = card.querySelector(".price");
      const perMonthElement = card.querySelector(".per-month");

      if (isAnnual) {
        priceElement.textContent = `₱${annualPrice}`;
        if (annualPrice !== "0") {
          perMonthElement.textContent = "/yr";
        }
      } else {
        priceElement.textContent = `₱${monthlyPrice}`;
        if (monthlyPrice !== "0") {
          perMonthElement.textContent = "/mo";
        }
      }
    });

    checkoutLinks.forEach((link) => {
      const originalHref = link.dataset.originalHref;
      if (isAnnual) {
        link.href = `../auth/checkout.html${originalHref.substring(
          originalHref.indexOf("?")
        )}&billing=annual`;
      } else {
        link.href = `../auth/checkout.html${originalHref.substring(
          originalHref.indexOf("?")
        )}`;
      }
    });
  });
});
