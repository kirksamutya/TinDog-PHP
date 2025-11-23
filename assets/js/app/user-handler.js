const UserHandler = {
    init: async () => {
        const token = sessionStorage.getItem("userToken");
        if (!token) {
            // Redirect to login if not on public page? 
            // For now, just return to avoid errors on public pages if any
            return;
        }

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
                    UserHandler.updateHeader(result.data.user);
                    UserHandler.updateSidebar(result.data.user);
                }
            }
        } catch (error) {
            console.error("UserHandler Error:", error);
        }
    },

    updateHeader: (user) => {
        const headerAvatar = document.querySelector(".header-avatar");
        const headerName = document.querySelector("#navbarUserDropdown span");

        if (headerAvatar) headerAvatar.src = user.avatar || '../assets/images/default-avatar.png';
        if (headerName) headerName.textContent = user.name;
    },

    updateSidebar: (user) => {
        const avatarEl = document.getElementById("sidebar-user-avatar");
        const nameEl = document.getElementById("sidebar-user-name");
        const planEl = document.getElementById("sidebar-user-plan");

        if (avatarEl) avatarEl.src = user.avatar || '../assets/images/default-avatar.png';
        if (nameEl) nameEl.textContent = user.name;
        if (planEl) planEl.textContent = user.plan + " Plan";
    },
};

document.addEventListener("componentsLoaded", () => {
    UserHandler.init();
});
