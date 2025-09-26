document.addEventListener("DOMContentLoaded", () => {
  const populateSwipeDeck = () => {
    const swipeDeck = document.querySelector(".swipe-deck");
    if (!swipeDeck) return;

    swipeDeck.innerHTML = "";

    const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};
    const loggedInUserId = sessionStorage.getItem("loggedInUserId");
    const allBlocks = JSON.parse(localStorage.getItem("tindogBlocks")) || {};
    const discoverySettings =
      JSON.parse(localStorage.getItem("tindogDiscoverySettings")) || {};

    const myBlockList = allBlocks[loggedInUserId] || [];
    const usersWhoBlockedMe = Object.keys(allBlocks).filter((userId) =>
      allBlocks[userId].includes(loggedInUserId)
    );
    const combinedBlockList = new Set([...myBlockList, ...usersWhoBlockedMe]);

    let potentialMatches = Object.entries(allUsers).filter(([userId, user]) => {
      const isUser = user.role === "user";
      const isNotMe = userId !== loggedInUserId;
      const isNotBlocked = !combinedBlockList.has(userId);

      if (!isUser || !isNotMe || !isNotBlocked) {
        return false;
      }

      const matchesSex =
        !discoverySettings.dogSex ||
        discoverySettings.dogSex === "any" ||
        user.dogSex === discoverySettings.dogSex;
      const matchesSize =
        !discoverySettings.dogSize ||
        discoverySettings.dogSize === "any" ||
        user.dogSize === discoverySettings.dogSize;
      const matchesAge =
        !discoverySettings.age || user.age <= discoverySettings.age;

      return matchesSex && matchesSize && matchesAge;
    });

    potentialMatches.sort(([, a], [, b]) => {
      if (a.plan === "mastiff" && b.plan !== "mastiff") {
        return -1;
      }
      if (b.plan === "mastiff" && a.plan !== "mastiff") {
        return 1;
      }
      return 0;
    });

    let cardsHtml = "";
    potentialMatches.forEach(([userId, user]) => {
      cardsHtml += `
        <div class="match-card" data-user-id="${userId}">
          <div class="stamp dislike">Nope</div>
          <div class="stamp like">Like</div>
          <img src="https://placedog.net/500/500?id=${user.age}" alt="${
        user.dogName
      }" class="card-img-top" />
          <div class="card-info-overlay">
            <h5 class="card-title">${user.dogName}, ${user.age}</h5>
            <p class="card-text">${
              user.bio ? user.bio.substring(0, 50) + "..." : "Ready to play!"
            }</p>
            <button class="btn btn-sm btn-light info-button" data-user-id="${userId}">
              <i class="bi bi-info-circle"></i>
            </button>
          </div>
        </div>`;
    });

    swipeDeck.innerHTML = cardsHtml;
    document.dispatchEvent(new Event("deckPopulated"));
  };

  if (document.querySelector(".page-find-matches")) {
    document.addEventListener("componentsLoaded", populateSwipeDeck);
  }
});
