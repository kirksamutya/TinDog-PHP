# TinDog: Tinder for Dogs

## 📖 About The Project

Lack of socialization is a known cause of behavioral issues in dogs, such as anxiety and aggression. This is a common problem for owners in urban areas and for dogs acquired during the pandemic. TinDog provides a fun, polished, and easy way for owners to find suitable playmates for their pets in a controlled environment.

This project is a feature-rich, front-end application built with modern UI/UX principles. It includes a complete user authentication flow, a dynamic and interactive dashboard, a fully functional swipe-based matching system, and a comprehensive, branded admin panel for site management.

**Live Demo:** [https://itsanthonysaavedra.github.io/TinDog-PHP/](https://itsanthonysaavedra.github.io/TinDog-PHP/)

### ✨ Key Features

- **Polished User Experience:** A consistent, vibrant, and responsive design language across all user-facing pages, including a dynamic dashboard, profiles, messaging, and a swipe-based matching interface.
- **Comprehensive Admin Panel:** A secure, visually consistent admin dashboard for site management. Features include user management (view, create, edit), detailed user record pages, and a foundation for future analytics and reporting modules.
- **Dynamic UI Elements:** The application is enhanced with JavaScript for a dynamic experience, including time-based greetings, a "Tip of the Day," interactive filters, and responsive mobile navigation.
- **Component-Based Architecture:** The front-end is built with a modular approach, using a JavaScript component loader to dynamically build pages from reusable HTML parts (headers, sidebars), ensuring the code is clean, D.R.Y., and maintainable.
- **Secure Authentication Flows:** Separate, secure login portals for both standard users and administrators, complete with password reset pages and a secure internal process for creating new admin accounts.

### 🛠️ Built With

This project was built using the following technologies:

- [Bootstrap](https://getbootstrap.com/)
- [HTML5](https://en.wikipedia.org/wiki/HTML5)
- [CSS3](https://en.wikipedia.org/wiki/CSS)
- [JavaScript](https://www.javascript.com/)

### 🏗️ Project Structure

This project follows a structured and scalable file organization to ensure clarity and maintainability.

- **`/` (Root)**: Contains the main `index.html` landing page.
- **`/admin`**: Contains all HTML pages for the administrator dashboard.
- **`/app`**: Contains all HTML pages for the core, logged-in user application.
- **`/auth`**: Contains all HTML pages related to the authentication flow (login, registration, password reset, etc.).
- **`/public`**: Contains all public-facing static pages, such as "About Us," "Contact," "Blog," and "Pricing."
- **`/components`**: Contains reusable HTML partials (like headers, footers, and sidebars) that are dynamically loaded into pages.
- **`/assets`**: Contains all static assets, which are further organized:
  - **`/css`**: Modular stylesheets. `main.css` acts as the entry point, importing the others.
  - **`/images`**: All image files used throughout the project.
  - **`/js`**: The JavaScript source code is organized by its role:
    - **`/lib`**: Core, application-wide services for data, database simulation, etc.
    - **`/utils`**: Reusable, generic utility functions that are not specific to any one part of the app (e.g., `component-loader.js`, `form-validator.js`).
    - **`/pages`**: Scripts that are specific to individual public-facing pages (e.g., `blog-filter.js`).
    - **`/admin`**, **`/app`**, **`/auth`**: Scripts that contain logic specific to their corresponding sections of the application.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Safari).
- A local development server (like VS Code's Live Server) is recommended for the best experience.

### Installation

1.  Clone the repo
    ```sh
    git clone [https://github.com/itsAnthonySaavedra/TinDog-PHP.git](https://github.com/itsAnthonySaavedra/TinDog-PHP.git)
    ```
2.  Open `index.html` in your browser or with your local server.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/NewFeature`)
3.  Commit your Changes (`git commit -m 'Add some NewFeature'`)
4.  Push to the Branch (`git push origin feature/NewFeature`)
5.  Open a Pull Request

## 📧 Contact

Roel Anthony Saavedra - [@roelsaavedral](https://www.instagram.com/roelsaavedral) - AnthonySaavedra@protonmail.com
Philippe Louis Mendoza - philmendz153@gmail.com
Frances Rian Tingga - karmofrances40@gmail.com
Kirk John Samutya - kirkjohnsamutya@gmail.com

Project Link: [https://github.com/itsAnthonySaavedra/TinDog-PHP](https://github.com/itsAnthonySaavedra/TinDog-PHP)
