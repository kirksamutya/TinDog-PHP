function createUser(userData) {
  const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};

  const newUserId = (userData.firstName + "_" + userData.lastName)
    .toLowerCase()
    .replace(/\s/g, "_");

  allUsers[newUserId] = {
    ...userData,
    plan: userData.plan || "chihuahua",
    status: "active",
    role: userData.role || "user",
    signUpDate: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    lastSeen: "Just now",
  };

  localStorage.setItem("tindogUsers", JSON.stringify(allUsers));

  return newUserId;
}
