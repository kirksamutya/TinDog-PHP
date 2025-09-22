document.addEventListener("DOMContentLoaded", () => {
  const initReportModal = () => {
    const reportModalElement = document.getElementById("reportDetailsModal");
    if (!reportModalElement) return;

    const reportModal = new bootstrap.Modal(reportModalElement);
    const reportTableBody = document.querySelector("table tbody");

    const modalTitle = document.getElementById("modalTitle");
    const takeActionButton = document.getElementById("take-action-btn");
    const confirmActionButton = document.getElementById("confirm-action-btn");

    let activeReportId = null;

    reportTableBody.addEventListener("click", function (event) {
      if (event.target.classList.contains("btn-outline-secondary")) {
        activeReportId = event.target.dataset.reportId;
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

        const modalStatusBadge = document.getElementById("modalStatus");
        modalStatusBadge.textContent = report.status;

        takeActionButton.style.display =
          report.status === "open" ? "block" : "none";

        reportModal.show();
      }
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
        user.status = newStatus;
        localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
      }

      allReports[reportIndex].status = "resolved";
      localStorage.setItem("tindogReports", JSON.stringify(allReports));

      reportModal.hide();
      window.location.reload();
    });
  };

  if (document.querySelector(".table")) {
    document.addEventListener("componentsLoaded", initReportModal);
  }
});
