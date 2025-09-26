const DataService = {
  getLoggedInUserId: () => {
    return sessionStorage.getItem("loggedInUserId") || "saavedra_roel";
  },

  getLoggedInAdminId: () => {
    return sessionStorage.getItem("loggedInAdminId");
  },

  getAllUsers: () => {
    return JSON.parse(localStorage.getItem("tindogUsers")) || {};
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
    const loggedInUserId = DataService.getLoggedInUserId();
    const allUsers = DataService.getAllUsers();
    const allLikes = DataService.getAllLikes();
    const allMessages = DataService.getAllMessages();
    const notifications = [];

    const currentUserLikes = allLikes[loggedInUserId] || [];
    currentUserLikes.forEach((likedUserId) => {
      const otherUserLikes = allLikes[likedUserId] || [];
      if (otherUserLikes.includes(loggedInUserId)) {
        const matchUser = allUsers[likedUserId];
        if (matchUser) {
          notifications.push({
            type: "match",
            message: `You have a new match with <strong>${matchUser.dogName}</strong>!`,
            time: "12m ago",
            user: matchUser,
          });
        }
      }
    });

    Object.entries(allMessages).forEach(([key, convo]) => {
      const unread = convo.messages.some(
        (msg) => msg.type === "received" && !msg.read
      );
      if (unread) {
        notifications.push({
          type: "message",
          message: `<strong>${convo.name}</strong> sent you a new message.`,
          time: "2h ago",
          user: convo,
        });
      }
    });
    return notifications;
  },

  deleteUser: (userIdToDelete) => {
    if (!userIdToDelete) return false;

    const allUsers = DataService.getAllUsers();

    if (allUsers[userIdToDelete]) {
      allUsers[userIdToDelete].status = "banned";
      localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
      return true;
    }

    return false;
  },

  getActivityFeed: function () {
    return this.getNotifications();
  },
};
