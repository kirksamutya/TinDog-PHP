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

  setDynamicGreeting();
});
