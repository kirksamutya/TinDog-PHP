document.addEventListener("DOMContentLoaded", () => {
  const populateSwipeDeck = () => {
    const swipeDeck = document.querySelector(".swipe-deck");
    if (!swipeDeck) return;

    swipeDeck.innerHTML = "";

    const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};
    const loggedInUserId = sessionStorage.getItem("loggedInUserId");

    const potentialMatches = Object.entries(allUsers).filter(
      ([userId, user]) => user.role === "user" && userId !== loggedInUserId
    );

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
