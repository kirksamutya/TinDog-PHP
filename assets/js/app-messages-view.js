document.addEventListener("DOMContentLoaded", function () {
  const conversationItems = document.querySelectorAll(".conversation-item");
  const chatPane = document.querySelector(".chat-window");
  const conversationPane = document.querySelector(".conversation-list");
  const backButton = document.querySelector(".back-button");

  const showChatPane = () => {
    conversationPane.style.display = "none";
    chatPane.style.display = "flex";
  };

  const showConversationPane = () => {
    conversationPane.style.display = "flex";
    chatPane.style.display = "none";
  };

  const handleResponsiveView = () => {
    if (window.innerWidth >= 768) {
      conversationPane.style.display = "flex";
      chatPane.style.display = "flex";
    } else {
      showConversationPane();
    }
  };

  conversationItems.forEach((conversation) => {
    conversation.addEventListener("click", () => {
      conversationItems.forEach((item) => item.classList.remove("active"));
      conversation.classList.add("active");

      if (window.innerWidth < 768) {
        showChatPane();
      }
    });
  });

  if (backButton) {
    backButton.addEventListener("click", showConversationPane);
  }

  // Initial setup
  handleResponsiveView();
  window.addEventListener("resize", handleResponsiveView);

  // Search functionality
  const searchInput = document.getElementById("conversation-search");
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase();
      conversationItems.forEach((item) => {
        const name = item.querySelector(".conv-name").textContent.toLowerCase();
        if (name.includes(searchTerm)) {
          item.classList.remove("d-none");
        } else {
          item.classList.add("d-none");
        }
      });
    });
  }

  // Send message functionality
  const messageForm = document.getElementById("message-form");
  const messageInput = document.getElementById("message-input");
  const chatBody = document.querySelector(".chat-body");

  if (messageForm) {
    messageForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const messageText = messageInput.value.trim();
      if (messageText === "") return;

      const messageElement = document.createElement("div");
      messageElement.classList.add("message", "sent");

      const paragraph = document.createElement("p");
      paragraph.textContent = messageText;
      messageElement.appendChild(paragraph);

      const time = document.createElement("span");
      time.classList.add("message-time");
      const now = new Date();
      time.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      messageElement.appendChild(time);

      chatBody.appendChild(messageElement);
      chatBody.scrollTop = chatBody.scrollHeight;
      messageInput.value = "";
    });
  }
});
