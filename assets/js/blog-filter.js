document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("blog-search");
  const categoryButtons = document.querySelectorAll(".category-button");
  const blogPosts = document.querySelectorAll(".post-card");

  function filterPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector(".category-button.active");
    const categoryName = activeCategory
      ? activeCategory.dataset.category.toLowerCase()
      : "";

    blogPosts.forEach((post) => {
      const title = post.querySelector(".card-title").textContent.toLowerCase();
      const content = post
        .querySelector(".card-text")
        .textContent.toLowerCase();
      const postCategory = post
        .querySelector(".category-tag")
        .textContent.toLowerCase();

      const matchesSearch =
        title.includes(searchTerm) || content.includes(searchTerm);
      const matchesCategory =
        categoryName === "" || postCategory.includes(categoryName);

      if (matchesSearch && matchesCategory) {
        post.parentElement.style.display = "block";
      } else {
        post.parentElement.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", filterPosts);

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      filterPosts();
    });
  });

  filterPosts();
});
