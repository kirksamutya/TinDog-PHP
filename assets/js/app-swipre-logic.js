document.addEventListener("DOMContentLoaded", function () {
  const swipeDeck = document.querySelector(".swipe-deck");
  if (!swipeDeck) return;

  const dislikeButton = document.querySelector(".btn-swipe.dislike");
  const likeButton = document.querySelector(".btn-swipe.like");

  const swipeTopCard = (direction) => {
    const allCards = swipeDeck.querySelectorAll(
      ".match-card:not(.swiped-left):not(.swiped-right)"
    );
    if (!allCards.length) return;

    const topCard = allCards[allCards.length - 1]; // In the new HTML, the top card is last
    const swipeClass = direction === "left" ? "swiped-left" : "swiped-right";
    topCard.classList.add(swipeClass);

    setTimeout(() => {
      topCard.remove();
    }, 500);
  };

  if (dislikeButton) {
    dislikeButton.addEventListener("click", () => swipeTopCard("left"));
  }
  if (likeButton) {
    likeButton.addEventListener("click", () => swipeTopCard("right"));
  }
});
