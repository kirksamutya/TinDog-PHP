document.addEventListener("DOMContentLoaded", () => {
  const setDynamicGreeting = () => {
    const greetingElement = document.getElementById("welcome-greeting");
    if (!greetingElement) return;

    const currentHour = new Date().getHours();
    let greetingText = "Welcome Back!";

    if (currentHour < 12) {
      greetingText = "Good Morning!";
    } else if (currentHour < 18) {
      greetingText = "Good Afternoon!";
    } else {
      greetingText = "Good Evening!";
    }

    greetingElement.textContent = greetingText;
  };

  const setDynamicDogTip = () => {
    const dogCareTips = [
      "Rotate your dog's toys weekly to keep them interesting.",
      "A tired dog is a happy dog. Ensure regular exercise.",
      "Check your dog's paws for cracks or debris after walks.",
      "Use puzzle feeders to provide mental stimulation during meals.",
      "Regularly practice basic commands to keep them sharp.",
      "Socialization is key! Safely introduce your dog to new friends.",
      "Keep fresh, clean water available at all times.",
      "Grooming is a great way to bond and check for any skin issues.",
      "Never underestimate the power of positive reinforcement in training.",
      "Ensure your dog has a comfortable, quiet place to rest.",
    ];

    const tipElement = document.getElementById("dog-tip-of-the-day");
    if (tipElement) {
      const today = new Date();
      const dayOfYear = Math.floor(
        (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
      );
      const tipIndex = dayOfYear % dogCareTips.length;
      tipElement.textContent = dogCareTips[tipIndex];
    }
  };

  const updateDashboardStats = () => {
    const stats = DataService.getDashboardStats();

    document.querySelector(".kpi-card.matches .kpi-value").textContent =
      stats.newMatches;
    document.querySelector(".kpi-card.messages .kpi-value").textContent =
      stats.unreadMessages;
    document.querySelector(
      ".kpi-card.messages .kpi-caption"
    ).textContent = `from ${stats.unreadConversations} conversations`;
    document.querySelector(".kpi-card.views .kpi-value").textContent =
      stats.profileViews;
  };

  setDynamicGreeting();
  setDynamicDogTip();
  updateDashboardStats();
});
