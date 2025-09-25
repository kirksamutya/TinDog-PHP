function createUser(userData) {
  const allUsers = JSON.parse(localStorage.getItem("tindogUsers")) || {};

  const baseId = (userData.firstName + "_" + userData.lastName)
    .toLowerCase()
    .replace(/\s/g, "_");

  let newUserId = baseId;
  let counter = 1;
  while (allUsers[newUserId]) {
    newUserId = `${baseId}_${counter}`;
    counter++;
  }

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
