document.addEventListener("DOMContentLoaded", () => {
  const loadMyMatches = () => {
    const matchesGrid = document.getElementById("matches-grid");
    if (!matchesGrid) return;

    const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};
    const allLikes = JSON.parse(localStorage.getItem("tindogLikes")) || {};
    const loggedInUserId = sessionStorage.getItem("loggedInUserId");
    const allBlocks = JSON.parse(localStorage.getItem("tindogBlocks")) || {};

    const myBlockList = allBlocks[loggedInUserId] || [];

    const currentUserLikes = allLikes[loggedInUserId] || [];
    let matchesHtml = "";
    let matchCount = 0;

    currentUserLikes.forEach((likedUserId) => {
      if (myBlockList.includes(likedUserId)) return;

      const otherUserLikes = allLikes[likedUserId] || [];
      if (otherUserLikes.includes(loggedInUserId)) {
        const matchUser = allUsers[likedUserId];
        if (matchUser) {
          const status = matchCount % 2 === 0 ? "new" : "read";
          matchesHtml += `
            <div class="col match-card-container" data-status="${status}">
              <div class="card match-card h-100">
                <img
                  src="https://placedog.net/400/400?id=${matchUser.age}"
                  class="match-card-img"
                  alt="${matchUser.dogName}"
                />
                <div class="card-body">
                  <h5 class="card-title d-flex align-items-center">
                    ${matchUser.dogName}, ${matchUser.age}
                  </h5>
                  <p class="card-text text-muted">${matchUser.dogBreed}</p>
                </div>
                <div class="card-footer">
                  <div class="btn-group w-100">
                    <a
                      href="./app-view-profile.html?user=${likedUserId}"
                      class="btn btn-tindog-outline"
                      ><i class="bi bi-person-fill"></i></a
                    >
                    <a
                      href="./app-messages.html?user=${likedUserId}"
                      class="btn btn-tindog-primary"
                      ><i class="bi bi-chat-dots-fill me-2"></i>Message</a
                    >
                  </div>
                </div>
              </div>
            </div>
          `;
          matchCount++;
        }
      }
    });

    if (matchesHtml === "") {
      matchesGrid.innerHTML =
        '<p class="text-muted col-12">You have no matches yet. Keep swiping!</p>';
    } else {
      matchesGrid.innerHTML = matchesHtml;
    }

    document.dispatchEvent(new Event("matchesLoaded"));
  };

  if (document.getElementById("matches-grid")) {
    document.addEventListener("componentsLoaded", loadMyMatches);
  }
});
