document.addEventListener("DOMContentLoaded", () => {
  const initReportModal = () => {
    const reportModalElement = document.getElementById("reportDetailsModal");
    if (!reportModalElement) return;

    const reportModal = new bootstrap.Modal(reportModalElement);
    const reportTableBody = document.querySelector("table tbody");

    const modalTitle = document.getElementById("modalTitle");
    const detailsView = document.getElementById("report-details-view");
    const actionsView = document.getElementById("report-actions-view");
    const detailsFooter = document.getElementById("details-footer");
    const actionsFooter = document.getElementById("actions-footer");

    const takeActionButton = document.getElementById("take-action-btn");
    const cancelActionButton = document.getElementById("cancel-action-btn");
    const confirmActionButton = document.getElementById("confirm-action-btn");
    const actionRadioGroup = document.querySelectorAll(
      'input[name="report-action"]'
    );

    let activeReportId = null;

    const switchToDetailsView = () => {
      modalTitle.textContent = "Report Details";
      detailsView.style.display = "block";
      detailsFooter.style.display = "flex";
      actionsView.style.display = "none";
      actionsFooter.style.display = "none";
      confirmActionButton.disabled = true;
      actionRadioGroup.forEach((radio) => (radio.checked = false));
    };

    const switchToActionsView = () => {
      modalTitle.textContent = "Take Action";
      detailsView.style.display = "none";
      detailsFooter.style.display = "none";
      actionsView.style.display = "block";
      actionsFooter.style.display = "flex";
    };

    reportTableBody.addEventListener("click", function (event) {
      const button = event.target.closest("button");
      if (!button) return;

      const reportId = button.dataset.reportId;
      if (!reportId) return;

      activeReportId = reportId;
      const allUsers = JSON.parse(localStorage.getItem("tindogUsers"));
      const allReports = JSON.parse(localStorage.getItem("tindogReports"));
      const report = allReports.find((r) => r.id == activeReportId);

      const reportedUser = allUsers[report.reportedUserId];
      const reportingUser = allUsers[report.reportedByUserId];

      document.getElementById(
        "modalReportedUser"
      ).textContent = `${reportedUser.firstName} ${reportedUser.lastName}`;
      document.getElementById(
        "modalReportedBy"
      ).textContent = `${reportingUser.firstName} ${reportingUser.lastName}`;
      document.getElementById("modalReason").textContent = report.reason;
      document.getElementById("modalDate").textContent = report.date;
      document.getElementById(
        "actionUserName"
      ).textContent = `${reportedUser.firstName} ${reportedUser.lastName}`;

      const modalStatusBadge = document.getElementById("modalStatus");
      modalStatusBadge.className = "badge";
      modalStatusBadge.textContent = report.status;

      if (report.status === "open") {
        modalStatusBadge.classList.add("bg-danger");
        takeActionButton.style.display = "block";
      } else {
        modalStatusBadge.classList.add("bg-success");
        takeActionButton.style.display = "none";
      }

      switchToDetailsView();
      reportModal.show();
    });

    takeActionButton.addEventListener("click", switchToActionsView);
    cancelActionButton.addEventListener("click", switchToDetailsView);

    actionRadioGroup.forEach((radio) => {
      radio.addEventListener("change", () => {
        confirmActionButton.disabled = false;
      });
    });

    confirmActionButton.addEventListener("click", () => {
      if (!activeReportId) return;

      const selectedAction = document.querySelector(
        'input[name="report-action"]:checked'
      );
      if (!selectedAction) return;

      const allUsers = JSON.parse(localStorage.getItem("tindogUsers"));
      const allReports = JSON.parse(localStorage.getItem("tindogReports"));
      const reportIndex = allReports.findIndex((r) => r.id == activeReportId);
      const report = allReports[reportIndex];

      const newStatus = selectedAction.value.toLowerCase();

      if (newStatus === "suspended" || newStatus === "banned") {
        const user = allUsers[report.reportedUserId];
        if (user) {
          user.status = newStatus;
          localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
        }
      }

      allReports[reportIndex].status = "resolved";
      localStorage.setItem("tindogReports", JSON.stringify(allReports));

      reportModal.hide();
      window.location.reload();
    });

    reportModalElement.addEventListener("hidden.bs.modal", switchToDetailsView);
  };

  if (document.querySelector(".table")) {
    document.addEventListener("componentsLoaded", initReportModal);
  }
});
