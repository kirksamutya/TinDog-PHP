document.addEventListener("DOMContentLoaded", () => {
  const chatContainerWrapper = document.querySelector(
    ".chat-container-wrapper"
  );
  if (!chatContainerWrapper) return;

  const convListBody = document.querySelector(".conv-list-body");
  const chatHeaderName = document.getElementById("chat-header-name");
  const chatHeaderAvatar = document.getElementById("chat-header-avatar");
  const messageForm = document.getElementById("message-form");
  const messageInput = document.getElementById("message-input");
  const chatBody = document.querySelector(".chat-body");
  const backButton = document.querySelector(".back-button");
  const searchInput = document.getElementById("conversation-search");
  const reportButton = document.querySelector(
    "[data-bs-target='#reportUserModal']"
  );

  let currentConversationKey = null;
  let currentMatchUserId = null;
  const loggedInUserId = DataService.getLoggedInUserId();

  const getConversationKey = (userId1, userId2) => {
    return [userId1, userId2].sort().join("_");
  };

  const createMessageHTML = (message) => {
    const messageType = message.sender === loggedInUserId ? "sent" : "received";
    return `<div class="message ${messageType}">
              <p>${message.text}</p>
              <span class="message-time">${message.time}</span>
            </div>`;
  };

  const loadConversation = (matchUserId) => {
    const allUsers = DataService.getAllUsers();
    const matchUser = allUsers[matchUserId];
    if (!matchUser) return;

    currentMatchUserId = matchUserId;
    currentConversationKey = getConversationKey(loggedInUserId, matchUserId);

    chatHeaderName.textContent = matchUser.dogName;
    chatHeaderAvatar.src = matchUser.dogAvatar;

    if (reportButton) {
      reportButton.setAttribute("data-reported-user-id", matchUserId);
      reportButton.setAttribute("data-reported-user-name", matchUser.dogName);
    }

    const allConversations =
      JSON.parse(localStorage.getItem("tindogConversations")) || {};
    const conversation = allConversations[currentConversationKey] || {
      messages: [],
    };

    chatBody.innerHTML = conversation.messages.map(createMessageHTML).join("");
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const messageText = messageInput.value.trim();
    if (messageText === "" || !currentConversationKey) return;

    const allConversations =
      JSON.parse(localStorage.getItem("tindogConversations")) || {};
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
    localStorage.setItem(
      "tindogConversations",
      JSON.stringify(allConversations)
    );

    chatBody.innerHTML += createMessageHTML(newMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
    messageInput.value = "";
  };

  const loadConversationList = () => {
    const allUsers = DataService.getAllUsers();
    const allLikes = DataService.getAllLikes();
    const myLikes = allLikes[loggedInUserId] || [];
    let listHtml = "";

    myLikes.forEach((likedUserId) => {
      const theirLikes = allLikes[likedUserId] || [];
      if (theirLikes.includes(loggedInUserId)) {
        const matchUser = allUsers[likedUserId];
        if (matchUser) {
          listHtml += `
            <li class="conversation-item" data-user-id="${likedUserId}">
              <div class="avatar-wrapper">
                <img src="${matchUser.dogAvatar}" alt="${matchUser.dogName}" class="avatar" />
                <span class="status-indicator online"></span>
              </div>
              <div class="conv-details">
                <div class="conv-name">${matchUser.dogName}</div>
                <div class="conv-preview">Click to view messages.</div>
              </div>
            </li>`;
        }
      }
    });

    convListBody.innerHTML = listHtml;
    addEventListenersToConvItems();
  };

  const addEventListenersToConvItems = () => {
    const conversationItems = document.querySelectorAll(".conversation-item");
    conversationItems.forEach((item) => {
      item.addEventListener("click", () => {
        conversationItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        loadConversation(item.dataset.userId);
        if (window.innerWidth < 768) {
          chatContainerWrapper.classList.add("chat-active");
        }
      });
    });
  };

  if (messageForm) {
    messageForm.addEventListener("submit", handleSendMessage);
  }

  if (backButton) {
    backButton.addEventListener("click", () => {
      chatContainerWrapper.classList.remove("chat-active");
      document
        .querySelectorAll(".conversation-item")
        .forEach((i) => i.classList.remove("active"));
    });
  }

  loadConversationList();
});
