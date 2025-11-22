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
  const createUserForm = document.getElementById("create-user-form");

  if (createUserForm) {
    // Permission Check: Only Master Admin can create Admins
    const currentAdminIsMaster = sessionStorage.getItem("isMasterAdmin") === "true";
    const roleSelect = document.getElementById("userRole");

    if (roleSelect && !currentAdminIsMaster) {
      // Remove "Administrator" option
      for (let i = 0; i < roleSelect.options.length; i++) {
        if (roleSelect.options[i].value === "admin") {
          roleSelect.remove(i);
          break;
        }
      }
    }

    createUserForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (!this.checkValidity()) {
        event.stopPropagation();
        this.classList.add("was-validated");
        return;
      }

      const newUserData = {
        role: document.getElementById("userRole").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      if (newUserData.role === "admin") {
        newUserData.displayName = `${newUserData.firstName} ${newUserData.lastName}`;
      } else {
        newUserData.location = document.getElementById("ownerLocation").value;
        newUserData.dogName = document.getElementById("dogName").value;
        newUserData.dogBreed = document.getElementById("dogBreed").value;
        newUserData.dogSex = document.getElementById("dogSex").value;
        newUserData.dogSize = document.getElementById("dogSize").value;
        newUserData.plan = document.getElementById("subscriptionPlan").value;
      }

      try {
        const response = await fetch(getBasePath() + "api/create-user.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUserData),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          window.location.href = `${getBasePath()}admin/users/record.html?user=${result.userId
            }`;
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
  }
});
