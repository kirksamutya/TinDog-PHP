document.addEventListener("DOMContentLoaded", () => {
  const initProfileEdit = () => {
    const allUsers = JSON.parse(localStorage.getItem("tindogUsers"));
    if (!allUsers) return;

    const loggedInUserId = "saavedra_roel";
    const userData = allUsers[loggedInUserId];
    if (!userData) return;

    document.getElementById("dogName").value = userData.dogName;
    document.getElementById("dogBreed").value = userData.dogBreed;
    document.getElementById("dogAge").value = userData.age;
    document.getElementById("dogSex").value = userData.dogSex;
    document.getElementById("dogSize").value = userData.dogSize;
    document.getElementById("dogBio").value = userData.bio;

    document.getElementById("ownerFirstName").value = userData.firstName;
    document.getElementById("ownerLastName").value = userData.lastName;
    document.getElementById("ownerLocation").value = userData.location;
    document.getElementById("ownerBio").value = userData.ownerBio;
  };

  if (document.getElementById("edit-profile-form")) {
    document.addEventListener("componentsLoaded", initProfileEdit);
  }
});
