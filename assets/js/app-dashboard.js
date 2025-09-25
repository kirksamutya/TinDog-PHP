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
      "Instead of just walking, engage your dog's mind with a 'sniffari,' allowing them to explore scents at their own pace. This is mentally tiring and very rewarding for them.",
      "Rotate your dog's toys weekly. A toy that has been hidden for a week can feel brand new and more exciting than one that is always available.",
      "For safe socialization, choose a calm, neutral environment. Keep initial meetings short and positive, and always watch for relaxed body language from both dogs.",
      "Check your dog's paws for cracks, cuts, or foreign objects after walks, especially on hot pavement or rough terrain. A little paw balm can help soothe dry pads.",
      "Use puzzle feeders or treat-dispensing toys for meals. This turns feeding time into a fun challenge that provides excellent mental stimulation.",
      "Reinforce basic commands like 'sit' and 'stay' in short, fun sessions. This not only keeps their training sharp but also strengthens your bond.",
      "Many human foods are toxic to dogs, including chocolate, grapes, onions, and xylitol (an artificial sweetener). Always check before sharing a snack.",
      "A dog's dental health is crucial. Regular brushing with dog-specific toothpaste can prevent painful dental disease down the line.",
      "Tailor exercise to your dog's breed and age. A 30-minute walk is great for a Basset Hound, but a Border Collie may need a vigorous game of fetch to be truly content.",
      "Notice your dog's drinking habits. A sudden increase in thirst can be a sign of underlying health issues and warrants a call to your vet.",
      "Create a designated 'safe space' for your dog with their bed and a favorite toy. This gives them a secure place to retreat to when they feel overwhelmed or tired.",
      "When leaving your dog alone, provide a special toy they only get when you're away. This can create a positive association with your departure and reduce separation anxiety.",
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
  updateDashboardStats();

  document.addEventListener("componentsLoaded", setDynamicDogTip, {
    once: true,
  });
});
