document.addEventListener("DOMContentLoaded", () => {
  const conversationItems = document.querySelectorAll(".conversation-item");
  const chatWindow = document.querySelector(".chat-window");
  const chatHeaderName = document.getElementById("chat-header-name");
  const chatHeaderAvatar = document.getElementById("chat-header-avatar");
  const messageForm = document.getElementById("message-form");
  const messageInput = document.getElementById("message-input");
  const chatBody = document.querySelector(".chat-body");
  const conversationPane = document.querySelector(".conversation-list");
  const backButton = document.querySelector(".back-button");

  const conversations = {
    bruce: {
      name: "Bruce",
      avatar: "./assets/images/bruce.jpg",
      messages: [
        {
          type: "received",
          text: "Hey! Is your human free for a playdate this weekend?",
          time: "5:30 PM",
        },
        {
          type: "sent",
          text: "Woof! Yes! I would love that!",
          time: "5:31 PM",
        },
        {
          type: "received",
          text: "Great! How about the dog park on Saturday around 3 PM?",
          time: "5:32 PM",
        },
        {
          type: "sent",
          text: "Sure, let's meet at the park!",
          time: "5:42 PM",
        },
      ],
    },
    pebbles: {
      name: "Pebbles",
      avatar: "./assets/images/dog-img.jpg",
      messages: [
        {
          type: "received",
          text: "Haha, my human is so slow.",
          time: "2h ago",
        },
        {
          type: "sent",
          text: "Mine too! They can never keep up on walks.",
          time: "1h ago",
        },
      ],
    },
  };

  const createMessageHTML = (message) => {
    return `<div class="message ${message.type}">
              <p>${message.text}</p>
              <span class="message-time">${message.time}</span>
            </div>`;
  };

  const getTypingIndicatorHTML = () => {
    return `<div class="message received typing-indicator" style="display: none;">
                <div class="dot"></div><div class="dot"></div><div class="dot"></div>
              </div>`;
  };

  const loadConversation = (dogNameKey) => {
    const conversation = conversations[dogNameKey.toLowerCase()];
    if (!conversation) return;

    chatHeaderName.textContent = conversation.name;
    chatHeaderAvatar.src = conversation.avatar;

    chatBody.innerHTML =
      conversation.messages.map(createMessageHTML).join("") +
      getTypingIndicatorHTML();
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const messageText = messageInput.value.trim();
    if (messageText === "") return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const sentMessageHTML = createMessageHTML({
      type: "sent",
      text: messageText,
      time: time,
    });

    const typingIndicatorElement = chatBody.querySelector(".typing-indicator");
    if (typingIndicatorElement) {
      chatBody.insertBefore(
        document.createRange().createContextualFragment(sentMessageHTML),
        typingIndicatorElement
      );
    }

    messageInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      if (typingIndicatorElement) typingIndicatorElement.style.display = "flex";
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(() => {
        if (typingIndicatorElement)
          typingIndicatorElement.style.display = "none";
        const replyTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const receivedMessageHTML = createMessageHTML({
          type: "received",
          text: "Woof woof!",
          time: replyTime,
        });
        chatBody.insertBefore(
          document.createRange().createContextualFragment(receivedMessageHTML),
          typingIndicatorElement
        );
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 2000);
    }, 500);
  };

  const setupEventListeners = () => {
    conversationItems.forEach((item) => {
      item.addEventListener("click", () => {
        conversationItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");

        loadConversation(item.dataset.dog);

        if (window.innerWidth < 768) {
          conversationPane.classList.remove("d-flex");
          conversationPane.classList.add("d-none");
          chatWindow.classList.remove("d-none");
          chatWindow.classList.add("d-flex");
        }
      });
    });

    if (backButton) {
      backButton.addEventListener("click", () => {
        if (window.innerWidth < 768) {
          chatWindow.classList.remove("d-flex");
          chatWindow.classList.add("d-none");
          conversationPane.classList.remove("d-none");
          conversationPane.classList.add("d-flex");
          conversationItems.forEach((i) => i.classList.remove("active"));
        }
      });
    }

    if (messageForm) {
      messageForm.addEventListener("submit", handleSendMessage);
    }
  };

  setupEventListeners();

  if (window.innerWidth >= 768 && conversationItems.length > 0) {
    conversationItems[0].click();
  }
});
