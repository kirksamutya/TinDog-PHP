document.addEventListener("DOMContentLoaded", () => {
  const checkUserStatus = () => {
    const loggedInUserId = DataService.getLoggedInUserId();
    if (!loggedInUserId) {
      window.location.href = "./auth-login.html";
      return;
    }

    const allUsers = DataService.getAllUsers();
    const currentUser = allUsers[loggedInUserId];

    if (!currentUser) {
      sessionStorage.clear();
      window.location.href = "./auth-login.html";
      return;
    }

    if (currentUser.status === "banned" || currentUser.status === "suspended") {
      window.location.href = `./app-status.html?status=${currentUser.status}`;
    }
  };

  checkUserStatus();
});
