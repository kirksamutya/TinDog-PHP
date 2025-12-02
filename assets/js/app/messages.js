document.addEventListener("DOMContentLoaded", () => {
  const chatContainerWrapper = document.querySelector(".chat-container-wrapper");
  if (!chatContainerWrapper) return;

  const convListBody = document.querySelector(".conv-list-body");
  const convListEmpty = document.getElementById("conv-list-empty");

  const chatHeader = document.getElementById("chat-header");
  const chatHeaderName = document.getElementById("chat-header-name");
  const chatHeaderAvatar = document.getElementById("chat-header-avatar");

  const chatEmptyState = document.getElementById("chat-empty-state");
  const chatContent = document.querySelector(".chat-content");
  const messageForm = document.getElementById("message-form");
  const messageInput = document.getElementById("message-input");

  const backButton = document.querySelector(".back-button");
  const reportButton = document.querySelector("[data-bs-target='#reportUserModal']");

  let currentConversationKey = null;
  let currentMatchUserId = null;
  let matches = [];

  // Helper to get logged in user ID (from token or session)
  // Since we don't have a direct way to get ID from token in JS without decoding,
  // we'll rely on the matches API to give us the context or just use local storage for messages keyed by match ID.
  const getLoggedInUserId = () => {
    // This is a placeholder. In a real app, decode the JWT.
    // For now, we'll use a session storage value if available, or just 'me'
    return sessionStorage.getItem("userId") || "me";
  };

  const loggedInUserId = getLoggedInUserId();

  const getConversationKey = (matchId) => {
    return `chat_${matchId}`;
  };

  const createMessageHTML = (message) => {
    const messageType = message.sender === loggedInUserId ? "sent" : "received";
    return `<div class="message ${messageType}">
              <p>${message.text}</p>
              <span class="message-time">${message.time}</span>
            </div>`;
  };

  const loadConversation = (matchUserId) => {
    const match = matches.find(m => m.user.id == matchUserId);
    if (!match) return;

    currentMatchUserId = matchUserId;
    currentConversationKey = getConversationKey(matchUserId);

    // Update Header
    chatHeaderName.textContent = match.user.name;
    const avatarSrc = DataService.resolvePath(match.user.avatar) || DataService.resolvePath('assets/images/default-avatar.png');
    chatHeaderAvatar.src = avatarSrc;

    if (reportButton) {
      reportButton.setAttribute("data-reported-user-id", matchUserId);
      reportButton.setAttribute("data-reported-user-name", match.user.name);
    }

    // Show Chat UI, Hide Empty State
    chatEmptyState.style.display = "none";
    chatHeader.style.display = "flex";
    chatContent.style.display = "block";
    messageForm.style.display = "flex";

    // Load Messages from Local Storage (Simulation)
    const allConversations = JSON.parse(localStorage.getItem("tindogConversations")) || {};
    const conversation = allConversations[currentConversationKey] || { messages: [] };

    chatContent.innerHTML = conversation.messages.map(createMessageHTML).join("");
    chatContent.scrollTop = chatContent.scrollHeight;
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const messageText = messageInput.value.trim();
    if (messageText === "" || !currentConversationKey) return;

    const allConversations = JSON.parse(localStorage.getItem("tindogConversations")) || {};
    if (!allConversations[currentConversationKey]) {
      allConversations[currentConversationKey] = { messages: [] };
    }

    const newMessage = {
      sender: loggedInUserId,
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    allConversations[currentConversationKey].messages.push(newMessage);
    localStorage.setItem("tindogConversations", JSON.stringify(allConversations));

    chatContent.innerHTML += createMessageHTML(newMessage);
    chatContent.scrollTop = chatContent.scrollHeight;
    messageInput.value = "";
  };

  const loadMatches = async () => {
    const token = sessionStorage.getItem("userToken");
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/matches", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          matches = result.data;
          renderConversationList();
        }
      }
    } catch (error) {
      console.error("Matches Load Error:", error);
    }
  };

  const renderConversationList = () => {
    convListBody.innerHTML = "";

    if (matches.length === 0) {
      convListBody.style.display = "none";
      if (convListEmpty) convListEmpty.style.display = "block";
      return;
    }

    convListBody.style.display = "block";
    if (convListEmpty) convListEmpty.style.display = "none";

    matches.forEach((match) => {
      const li = document.createElement("li");
      li.classList.add("conversation-item");
      li.dataset.userId = match.user.id;

      const avatarSrc = DataService.resolvePath(match.user.avatar) || DataService.resolvePath('assets/images/default-avatar.png');

      li.innerHTML = `
        <div class="avatar-wrapper">
          <img src="${avatarSrc}" alt="${match.user.name}" class="avatar" />
          <span class="status-indicator online"></span>
        </div>
        <div class="conv-details">
          <div class="conv-name">${match.user.name}</div>
          <div class="conv-preview">Click to start chatting</div>
        </div>
      `;

      li.addEventListener("click", () => {
        document.querySelectorAll(".conversation-item").forEach(i => i.classList.remove("active"));
        li.classList.add("active");
        loadConversation(match.user.id);

        if (window.innerWidth < 768) {
          chatContainerWrapper.classList.add("chat-active");
        }
      });

      convListBody.appendChild(li);
    });

    // Check URL params to auto-select a user
    const urlParams = new URLSearchParams(window.location.search);
    const userIdParam = urlParams.get('user');
    if (userIdParam) {
      const item = document.querySelector(`.conversation-item[data-user-id="${userIdParam}"]`);
      if (item) item.click();
    }
  };

  if (messageForm) {
    messageForm.addEventListener("submit", handleSendMessage);
  }

  if (backButton) {
    backButton.addEventListener("click", () => {
      chatContainerWrapper.classList.remove("chat-active");
      document.querySelectorAll(".conversation-item").forEach(i => i.classList.remove("active"));

      // Reset to empty state on mobile back? Maybe not necessary, but good for UX
      // chatEmptyState.style.display = "flex";
      // chatHeader.style.display = "none";
      // chatContent.style.display = "none";
      // messageForm.style.display = "none";
    });
  }

  loadMatches();
});
