const SidebarHandler = {
    init: async () => {
        const token = sessionStorage.getItem("userToken");
        if (!token) return;

        try {
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
                } else {
                    console.error("API Error:", result.message);
                }
            } else {
                console.error("HTTP Error:", response.status);
            }
        } catch (error) {
            console.error("Sidebar Error:", error);
        }
    },



    updateUI: (user) => {
        // Sidebar Elements
        const sidebarAvatar = document.getElementById("sidebar-user-avatar");
        const sidebarName = document.getElementById("sidebar-user-name");
        const sidebarPlan = document.getElementById("sidebar-user-plan");

        // Header Elements
        const headerAvatar = document.getElementById("header-user-avatar");
        const headerName = document.getElementById("header-user-name");

        // Resolve Avatar Path
        // Priority: Owner Avatar -> Avatar -> Default
        const rawAvatar = user.owner_avatar || user.avatar;
        const defaultAvatar = DataService.resolvePath('assets/images/default-avatar.png');
        const resolvedAvatar = DataService.resolvePath(rawAvatar) || defaultAvatar;

        // Update Sidebar
        if (sidebarAvatar) sidebarAvatar.src = resolvedAvatar;
        if (sidebarName) sidebarName.textContent = user.name;
        if (sidebarPlan) sidebarPlan.textContent = user.plan + " Plan";

        // Update Header
        if (headerAvatar) headerAvatar.src = resolvedAvatar;
        if (headerName) headerName.textContent = user.name;
    },
};

// Initialize when the component is loaded
document.addEventListener("componentsLoaded", () => {
    // Check if sidebar exists
    if (document.getElementById("sidebar-user-name")) {
        SidebarHandler.init();
    }
});
