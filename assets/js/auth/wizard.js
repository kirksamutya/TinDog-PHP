function getBasePath() {
  const path = window.location.pathname;
  const repoName = "/TinDog-PHP/";
  const repoIndex = path.indexOf(repoName);
  if (repoIndex > -1) {
    return path.substring(0, repoIndex + repoName.length);
  }
  return "/";
}

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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      event.stopPropagation();
      return;
    }

    const newUserData = {
      firstName: document.getElementById("ownerFirstName").value,
      lastName: document.getElementById("ownerLastName").value,
      email: `${document
        .getElementById("ownerFirstName")
        .value.toLowerCase()}.${document
        .getElementById("ownerLastName")
        .value.toLowerCase()}@example.com`,
      password: "Password123", // Default password for new users
      role: "user",
      location: document.getElementById("location").value,
      dogName: document.getElementById("dogName").value,
      dogBreed: document.getElementById("dogBreed").value,
      dogSex: document.getElementById("dogSex").value,
      dogSize: document.getElementById("dogSize").value,
      age: document.getElementById("dogAge").value,
      bio: document.getElementById("dogBio").value,
      dogAvatar: document.getElementById("dog-photo-preview").src,
    };

    try {
      const response = await fetch(getBasePath() + "api/create-user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        sessionStorage.setItem("loggedInUserId", result.userId);
        window.location.href = getBasePath() + "app/dashboard.html";
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Failed to create user:", error);
      alert(
        "An unexpected error occurred. Please check the console and try again."
      );
    }
  });

  updateWizardState();
});
