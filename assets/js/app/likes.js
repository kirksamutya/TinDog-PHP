document.addEventListener("DOMContentLoaded", function () {
  const contentArea = document.getElementById("likes-content-area");
  if (!contentArea) return;

  const token = sessionStorage.getItem("userToken");

  const initLikes = async () => {
    if (!token) return;

    // Simulate API call or check for real data
    // For now, we strictly follow "No Fake Data" and show the empty state
    renderEmptyState();
  };

  const renderEmptyState = () => {
    contentArea.innerHTML = `
      <div class="likes-empty-state text-center mx-auto" style="max-width: 600px;">
        <div class="heart-icon-wrapper">
            <i class="bi bi-heart-fill text-danger display-4"></i>
        </div>
        <h2 class="fw-bold mb-3">See Who Likes You</h2>
        <p class="text-muted lead mb-4">
            Upgrade to TinDog Premium to see people who have already liked you. 
            Match instantly and start chatting!
        </p>
        
        <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
            <a href="../public/pricing.html" class="btn btn-tindog-primary btn-lg rounded-pill px-5 shadow-sm">
                <i class="bi bi-gem me-2"></i> Upgrade to Premium
            </a>
            <a href="./find.html" class="btn btn-outline-secondary btn-lg rounded-pill px-5">
                Keep Swiping
            </a>
        </div>

        <div class="mt-5 pt-4 border-top">
            <p class="small text-muted text-uppercase fw-bold mb-3">Premium Benefits</p>
            <div class="row justify-content-center g-3">
                <div class="col-auto">
                    <span class="badge bg-light text-dark border p-2 rounded-pill">
                        <i class="bi bi-eye-fill me-1 text-primary"></i> See who likes you
                    </span>
                </div>
                <div class="col-auto">
                    <span class="badge bg-light text-dark border p-2 rounded-pill">
                        <i class="bi bi-infinity me-1 text-success"></i> Unlimited Likes
                    </span>
                </div>
                <div class="col-auto">
                    <span class="badge bg-light text-dark border p-2 rounded-pill">
                        <i class="bi bi-arrow-counterclockwise me-1 text-warning"></i> Rewinds
                    </span>
                </div>
            </div>
        </div>
      </div>
    `;
  };

  initLikes();
});
