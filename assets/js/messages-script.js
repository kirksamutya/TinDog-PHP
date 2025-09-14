document.addEventListener("DOMContentLoaded", function () {
  const allConversations = document.querySelectorAll(".conversation-item");
  const chatPane = document.querySelector(".chat-window");
  const conversationPane = document.querySelector(".conversation-list");
  const goBackButton = document.querySelector(".back-button");

  function showChatForMobile() {
    conversationPane.style.display = "none";
    chatPane.style.display = "flex";
  }

  allConversations.forEach((conversation) => {
    conversation.addEventListener("click", () => {
      allConversations.forEach((c) => c.classList.remove("active"));
      conversation.classList.add("active");

      if (window.innerWidth < 768) {
        showChatForMobile();
      }
    });
  });

  if (goBackButton) {
    goBackButton.addEventListener("click", () => {
      conversationPane.style.display = "flex";
      chatPane.style.display = "none";
    });
  }

  function handleInitialView() {
    if (window.innerWidth >= 768) {
      conversationPane.style.display = "flex";
      chatPane.style.display = "flex";
    } else {
      conversationPane.style.display = "flex";
      chatPane.style.display = "none";
    }
  }

  handleInitialView();

  window.addEventListener("resize", handleInitialView);
});
