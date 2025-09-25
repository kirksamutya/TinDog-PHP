document.addEventListener("DOMContentLoaded", () => {
  const reportModalEl = document.getElementById("reportUserModal");
  if (!reportModalEl) return;

  const reportForm = document.getElementById("reportUserForm");
  const submitBtn = document.getElementById("submitReportBtn");
  const otherReasonContainer = document.getElementById("otherReasonContainer");
  const otherReasonText = document.getElementById("otherReasonText");
  const reportRadios = reportForm.querySelectorAll(
    'input[name="reportReason"]'
  );
  const reportUserNameEl = document.getElementById("reportUserName");

  let reportedUserId = null;
  let reportedUserName = null;

  reportModalEl.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;
    reportedUserId = button.getAttribute("data-reported-user-id");
    reportedUserName = button.getAttribute("data-reported-user-name");
    reportUserNameEl.textContent = reportedUserName;
  });

  reportRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      submitBtn.disabled = false;
      otherReasonContainer.style.display =
        radio.value === "Other" ? "block" : "none";
    });
  });

  submitBtn.addEventListener("click", () => {
    const selectedReason = reportForm.querySelector(
      'input[name="reportReason"]:checked'
    );
    if (!selectedReason || !reportedUserId) return;

    let reasonText =
      selectedReason.value === "Other"
        ? otherReasonText.value.trim()
        : selectedReason.value;
    if (!reasonText) {
      alert("Please describe the issue for 'Other'.");
      return;
    }

    const allReports = JSON.parse(localStorage.getItem("tindogReports")) || [];
    const reportingUserId = sessionStorage.getItem("loggedInUserId");

    const newReport = {
      id: Date.now(),
      reportedUserId: reportedUserId,
      reportedByUserId: reportingUserId,
      reason: reasonText,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "open",
    };

    allReports.push(newReport);
    localStorage.setItem("tindogReports", JSON.stringify(allReports));

    const reportModal = bootstrap.Modal.getInstance(reportModalEl);
    reportModal.hide();

    reportForm.reset();
    submitBtn.disabled = true;
    otherReasonContainer.style.display = "none";

    const blockModalEl = document.getElementById("blockUserModal");
    const blockUserNameEl = document.getElementById("blockUserName");
    blockUserNameEl.textContent = reportedUserName;
    blockModalEl.setAttribute("data-user-to-block", reportedUserId);

    const blockModal = new bootstrap.Modal(blockModalEl);
    blockModal.show();
  });

  const confirmBlockBtn = document.getElementById("confirmBlockBtn");
  confirmBlockBtn.addEventListener("click", () => {
    const blockModalEl = document.getElementById("blockUserModal");
    const userToBlock = blockModalEl.getAttribute("data-user-to-block");
    const loggedInUserId = sessionStorage.getItem("loggedInUserId");

    if (!userToBlock || !loggedInUserId) return;

    const allBlocks = JSON.parse(localStorage.getItem("tindogBlocks")) || {};
    if (!allBlocks[loggedInUserId]) {
      allBlocks[loggedInUserId] = [];
    }
    if (!allBlocks[loggedInUserId].includes(userToBlock)) {
      allBlocks[loggedInUserId].push(userToBlock);
    }
    localStorage.setItem("tindogBlocks", JSON.stringify(allBlocks));

    const blockModal = bootstrap.Modal.getInstance(blockModalEl);
    blockModal.hide();

    alert(`${reportedUserName} has been blocked.`);
    window.location.reload();
  });
});
