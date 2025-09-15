document.addEventListener("DOMContentLoaded", () => {
  const wizardFormContainer = document.querySelector(".wizard-form-container");
  const nextButtons = document.querySelectorAll(".btn-next");
  const backButtons = document.querySelectorAll(".btn-back");
  const finishButton = document.querySelector(".btn-finish");
  const progressBar = document.querySelector(".progress-bar");
  const formSteps = document.querySelectorAll(".wizard-form-step");
  let currentStep = 0;

  const updateWizardState = () => {
    const stepWidthPercentage = 100 / formSteps.length;
    wizardFormContainer.style.transform = `translateX(-${
      currentStep * stepWidthPercentage
    }%)`;

    const progressPercentage = ((currentStep + 1) / formSteps.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  };

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep < formSteps.length - 1) {
        currentStep++;
        updateWizardState();
      }
    });
  });

  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        updateWizardState();
      }
    });
  });

  if (finishButton) {
    finishButton.addEventListener("click", () => {
      // In a real application, you would validate the whole form here before redirecting.
      // For this prototype, we will redirect directly to the dashboard.
      window.location.href = "./dashboard.html";
    });
  }

  // Recalculate width on resize to prevent issues
  window.addEventListener("resize", updateWizardState);
});
