document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-profile-form");
  if (!form) return;

  const nextButtons = document.querySelectorAll(".btn-next");
  const backButtons = document.querySelectorAll(".btn-back");
  const progressBar = document.querySelector(".progress-bar");
  const formSteps = document.querySelectorAll(".wizard-form-step");
  let currentStepIndex = 0;

  const updateWizardState = () => {
    formSteps.forEach((step, index) => {
      step.style.display = index === currentStepIndex ? "flex" : "none";
    });
    const progressPercentage =
      (currentStepIndex / (formSteps.length - 1)) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  };

  const validateStep = (stepIndex) => {
    const currentStep = formSteps[stepIndex];
    const inputs = currentStep.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    let isStepValid = true;

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        isStepValid = false;
      }
    });

    return isStepValid;
  };

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!validateStep(currentStepIndex)) {
        form.classList.add("was-validated");
        return;
      }
      form.classList.remove("was-validated");
      if (currentStepIndex < formSteps.length - 1) {
        currentStepIndex++;
        updateWizardState();
      }
    });
  });

  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      form.classList.remove("was-validated");
      if (currentStepIndex > 0) {
        currentStepIndex--;
        updateWizardState();
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      event.stopPropagation();
      return;
    }

    const newUser = {
      firstName: document.getElementById("ownerFirstName").value,
      lastName: document.getElementById("ownerLastName").value,
      email: `${document
        .getElementById("ownerFirstName")
        .value.toLowerCase()}.${document
        .getElementById("ownerLastName")
        .value.toLowerCase()}@example.com`,
      location: document.getElementById("location").value,
      dogName: document.getElementById("dogName").value,
      dogBreed: document.getElementById("dogBreed").value,
      dogSex: document.getElementById("dogSex").value,
      dogSize: document.getElementById("dogSize").value,
      age: document.getElementById("dogAge").value,
      bio: document.getElementById("dogBio").value,
      dogAvatar: document.getElementById("dog-photo-preview").src,
    };

    const newUserId = createUser(newUser);
    sessionStorage.setItem("loggedInUserId", newUserId);
    window.location.href = "../app/dashboard.html";
  });

  updateWizardState();
});
