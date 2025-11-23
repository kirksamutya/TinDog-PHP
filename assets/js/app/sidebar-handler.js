const SidebarHandler = {
    init: async () => {
        const token = sessionStorage.getItem("userToken");
        if (!token) return;

        try {
            // We can reuse the dashboard data if available, or fetch it
            // For simplicity, we'll fetch it here to ensure sidebar works independently
            const response = await fetch("http://127.0.0.1:8000/api/user/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    SidebarHandler.updateUI(result.data.user);
                }
            }
        } catch (error) {
            console.error("Sidebar Error:", error);
        }
    },

    updateUI: (user) => {
        const avatarEl = document.getElementById("sidebar-user-avatar");
        const nameEl = document.getElementById("sidebar-user-name");
        const planEl = document.getElementById("sidebar-user-plan");

        if (avatarEl) {
            // Handle Base64 or URL
            if (user.avatar && !user.avatar.startsWith('http') && !user.avatar.startsWith('data:')) {
                // If it's just a filename, assume it's not supported yet or handle accordingly
                // For now, our backend sends full URL or Base64
            }
            avatarEl.src = user.avatar || '../assets/images/default-avatar.png';
        }
        if (nameEl) nameEl.textContent = user.name;
        if (planEl) planEl.textContent = user.plan + " Plan";
    },
};

// Initialize when the component is loaded
document.addEventListener("componentsLoaded", () => {
    // Check if sidebar exists
    if (document.getElementById("sidebar-user-name")) {
        SidebarHandler.init();
    }
});
