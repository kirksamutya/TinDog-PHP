document.addEventListener("DOMContentLoaded", () => {
  const wizardFormContainer = document.querySelector(".wizard-form-container");
  if (!wizardFormContainer) return;

  const form = document.getElementById("create-profile-form");
  const nextButtons = document.querySelectorAll(".btn-next");
  const backButtons = document.querySelectorAll(".btn-back");
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

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};
    const firstName = document.getElementById("ownerFirstName").value;
    const lastName = document.getElementById("ownerLastName").value;
    const newUserId = (firstName + "_" + lastName)
      .toLowerCase()
      .replace(/\s/g, "_");

    allUsers[newUserId] = {
      firstName: firstName,
      lastName: lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      location: document.getElementById("location").value,
      dogName: document.getElementById("dogName").value,
      dogBreed: document.getElementById("dogBreed").value,
      dogSex: document.getElementById("dogSex").value,
      dogSize: document.getElementById("dogSize").value,
      age: document.getElementById("dogAge").value,
      bio: document.getElementById("dogBio").value,
      plan: "chihuahua",
      status: "active",
      role: "user",
      signUpDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      lastSeen: "Just now",
    };

    localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
    window.location.href = "./app-dashboard.html";
  });

  window.addEventListener("resize", updateWizardState);
  updateWizardState();
});
