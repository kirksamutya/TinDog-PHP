document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ User Record Loader v1.4 Loaded");
  initUserRecord();
});

const initUserRecord = async () => {
  // 1. Get User ID
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("user") || urlParams.get("id");

  if (!userId) {
    showError("No user ID provided in the URL.");
    return;
  }

  // 2. Get Token
  const token = sessionStorage.getItem("adminToken");
  if (!token) {
    window.location.href = "../../auth/admin.html";
    return;
  }

  try {
    console.log(`Fetching data for User ID: ${userId}...`);

    // 3. Fetch Data
    const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    const userData = result.data || result;

    // 4. Render Profile
    renderUserProfile(userData);

    // 5. Setup Delete Button
    setupDeleteButton(userId);
  } catch (error) {
    console.error("User Load Error:", error);
    showError(
      `<strong>Connection Failed.</strong><br>Details: ${error.message}`
    );
  }
};

function renderUserProfile(user) {
  // --- Owner Info ---
  setText(
    "fullName",
    user.display_name || `${user.first_name} ${user.last_name}`
  );
  setText("email", user.email);

  const joinedDate = user.signup_date || user.created_at;
  setText("signUpDate", formatDate(joinedDate));

  const lastSeenDate = user.last_seen || user.updated_at;
  setText("lastSeen", formatDate(lastSeenDate));

  // --- Dog Info ---
  const dogSection = document.getElementById("dog-profile-section");
  if (!user.dog_name) {
    if (dogSection) dogSection.style.display = "none";
  } else {
    if (dogSection) dogSection.style.display = "block";
    setText("dogName", user.dog_name);
    setText("dogBreed", user.dog_breed || "Unknown Breed");
    setText("dogAge", user.dog_age ? `${user.dog_age} years` : "N/A");
    setText("dogSex", user.dog_sex || user.gender || "N/A");
    setText("dogSize", user.dog_size || "N/A");
    setText("dogLocation", user.location || "N/A");
    setText("dogBio", user.dog_bio || "No bio available.");
  }

  // --- Billing ---
  setText("billingPlan", (user.plan || "Free").toUpperCase());
  toggleElement("billingNextPaymentRow", false);
  toggleElement("billingPaymentMethodRow", false);

  // --- Buttons ---
  const editBtn = document.getElementById("editUserBtn");
  if (editBtn) editBtn.href = `./edit.html?id=${user.id}`;

  // Show Content
  const overview = document.getElementById("overview");
  if (overview) {
    overview.classList.add("show", "active");
    overview.style.display = "block";
  }
}

function setupDeleteButton(userId) {
  const deleteBtn = document.getElementById("deleteUserBtn");
  if (deleteBtn) {
    // Clone to remove old listeners
    const newDeleteBtn = deleteBtn.cloneNode(true);
    deleteBtn.parentNode.replaceChild(newDeleteBtn, deleteBtn);

    newDeleteBtn.addEventListener("click", () => handleDeleteUser(userId));
  }
}

async function handleDeleteUser(userId) {
  if (
    !confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    )
  ) {
    return;
  }

  const token = sessionStorage.getItem("adminToken");

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
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
    window.location.href = "./index.html";
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Connection error while deleting.");
  }
}

// --- Utilities ---

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || "N/A";
}

function toggleElement(id, show) {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? "block" : "none";
}

function formatDate(dateString) {
  if (!dateString) return "Never";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function showError(htmlMsg) {
  const container = document.querySelector(".main-content");
  if (container) {
    container.innerHTML = `
            <div class="p-4">
                <div class="alert alert-danger">
                    ${htmlMsg}
                </div>
                <a href="index.html" class="btn btn-secondary mt-2">Back to User List</a>
            </div>`;
  }
}
