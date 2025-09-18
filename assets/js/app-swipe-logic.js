document.addEventListener("DOMContentLoaded", function () {
  const swipeDeck = document.querySelector(".swipe-deck");
  if (!swipeDeck) return;

  const dislikeButton = document.querySelector(".btn-swipe.dislike");
  const likeButton = document.querySelector(".btn-swipe.like");

  let activeCard = null;
  let startX, startY, moveX, moveY;

  const initializeCards = () => {
    const allCards = swipeDeck.querySelectorAll(".match-card:not(.removed)");
    allCards.forEach((card, index) => {
      card.style.zIndex = allCards.length - index;
      card.style.transform = `scale(${1 - 0.05 * index}) translateY(${
        10 * index
      }px)`;
    });
    activeCard = allCards[0];
  };

  const startDrag = (e) => {
    if (!activeCard) return;
    startX = e.pageX || e.touches[0].pageX;
    startY = e.pageY || e.touches[0].pageY;
    activeCard.style.transition = "none";
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("touchmove", onDrag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchend", endDrag);
  };

  const onDrag = (e) => {
    if (!activeCard) return;
    moveX = (e.pageX || e.touches[0].pageX) - startX;
    moveY = (e.pageY || e.touches[0].pageY) - startY;

    const rotate = moveX * 0.1;
    activeCard.style.transform = `translateX(${moveX}px) translateY(${moveY}px) rotate(${rotate}deg)`;

    const opacity = Math.abs(moveX) / 100;
    if (moveX > 0) {
      activeCard.querySelector(".stamp.like").style.opacity = opacity;
    } else {
      activeCard.querySelector(".stamp.dislike").style.opacity = opacity;
    }
  };

  const endDrag = (e) => {
    if (!activeCard) return;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("touchmove", onDrag);
    document.removeEventListener("mouseup", endDrag);
    document.removeEventListener("touchend", endDrag);

    if (Math.abs(moveX) > 100) {
      const direction = moveX > 0 ? 1 : -1;
      swipeCard(direction);
    } else {
      resetActiveCard();
    }
  };

  const swipeCard = (direction) => {
    if (!activeCard) return;
    const endX = 200 * direction;
    const flyOutAngle = (Math.random() - 0.5) * 20 * direction;
    activeCard.style.transition = "transform 0.5s ease-out";
    activeCard.style.transform = `translateX(${endX}px) translateY(-100px) rotate(${flyOutAngle}deg)`;
    activeCard.classList.add("removed");
    setTimeout(() => {
      activeCard.style.display = "none";
      activeCard = null;
      initializeCards();
    }, 500);
  };

  const resetActiveCard = () => {
    if (!activeCard) return;
    activeCard.style.transition = "transform 0.4s ease";
    activeCard.style.transform = "";
    activeCard.querySelector(".stamp.like").style.opacity = 0;
    activeCard.querySelector(".stamp.dislike").style.opacity = 0;
    moveX = 0;
    moveY = 0;
  };

  if (dislikeButton) {
    dislikeButton.addEventListener("click", () => swipeCard(-1));
  }
  if (likeButton) {
    likeButton.addEventListener("click", () => swipeCard(1));
  }

  swipeDeck.addEventListener("mousedown", startDrag);
  swipeDeck.addEventListener("touchstart", startDrag);

  initializeCards();
});
