document.addEventListener("DOMContentLoaded", function () {
  const swipeDeck = document.querySelector(".swipe-deck");
  const dislikeBtn = document.querySelector(".btn-swipe.dislike");
  const likeBtn = document.querySelector(".btn-swipe.like");

  function swipeCard(direction) {
    const cards = swipeDeck.querySelectorAll(
      ".match-card:not(.swiped-left):not(.swiped-right)"
    );
    if (!cards.length) return;

    const topCard = cards[0];
    topCard.classList.add(
      direction === "left" ? "swiped-left" : "swiped-right"
    );

    // Remove the card from the DOM after animation to allow next card to be targeted
    setTimeout(() => {
      topCard.remove();
    }, 500);
  }

  if (dislikeBtn) {
    dislikeBtn.addEventListener("click", () => swipeCard("left"));
  }
  if (likeBtn) {
    likeBtn.addEventListener("click", () => swipeCard("right"));
  }
});
