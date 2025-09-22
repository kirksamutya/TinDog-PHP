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

    viewDetailsButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const row = this.closest("tr");
        const reportedUser = row.cells[0].textContent.trim();
        const reportedBy = row.cells[1].textContent.trim();
        const reason = row.cells[2].textContent.trim();
        const date = row.cells[3].textContent.trim();
        const status = row.querySelector(".badge").textContent.trim();

        document.getElementById("modalReportedUser").textContent = reportedUser;
        document.getElementById("modalReportedBy").textContent = reportedBy;
        document.getElementById("modalReason").textContent = reason;
        document.getElementById("modalDate").textContent = date;
        document.getElementById("modalStatus").textContent = status;

        const modalStatusBadge = document.getElementById("modalStatus");
        modalStatusBadge.className = "badge";
        if (status.toLowerCase() === "open") {
          modalStatusBadge.classList.add("bg-danger");
        } else {
          modalStatusBadge.classList.add("bg-success");
        }

        reportModal.show();
      });
    });
  };

  if (document.querySelector(".table")) {
    document.addEventListener("componentsLoaded", initReportModal);
  }
});
