// app-report.js
document.addEventListener("DOMContentLoaded", () => {
  const reportForm = document.getElementById("reportUserForm");
  const submitBtn = document.getElementById("submitReportBtn");
  const otherReasonContainer = document.getElementById("otherReasonContainer");
  const otherReasonText = document.getElementById("otherReasonText");
  const reportRadios = reportForm.querySelectorAll(
    'input[name="reportReason"]'
  );

  // Enable submit button when a reason is selected
  reportRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      submitBtn.disabled = false;

      if (radio.value === "Other") {
        otherReasonContainer.style.display = "block";
      } else {
        otherReasonContainer.style.display = "none";
        otherReasonText.value = "";
      }
    });
  });

  // Handle report submit
  submitBtn.addEventListener("click", () => {
    const selectedReason = reportForm.querySelector(
      'input[name="reportReason"]:checked'
    );
    if (!selectedReason) return;

    let reasonText = selectedReason.value;
    if (reasonText === "Other") {
      reasonText = otherReasonText.value.trim();
      if (!reasonText) {
        alert("Please describe the issue for 'Other'.");
        return;
      }
    }

    const reportedUser = document.getElementById("reportUserName").textContent;

    // Log the report (replace with localStorage or server logic)
    console.log("Report submitted:", {
      reportedUser,
      reason: reasonText,
    });

    // Close the report modal
    const reportModalEl = document.getElementById("reportUserModal");
    const reportModal = bootstrap.Modal.getInstance(reportModalEl);
    reportModal.hide();

    // Reset form
    reportForm.reset();
    submitBtn.disabled = true;
    otherReasonContainer.style.display = "none";

    // Open block modal automatically if you want
    const blockModalEl = document.getElementById("blockUserModal");
    const blockUserNameEl = document.getElementById("blockUserName");
    blockUserNameEl.textContent = reportedUser;

    const blockModal = new bootstrap.Modal(blockModalEl);
    blockModal.show();

    alert(`Report submitted for ${reportedUser} (${reasonText})`);
  });

  // Handle Block User button click
  const confirmBlockBtn = document.getElementById("confirmBlockBtn");
  confirmBlockBtn.addEventListener("click", () => {
    const blockedUser = document.getElementById("blockUserName").textContent;

    // Add your logic to block the user here
    // Example: console log or update localStorage/server
    console.log(`User blocked: ${blockedUser}`);

    // Close the block modal
    const blockModalEl = document.getElementById("blockUserModal");
    const blockModal = bootstrap.Modal.getInstance(blockModalEl);
    blockModal.hide();

    alert(`${blockedUser} has been blocked.`);
  });
});
