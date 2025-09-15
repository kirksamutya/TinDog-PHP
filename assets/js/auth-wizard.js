document.addEventListener("DOMContentLoaded", () => {
  const wizardFormContainer = document.querySelector(".wizard-form-container");
  if (!wizardFormContainer) return;

  const nextButtons = document.querySelectorAll(".btn-next");
  const backButtons = document.querySelectorAll(".btn-back");
  const finishButton = document.querySelector(".btn-finish");
  const progressBar = document.querySelector(".progress-bar");
  const formSteps = document.querySelectorAll(".wizard-form-step");
  let currentStepIndex = 0;

  const updateWizardState = () => {
    const stepWidthPercentage = 100 / formSteps.length;
    wizardFormContainer.style.transform = `translateX(-${
      currentStepIndex * stepWidthPercentage
    }%)`;
    const progressPercentage =
      ((currentStepIndex + 1) / formSteps.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  };

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStepIndex < formSteps.length - 1) {
        currentStepIndex++;
        updateWizardState();
      }
    });
  });

  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        updateWizardState();
      }
    });
  });

  if (finishButton) {
    finishButton.addEventListener("click", () => {
      window.location.href = "./app-dashboard.html";
    });
  }

  window.addEventListener("resize", updateWizardState);
});
