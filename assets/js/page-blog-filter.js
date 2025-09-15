document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("blog-search-input");
  const categoryButtons = document.querySelectorAll(".category-button");
  const blogPosts = document.querySelectorAll(".post-card-container");
  if (!searchInput) return;

  const filterBlogPosts = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const activeButton = document.querySelector(".category-button.active");
    const activeCategory = activeButton.dataset.category.toLowerCase();

    blogPosts.forEach((postContainer) => {
      const postCard = postContainer.querySelector(".post-card");
      const title = postCard
        .querySelector(".card-title")
        .textContent.toLowerCase();
      const category = postCard
        .querySelector(".category-tag")
        .textContent.toLowerCase();

      const matchesSearch = title.includes(searchTerm);
      const matchesCategory =
        activeCategory === "all" || category.includes(activeCategory);

      if (matchesSearch && matchesCategory) {
        postContainer.style.display = "block";
      } else {
        postContainer.style.display = "none";
      }
    });
  };

  searchInput.addEventListener("input", filterBlogPosts);

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      filterBlogPosts();
    });
  });
});
