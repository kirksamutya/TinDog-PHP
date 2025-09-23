const DataService = {
  getLoggedInUserId: () => {
    return sessionStorage.getItem("loggedInUserId") || "saavedra_roel";
  },

  getAllUsers: () => {
    return JSON.parse(localStorage.getItem("tindogUsers")) || {};
  },

  getAllLikes: () => {
    return JSON.parse(localStorage.getItem("tindogLikes")) || {};
  },

  getAllMessages: () => {
    return JSON.parse(localStorage.getItem("tindogMessages")) || {};
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
    const allLikes = DataService.getAllLikes();

    if (allUsers[userIdToDelete]) {
      delete allUsers[userIdToDelete];
    }

    if (allLikes[userIdToDelete]) {
      delete allLikes[userIdToDelete];
    }

    for (const likerId in allLikes) {
      const userLikes = allLikes[likerId];
      const index = userLikes.indexOf(userIdToDelete);
      if (index > -1) {
        userLikes.splice(index, 1);
      }
    }

    localStorage.setItem("tindogUsers", JSON.stringify(allUsers));
    localStorage.setItem("tindogLikes", JSON.stringify(allLikes));

    return true;
  },

  getActivityFeed: function () {
    return this.getNotifications();
  },
};
