document.addEventListener("DOMContentLoaded", () => {
  const initReportModal = () => {
    const reportModalElement = document.getElementById("reportDetailsModal");
    if (!reportModalElement) {
      return;
    }

    const reportModal = new bootstrap.Modal(reportModalElement);
    const viewDetailsButtons = document.querySelectorAll(
      ".btn-group .btn-outline-secondary"
    );

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

    let activeRow = null;

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

    viewDetailsButtons.forEach((button) => {
      button.addEventListener("click", function () {
        activeRow = this.closest("tr");
        const reportedUser = activeRow.cells[0].textContent.trim();
        const reportedBy = activeRow.cells[1].textContent.trim();
        const reason = activeRow.cells[2].textContent.trim();
        const date = activeRow.cells[3].textContent.trim();
        const status = activeRow.querySelector(".badge").textContent.trim();

        document.getElementById("modalReportedUser").textContent = reportedUser;
        document.getElementById("modalReportedBy").textContent = reportedBy;
        document.getElementById("modalReason").textContent = reason;
        document.getElementById("modalDate").textContent = date;
        document.getElementById("modalStatus").textContent = status;
        document.getElementById("actionUserName").textContent = reportedUser;

        const modalStatusBadge = document.getElementById("modalStatus");
        modalStatusBadge.className = "badge";
        if (status.toLowerCase() === "open") {
          modalStatusBadge.classList.add("bg-danger");
          takeActionButton.style.display = "block";
        } else {
          modalStatusBadge.classList.add("bg-success");
          takeActionButton.style.display = "none";
        }

        switchToDetailsView();
        reportModal.show();
      });
    });

    takeActionButton.addEventListener("click", switchToActionsView);
    cancelActionButton.addEventListener("click", switchToDetailsView);

    actionRadioGroup.forEach((radio) => {
      radio.addEventListener("change", () => {
        confirmActionButton.disabled = false;
      });
    });

    confirmActionButton.addEventListener("click", () => {
      if (!activeRow) return;

      const selectedAction = document.querySelector(
        'input[name="report-action"]:checked'
      );
      if (!selectedAction) return;

      const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};
      const reportedUserName = activeRow.cells[0].textContent.trim();

      const userId = Object.keys(allUsers).find(
        (key) =>
          (allUsers[key].firstName + " " + allUsers[key].lastName).trim() ===
          reportedUserName
      );

      let newStatus = "active";
      if (selectedAction.id === "action-suspend") newStatus = "suspended";
      if (selectedAction.id === "action-ban") newStatus = "banned";

      if (userId && selectedAction.id !== "action-dismiss") {
        allUsers[userId].status = newStatus;
        localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
      }

      const selectedActionLabel = document.querySelector(
        `label[for="${selectedAction.id}"]`
      );
      const newStatusText = selectedActionLabel.textContent.split(" ")[0];

      const statusBadge = activeRow.querySelector(".badge");
      statusBadge.classList.remove("bg-danger");
      statusBadge.classList.add("bg-success");
      statusBadge.textContent = newStatusText;

      const resolveButton = activeRow.querySelector(".btn-outline-success");
      if (resolveButton) {
        resolveButton.remove();
      }

      reportModal.hide();
      document.querySelector(".filter-bar .btn-filter.active").click();
    });

    reportModalElement.addEventListener("hidden.bs.modal", switchToDetailsView);
  };

  if (document.querySelector(".table")) {
    document.addEventListener("componentsLoaded", initReportModal);
  }
});
