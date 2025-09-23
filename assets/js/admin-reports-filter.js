document.addEventListener("DOMContentLoaded", () => {
  const initAdminReportsFilter = () => {
    const filterButtons = document.querySelectorAll(".filter-bar .btn-filter");
    const reportTableBody = document.querySelector("table tbody");

    const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};
    let allReports = JSON.parse(localStorage.getItem("tindogReports")) || [];

    const createUserCell = (user) => `
      <div class="d-flex align-items-center">
          <div class="user-avatar-initials me-3">
            ${user.firstName.charAt(0)}${user.lastName.charAt(0)}
          </div>
          <div>
            <strong>${user.firstName} ${user.lastName}</strong>
          </div>
      </div>`;

    const renderTable = () => {
      reportTableBody.innerHTML = "";
      allReports.forEach((report) => {
        const reportedUser = allUsers[report.reportedUserId];
        const reportingUser = allUsers[report.reportedByUserId];

        if (!reportedUser || !reportingUser) return;

        const statusText =
          report.status.charAt(0).toUpperCase() + report.status.slice(1);
        let statusBadge;
        switch (report.status) {
          case "open":
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
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-report-id="${report.id}">View Details</button>
                    <button type="button" class="btn btn-sm btn-outline-success" data-report-id="${report.id}">Resolve</button>
                </div>`
            : `
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-report-id="${report.id}">View Details</button>
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
      applyCurrentFilter();
    };

    const applyCurrentFilter = () => {
      const activeButton = document.querySelector(
        ".filter-bar .btn-filter.active"
      );
      const filterStatus = activeButton.textContent.trim().toLowerCase();
      const rows = reportTableBody.querySelectorAll("tr");

      rows.forEach((row) => {
        const report = allReports.find((r) => r.id == row.dataset.reportId);
        if (!report) return;

        const isResolved = report.status !== "open";

        if (
          filterStatus === "all" ||
          (filterStatus === "open" && !isResolved) ||
          (filterStatus === "resolved" && isResolved)
        ) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    };

    reportTableBody.addEventListener("click", function (event) {
      if (event.target.classList.contains("btn-outline-success")) {
        const reportId = event.target.dataset.reportId;
        const reportIndex = allReports.findIndex((r) => r.id == reportId);
        if (reportIndex !== -1) {
          allReports[reportIndex].status = "dismissed";
          localStorage.setItem("tindogReports", JSON.stringify(allReports));
          renderTable();
        }
      }
    });

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
        applyCurrentFilter();
      });
    });

    renderTable();
  };

  if (document.querySelector(".filter-bar")) {
    document.addEventListener("componentsLoaded", initAdminReportsFilter);
  }
});
