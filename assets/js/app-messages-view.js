document.addEventListener("DOMContentLoaded", function () {
  const conversationItems = document.querySelectorAll(".conversation-item");
  const chatPane = document.querySelector(".chat-window");
  const conversationPane = document.querySelector(".conversation-list");
  const backButton = document.querySelector(".back-button");

  const showChatPaneOnMobile = () => {
    conversationPane.style.display = "none";
    chatPane.style.display = "flex";
  };

  const showConversationPaneOnMobile = () => {
    conversationPane.style.display = "flex";
    chatPane.style.display = "none";
  };

  conversationItems.forEach((conversation) => {
    conversation.addEventListener("click", () => {
      conversationItems.forEach((item) => item.classList.remove("active"));
      conversation.classList.add("active");

      if (window.innerWidth < 768) {
        showChatPaneOnMobile();
      }
    });
  });

  if (backButton) {
    backButton.addEventListener("click", showConversationPaneOnMobile);
  }

  const handleResponsiveView = () => {
    if (window.innerWidth >= 768) {
      conversationPane.style.display = "flex";
      chatPane.style.display = "flex";
    } else {
      showConversationPaneOnMobile();
    }
  };

  handleResponsiveView();
  window.addEventListener("resize", handleResponsiveView);
});
