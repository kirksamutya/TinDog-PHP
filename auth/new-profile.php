<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TinDog - Create Your Profile</title>
    <link
      rel="icon"
      type="image/png"
      href="/assets/images/favicon-transparent.png"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
    />
    <link rel="stylesheet" href="/assets/css/main.css" />
  </head>
  <body class="gradient-background">
    <div class="container py-5">
      <div class="text-center mb-4">
        <h2 class="fw-bold" style="color: white">Let's Create Your Profile</h2>
        <p style="color: rgba(255, 255, 255, 0.8)">
          Just a few steps to get you and your pup ready to meet others!
        </p>
      </div>
      <div class="wizard-card">
        <div class="progress">
          <div class="progress-bar"></div>
        </div>
        <form id="create-profile-form" novalidate>
          <div class="wizard-form-step">
            <div class="text-center mb-4">
              <h4>Step 1: About You</h4>
            </div>
            <div class="wizard-form-content">
              <div class="mb-3">
                <label for="ownerFirstName" class="form-label"
                  >First Name</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="ownerFirstName"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="ownerLastName" class="form-label">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="ownerLastName"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="location" class="form-label">Location (City)</label>
                <input
                  type="text"
                  class="form-control"
                  id="location"
                  required
                />
              </div>
            </div>
            <div class="d-flex justify-content-end mt-4">
              <button type="button" class="btn btn-tindog-primary btn-next">
                Next <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
          <div class="wizard-form-step">
            <div class="text-center mb-4">
              <h4>Step 2: Your Dog's Details</h4>
            </div>
            <div class="wizard-form-content">
              <div class="mb-3">
                <label for="dogName" class="form-label">Dog's Name</label>
                <input type="text" class="form-control" id="dogName" required />
              </div>
              <div class="mb-3">
                <label for="dogBreed" class="form-label">Breed</label>
                <input
                  type="text"
                  class="form-control"
                  id="dogBreed"
                  required
                />
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="dogAge" class="form-label">Age</label>
                  <input
                    type="number"
                    class="form-control"
                    id="dogAge"
                    min="0"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="dogSex" class="form-label">Sex</label>
                  <select class="form-select" id="dogSex" required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label for="dogSize" class="form-label">Size</label>
                <select class="form-select" id="dogSize" required>
                  <option value="small">Small (0-10kg)</option>
                  <option value="medium">Medium (11-25kg)</option>
                  <option value="large">Large (26kg+)</option>
                </select>
              </div>
            </div>
            <div class="d-flex justify-content-between mt-4">
              <button type="button" class="btn btn-secondary btn-back">
                <i class="bi bi-arrow-left"></i> Back
              </button>
              <button type="button" class="btn btn-tindog-primary btn-next">
                Next <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
          <div class="wizard-form-step">
            <div class="text-center mb-4">
              <h4>Step 3: Your Dog's Bio</h4>
            </div>
            <div class="wizard-form-content">
              <label for="dogBio" class="form-label"
                >Tell us about your dog!</label
              >
              <textarea
                class="form-control"
                id="dogBio"
                rows="6"
                placeholder="Loves fetch, long walks on the beach..."
              ></textarea>
            </div>
            <div class="d-flex justify-content-between mt-4">
              <button type="button" class="btn btn-secondary btn-back">
                <i class="bi bi-arrow-left"></i> Back
              </button>
              <button type="button" class="btn btn-tindog-primary btn-next">
                Next <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
          <div class="wizard-form-step">
            <div class="text-center mb-4">
              <h4>Step 4: Upload a Photo</h4>
            </div>
            <div
              class="wizard-form-content d-flex flex-column align-items-center justify-content-center"
            >
              <label for="dog-photo-upload" class="photo-upload-container">
                <img
                  src="https://placedog.net/500/500?id=1"
                  alt="Dog photo preview"
                  class="photo-upload-preview"
                  id="dog-photo-preview"
                />
                <div class="photo-upload-prompt">
                  <i class="bi bi-camera-fill"></i>
                </div>
              </label>
              <input
                type="file"
                id="dog-photo-upload"
                class="d-none"
                accept="image/*"
                data-preview-target="dog-photo-preview"
              />
              <p class="text-muted mt-2">
                Click the image to upload a photo of your dog.
              </p>
            </div>
            <div class="d-flex justify-content-between mt-4">
              <button type="button" class="btn btn-secondary btn-back">
                <i class="bi bi-arrow-left"></i> Back
              </button>
              <button type="button" class="btn btn-tindog-primary btn-next">
                Next <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
          <div class="wizard-form-step">
            <div
              class="text-center wizard-form-content justify-content-center d-flex flex-column"
            >
              <i class="bi bi-check2-circle fs-1 text-success"></i>
              <h4 class="mt-3">You're All Set!</h4>
              <p class="text-muted">
                Click finish to start finding matches for your pup.
              </p>
            </div>
            <div class="d-flex justify-content-between mt-4">
              <button type="button" class="btn btn-secondary btn-back">
                <i class="bi bi-arrow-left"></i> Back
              </button>
              <button type="submit" class="btn btn-success btn-finish">
                <i class="bi bi-check-lg"></i> Finish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/assets/js/lib/database.js"></script>
    <script src="/assets/js/user-service.js"></script>
    <script src="/assets/js/auth/wizard.js"></script>
    <script src="/assets/js/utils/photo-preview.js"></script>
  </body>
</html>