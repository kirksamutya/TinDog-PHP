document.addEventListener("DOMContentLoaded", () => {
  const conversationItems = document.querySelectorAll(".conversation-item");
  const chatWindow = document.querySelector(".chat-window");
  const chatHeaderName = document.getElementById("chat-header-name");
  const chatHeaderAvatar = document.getElementById("chat-header-avatar");
  const messageForm = document.getElementById("message-form");
  const messageInput = document.getElementById("message-input");
  const chatBody = document.querySelector(".chat-body");
  const typingIndicator = document.querySelector(".typing-indicator");

  const setActiveConversation = (selectedItem) => {
    conversationItems.forEach((item) => item.classList.remove("active"));
    selectedItem.classList.add("active");

    const userName = selectedItem.querySelector(".conv-name").textContent;
    const userAvatarSrc = selectedItem.querySelector(".avatar").src;

    chatHeaderName.textContent = userName;
    chatHeaderAvatar.src = userAvatarSrc;

    chatWindow.classList.add("active");
  };

  conversationItems.forEach((item) => {
    item.addEventListener("click", () => setActiveConversation(item));
  });

  if (messageForm) {
    messageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const messageText = messageInput.value.trim();
      if (messageText === "") return;

      const sentMessage = document.createElement("div");
      sentMessage.className = "message sent";
      sentMessage.innerHTML = `<p>${messageText}</p><span class="message-time">${new Date().toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      )}</span>`;
      chatBody.appendChild(sentMessage);

      messageInput.value = "";
      chatBody.scrollTop = chatBody.scrollHeight;

      if (typingIndicator) {
        setTimeout(() => {
          typingIndicator.style.display = "flex";
          chatBody.scrollTop = chatBody.scrollHeight;
        }, 500);

        setTimeout(() => {
          typingIndicator.style.display = "none";
          const receivedMessage = document.createElement("div");
          receivedMessage.className = "message received";
          receivedMessage.innerHTML = `<p>Woof woof!</p><span class="message-time">${new Date().toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )}</span>`;
          chatBody.appendChild(receivedMessage);
          chatBody.scrollTop = chatBody.scrollHeight;
        }, 2500);
      }
    });
  }
});
