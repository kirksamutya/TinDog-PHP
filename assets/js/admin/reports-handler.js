document.addEventListener("DOMContentLoaded", () => {
  const initAdminReports = () => {
    const filterButtons = document.querySelectorAll(".filter-bar .btn-filter");
    const reportTableBody = document.querySelector("table tbody");
    const searchInput = document.getElementById("report-search-input");
    const sortableHeaders = document.querySelectorAll(".sortable-header");

    const allUsers = DataService.getAllUsers();
    let allReports = DataService.getAllReports();
    let currentSort = { key: null, direction: "asc" };
    let currentFilter = "open";

    allReports.forEach((report) => {
      const reportedUser = allUsers[report.reportedUserId];
      const reportingUser = allUsers[report.reportedByUserId];
      report.reportedUserName = reportedUser
        ? `${reportedUser.firstName} ${reportedUser.lastName}`
        : "Unknown";
      report.reportingUserName = reportingUser
        ? `${reportingUser.firstName} ${reportingUser.lastName}`
        : "Unknown";
      report.reportedUserId = report.reportedUserId;
      report.reportedByUserId = report.reportedByUserId;
    });

    const createUserCell = (user) => {
      if (!user) {
        return `<div class="d-flex align-items-center">
                  <div class="user-avatar-initials me-3">?</div>
                  <div><strong>Unknown User</strong></div>
                </div>`;
      }
      return `
      <div class="d-flex align-items-center">
          <div class="user-avatar-initials me-3">
            ${user.firstName.charAt(0)}${user.lastName.charAt(0)}
          </div>
          <div>
            <strong>${user.firstName} ${user.lastName}</strong>
            <small class="d-block text-muted">ID: ${user.id}</small>
          </div>
      </div>`;
    };

    const renderTable = (reportsToRender) => {
      reportTableBody.innerHTML = "";
      if (!reportsToRender.length) {
        reportTableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No reports found.</td></tr>`;
        return;
      }
      reportsToRender.forEach((report) => {
        const reportedUser = allUsers[report.reportedUserId];
        const reportingUser = allUsers[report.reportedByUserId];

        const statusText =
          report.status.charAt(0).toUpperCase() + report.status.slice(1);
        let statusBadge;
        switch (report.status) {
          case "open":
            statusBadge = `<span class="badge bg-danger">${statusText}</span>`;
            break;
          case "banned":
            statusBadge = `<span class="badge bg-danger">${statusText}</span>`;
            break;
          case "suspended":
            statusBadge = `<span class="badge bg-warning text-dark">${statusText}</span>`;
            break;
          default:
            statusBadge = `<span class="badge bg-success">${statusText}</span>`;
            break;
        }

        const actions =
          report.status === "open"
            ? `
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-sm btn-outline-secondary view-details-btn" data-report-id="${report.id}">View Details</button>
                    <button type="button" class="btn btn-sm btn-outline-success resolve-btn" data-report-id="${report.id}">Resolve</button>
                </div>`
            : `
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-sm btn-outline-secondary view-details-btn" data-report-id="${report.id}">View Details</button>
                </div>`;

        const row = document.createElement("tr");
        row.dataset.reportId = report.id;
        row.innerHTML = `
                <td>${createUserCell(reportedUser)}</td>
                <td>${createUserCell(reportingUser)}</td>
                <td>${report.reason}</td>
                <td>${report.date}</td>
                <td>${statusBadge}</td>
                <td class="text-end">${actions}</td>
            `;
        reportTableBody.appendChild(row);
      });
    };

    const filterAndSortTable = () => {
      const searchTerm = searchInput.value.toLowerCase();
      let filteredReports = allReports.filter(
        (report) =>
          (currentFilter === "all" || report.status === currentFilter) &&
          (report.reportedUserName.toLowerCase().includes(searchTerm) ||
            report.reportingUserName.toLowerCase().includes(searchTerm) ||
            report.reason.toLowerCase().includes(searchTerm) ||
            report.reportedUserId.toLowerCase().includes(searchTerm) ||
            report.reportedByUserId.toLowerCase().includes(searchTerm))
      );

      if (currentSort.key) {
        filteredReports.sort((a, b) => {
          const aValue = a[currentSort.key] || "";
          const bValue = b[currentSort.key] || "";
          if (aValue < bValue) return currentSort.direction === "asc" ? -1 : 1;
          if (aValue > bValue) return currentSort.direction === "asc" ? 1 : -1;
          return 0;
        });
      }

      renderTable(filteredReports);
    };

    searchInput.addEventListener("input", filterAndSortTable);

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
        currentFilter = this.dataset.filter;
        filterAndSortTable();
      });
    });

    sortableHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        const sortBy = header.dataset.sortBy;
        if (currentSort.key === sortBy) {
          currentSort.direction =
            currentSort.direction === "asc" ? "desc" : "asc";
        } else {
          currentSort.key = sortBy;
          currentSort.direction = "asc";
        }

        sortableHeaders.forEach((h) => h.classList.remove("asc", "desc"));
        header.classList.add(currentSort.direction);

        filterAndSortTable();
      });
    });

    const reportModalElement = document.getElementById("reportDetailsModal");
    const reportModal = new bootstrap.Modal(reportModalElement);
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

      if (button.classList.contains("view-details-btn")) {
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
      } else if (button.classList.contains("resolve-btn")) {
        const reportIndex = allReports.findIndex((r) => r.id == activeReportId);
        if (reportIndex !== -1) {
          allReports[reportIndex].status = "resolved";
          localStorage.setItem("tindogReports", JSON.stringify(allReports));
          filterAndSortTable();
        }
      }
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

      const newStatus = selectedAction.value.toLowerCase();
      const reportIndex = allReports.findIndex((r) => r.id == activeReportId);
      const report = allReports[reportIndex];
      const user = allUsers[report.reportedUserId];

      if (newStatus === "suspended" || newStatus === "banned") {
        user.status = newStatus;
        localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
      }

      allReports[reportIndex].status = newStatus;
      localStorage.setItem("tindogReports", JSON.stringify(allReports));

      reportModal.hide();
      filterAndSortTable();
    });

    reportModalElement.addEventListener("hidden.bs.modal", () => {
      switchToDetailsView();
      filterAndSortTable();
    });

    filterAndSortTable();
  };

  if (document.querySelector("table")) {
    document.addEventListener("componentsLoaded", initAdminReports);
  }
});
