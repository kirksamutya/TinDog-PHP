document.addEventListener("DOMContentLoaded", () => {
  // Only run if the table exists
  if (document.querySelector("table")) {
    initUserManagement();
  }
});

// State
let state = {
  users: [],
  filterTerm: "",
  sortBy: "id",
  sortDirection: "asc",
};

async function initUserManagement() {
  setupEventListeners();
  await loadUsers();
}

function setupEventListeners() {
  // Global Search Input
  const searchInput = document.getElementById("user-search-input"); // Matches ID in your HTML
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.filterTerm = e.target.value.toLowerCase();
      renderTable();
    });
  }

  // Sort Headers
  const sortHeaders = document.querySelectorAll(".sortable-header");
  sortHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const column = header.dataset.sortBy;
      if (state.sortBy === column) {
        state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
      } else {
        state.sortBy = column;
        state.sortDirection = "asc";
      }
      updateSortIcons(header);
      renderTable();
    });
  });
}

// --- FETCH LOGIC (Moved directly here) ---
async function loadUsers() {
  const tableBody = document.querySelector("table tbody");
  const token = sessionStorage.getItem("adminToken");

  if (!token) {
    console.warn("No admin token found.");
    // Optional: window.location.href = '../../auth/admin.html';
    return;
  }

  try {
    if (tableBody)
      tableBody.innerHTML =
        '<tr><td colspan="6" class="text-center">Loading...</td></tr>';

    // Fetch directly from Laravel API
    const response = await fetch("http://127.0.0.1:8000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status}`);
    }

    // Store data in state
    state.users = await response.json();

    // Render
    renderTable();
  } catch (error) {
    console.error("Load Error:", error);
    if (tableBody) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Error loading data: ${error.message}</td></tr>`;
    }
  }
}

function renderTable() {
  const tableBody = document.querySelector("table tbody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  // 1. Filter
  let filtered = state.users.filter((user) => {
    const term = state.filterTerm;
    // Match Name, Email, or ID
    const name = (
      user.display_name || `${user.first_name} ${user.last_name}`
    ).toLowerCase();
    const email = (user.email || "").toLowerCase();
    const idStr = String(user.id);

    return name.includes(term) || email.includes(term) || idStr.includes(term);
  });

  // 2. Sort
  filtered.sort((a, b) => {
    let valA = getValueForSort(a, state.sortBy);
    let valB = getValueForSort(b, state.sortBy);

    if (valA < valB) return state.sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return state.sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // 3. Display
  if (!filtered.length) {
    tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No users found.</td></tr>`;
    return;
  }

  filtered.forEach((user) => {
    tableBody.innerHTML += buildUserRow(user);
  });
}

function getValueForSort(user, column) {
  switch (column) {
    case "name":
      return (
        user.display_name || `${user.first_name} ${user.last_name}`
      ).toLowerCase();
    case "email":
      return (user.email || "").toLowerCase();
    case "role":
      return (user.role || "").toLowerCase();
    case "plan":
      return (user.plan || "N/A").toLowerCase();
    case "status":
      return (user.status || "").toLowerCase();
    default:
      return user.id;
  }
}

function updateSortIcons(activeHeader) {
  document.querySelectorAll(".sort-icon").forEach((icon) => {
    icon.className = "bi bi-caret-down-fill sort-icon text-muted";
  });
  const icon = activeHeader.querySelector(".sort-icon");
  if (icon) {
    icon.className = `bi bi-caret-${state.sortDirection === "asc" ? "up" : "down"
      }-fill sort-icon`;
  }
}

function buildUserRow(user) {
  const fullName =
    user.display_name ||
    `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
    "Unknown";
  const avatar = user.dog_avatar || "../../assets/images/dog-img.jpg";
  const role = user.role || "user";
  const plan = user.plan || "free";
  const status = user.status || "active";

  // Determine Role Display Text
  let displayRole = "User";
  if (role === "admin") {
    displayRole = user.is_master_admin ? "Master Admin" : "Administrator";
  }

  // Permission Check
  const currentAdminIsMaster = sessionStorage.getItem("isMasterAdmin") === "true";
  const isTargetAdmin = role === "admin";
  const canManage = !isTargetAdmin || currentAdminIsMaster;

  const editBtn = canManage
    ? `<a href="./edit.html?user=${user.id}" class="btn btn-sm btn-outline-secondary">Edit</a>`
    : `<button class="btn btn-sm btn-outline-secondary" disabled style="opacity: 0.5; cursor: not-allowed;">Edit</button>`;

  const deleteBtn = canManage
    ? `<button type="button" class="btn btn-sm btn-outline-danger" onclick="handleDeleteClick(${user.id}, '${fullName.replace(/'/g, "\\'")}')">Delete</button>`
    : `<button class="btn btn-sm btn-outline-danger" disabled style="opacity: 0.5; cursor: not-allowed;">Delete</button>`;

  return `
    <tr>
      <td>
        <div class="d-flex align-items-center">
          <div class="user-info">
             <div class="fw-bold">${fullName}</div>
             <div class="text-muted small">${user.email}</div>
          </div>
        </div>
      </td>
      <td><span class="badge bg-${role === "admin" ? "primary" : "secondary"
    }">${displayRole}</span></td>
      <td>${plan.toUpperCase()}</td> 
      <td>${user.location || "N/A"}</td> <td>
        <span class="badge bg-${getStatusColor(status)}">
          ${status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>
      <td class="text-end">
        <div class="btn-group" role="group">
           <a href="./record.html?user=${user.id
    }" class="btn btn-sm btn-outline-secondary">View</a>
           ${editBtn}
           ${deleteBtn}
        </div>
      </td>
    </tr>
  `;
}

function getStatusColor(status) {
  switch (status) {
    case "active":
      return "success";
    case "suspended":
      return "warning text-dark";
    case "banned":
      return "danger";
    default:
      return "secondary";
  }
}

// --- DELETE LOGIC (Moved directly here) ---
window.handleDeleteClick = async (userId, userName) => {
  if (
    !confirm(
      `Are you sure you want to delete ${userName}? This action cannot be undone.`
    )
  ) {
    return;
  }

  const token = sessionStorage.getItem("adminToken");
  if (!token) {
    alert("Unauthorized. Please log in.");
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 403) {
        alert("⛔ " + (data.message || "Permission Denied."));
      } else {
        alert("Error: " + (data.message || "Delete failed."));
      }
      return;
    }

    alert("User deleted successfully.");
    loadUsers(); // Refresh table
  } catch (error) {
    console.error("Delete Error:", error);
    alert("Connection error.");
  }
};
