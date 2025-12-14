const DataService = {
  // Centralized Session Management
  getToken: () => {
    return sessionStorage.getItem("userToken");
  },

  getLoggedInUserId: () => {
    return sessionStorage.getItem("loggedInUserId") || "saavedra_roel";
  },

  getLoggedInAdminId: () => {
    return sessionStorage.getItem("loggedInAdminId");
  },

  saveSession: (data) => {
    sessionStorage.setItem("loggedInUserId", data.userId);
    sessionStorage.setItem("userToken", data.token);
    sessionStorage.setItem("userRole", data.role);
    sessionStorage.setItem("userPlan", data.plan || "free");
    sessionStorage.setItem("isMasterAdmin", data.is_master_admin);
  },

  clearSession: () => {
    sessionStorage.removeItem("loggedInUserId");
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userPlan");
    sessionStorage.removeItem("isMasterAdmin");
  },

  /**
   * Fetches all users from the API for the admin panel.
   */
  getAllUsers: async () => {
    const token = DataService.getToken(); // Updated to use centralized getter

    if (!token) {
      console.error("Admin token not found. Please log in again.");
      throw new Error("Authentication token not found.");
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // Send the token for auth
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch users");
      }

      return await response.json();
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      throw error;
    }
  },

  getAllLikes: () => {
    return JSON.parse(localStorage.getItem("tindogLikes")) || {};
  },

  getAllMessages: () => {
    return JSON.parse(localStorage.getItem("tindogConversations")) || {};
  },

  getAllReports: () => {
    return JSON.parse(localStorage.getItem("tindogReports")) || [];
  },

  // We will migrate these functions next, after the user table is working.
  getDashboardStats: () => {
    const loggedInUserId = DataService.getLoggedInUserId();
    const allLikes = DataService.getAllLikes();
    const allMessages = DataService.getAllMessages();

    const currentUserLikes = allLikes[loggedInUserId] || [];
    let newMatches = 0;
    currentUserLikes.forEach((likedUserId) => {
      const otherUserLikes = allLikes[likedUserId] || [];
      if (otherUserLikes.includes(loggedInUserId)) {
        newMatches++;
      }
    });

    let unreadMessages = 0;
    let unreadConversations = 0;
    Object.values(allMessages).forEach((convo) => {
      let hasUnread = false;
      convo.messages.forEach((msg) => {
        if (msg.type === "received" && !msg.read) {
          unreadMessages++;
          hasUnread = true;
        }
      });
      if (hasUnread) {
        unreadConversations++;
      }
    });

    return {
      newMatches: newMatches,
      unreadMessages: unreadMessages,
      unreadConversations: unreadConversations,
      profileViews: 42,
    };
  },

  getNotifications: () => {
    // This will also be migrated
    return [];
  },

  deleteUser: (userIdToDelete) => {
    // This will be migrated
    if (!userIdToDelete) return false;
    return false;
  },

  getActivityFeed: function () {
    return this.getNotifications();
  },

  resolvePath: (path) => {
    if (!path) return null;

    // 1. If it's a data URL or absolute URL, return as is
    if (path.startsWith('data:') || path.startsWith('http') || path.startsWith('/')) {
      return path;
    }

    // 2. Clean up relative path indicators
    // Remove all occurrences of "../" and "./"
    const cleanPath = path.replace(/^(\.\.\/|\.\/)+/, '');

    // 3. Determine current depth and prepend correct prefix
    const currentPath = window.location.pathname;

    // Check for deep paths (profile, matches, admin, etc.)
    // We can count the slashes to determine depth relative to root
    // Root: /index.html or / (depth 1)
    // App: /app/dashboard.html (depth 2)
    // Deep: /app/profile/index.html (depth 3)

    // Simple heuristic based on known structure:
    const isDeep = currentPath.includes('/profile/') ||
      currentPath.includes('/matches/') ||
      currentPath.includes('/admin/users/');

    const prefix = isDeep ? '../../' : '../';

    return `${prefix}${cleanPath}`;
  },
};
