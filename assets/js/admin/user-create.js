document.addEventListener("DOMContentLoaded", () => {
  const userRoleSelect = document.getElementById("userRole");
  const standardUserFields = document.getElementById("standard-user-fields");

  if (!userRoleSelect || !standardUserFields) {
    return;
  }

  const toggleUserFields = () => {
    if (userRoleSelect.value === "user") {
      standardUserFields.style.display = "block";
    } else {
      standardUserFields.style.display = "none";
    }
  };

  toggleUserFields();

  userRoleSelect.addEventListener("change", toggleUserFields);
});
