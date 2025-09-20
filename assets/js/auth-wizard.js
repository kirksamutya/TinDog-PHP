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
      (currentStepIndex / (formSteps.length - 1)) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  };

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentStep = formSteps[currentStepIndex];
      const form = currentStep.closest("form");
      const inputs = currentStep.querySelectorAll(
        "input[required], select[required], textarea[required]"
      );
      let isStepValid = true;

      inputs.forEach((input) => {
        if (!input.checkValidity()) {
          isStepValid = false;
        }
      });

      form.classList.add("was-validated");

      if (!isStepValid) {
        return;
      }

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
      const form = finishButton.closest("form");
      if (form.checkValidity()) {
        window.location.href = "./app-dashboard.html";
      } else {
        form.classList.add("was-validated");
      }
    });
  }

  window.addEventListener("resize", updateWizardState);

  updateWizardState();
});
