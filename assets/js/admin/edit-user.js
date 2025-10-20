document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("edit-user-form");

  // Get user ID from URL (updated to match ?user=1)
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("user"); // <-- changed from "id" to "user"

  if (!userId) {
    alert("No user ID provided in the URL.");
    return;
  }

  // Load existing user data
  fetch(`../../api/get-users.php`)
    .then((res) => res.json())
    .then((users) => {
      const user = users.find((u) => u.id == userId);
      if (!user) {
        alert("User not found!");
        return;
      }

      // Fill in form fields
      document.getElementById("accountStatus").value = user.status || "active";
      document.getElementById("displayName").value = user.display_name || "";
      document.getElementById("firstName").value = user.first_name || "";
      document.getElementById("lastName").value = user.last_name || "";
      document.getElementById("email").value = user.email || "";
    })
    .catch((error) => {
      console.error("Error loading user:", error);
      alert("Failed to load user data.");
    });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedData = {
      user_id: parseInt(userId),
      email: document.getElementById("email").value,
      first_name: document.getElementById("firstName").value,
      last_name: document.getElementById("lastName").value,
      display_name: document.getElementById("displayName").value,
      // role: "admin", // You can make this dynamic if needed
      status: document.getElementById("accountStatus").value,
    };

    fetch("../../api/update-user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          alert("✅ User updated successfully!");
          window.location.href = "./index.html"; // go back to user list
        } else {
          alert("❌ " + response.message);
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("Error updating user.");
      });
  });
});
