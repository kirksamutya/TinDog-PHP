document.addEventListener("DOMContentLoaded", () => {
  const initAdminReportsFilter = () => {
    const filterButtons = document.querySelectorAll(".filter-bar .btn-filter");
    const reportRows = document.querySelectorAll("tbody tr");
    const resolveButtons = document.querySelectorAll(".btn-outline-success");

    if (!filterButtons.length) {
      return;
    }

    const applyCurrentFilter = () => {
      const activeButton = document.querySelector(
        ".filter-bar .btn-filter.active"
      );
      if (activeButton) {
        const filterValue = activeButton.textContent.trim().toLowerCase();
        filterReports(filterValue);
      }
    };

    const filterReports = (filterStatus) => {
      reportRows.forEach((row) => {
        const rowStatus = row
          .querySelector(".badge")
          .textContent.trim()
          .toLowerCase();
        const isOpen = rowStatus === "open";

        if (filterStatus === "all") {
          row.style.display = "";
        } else if (filterStatus === "open" && isOpen) {
          row.style.display = "";
        } else if (filterStatus === "resolved" && !isOpen) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
        applyCurrentFilter();
      });
    });

    resolveButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const row = this.closest("tr");
        const statusBadge = row.querySelector(".badge");

        statusBadge.classList.remove("bg-danger");
        statusBadge.classList.add("bg-success");
        statusBadge.textContent = "Dismissed";

        this.remove();

        applyCurrentFilter();
      });
    });

    applyCurrentFilter();
  };

  if (document.querySelector(".filter-bar")) {
    document.addEventListener("componentsLoaded", initAdminReportsFilter);
  }
});
