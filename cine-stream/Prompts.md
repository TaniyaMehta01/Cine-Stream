Project Title: CINE-STREAM – Media Explorer

Project Overview

Develop a modern, fully responsive movie discovery web application named CINE-STREAM – Media Explorer using React JS. The application should allow users to explore popular movies, search for movies, view detailed movie information, manage favorite movies, and discover movies based on their mood.

The application should have a professional user interface, smooth navigation, attractive movie cards, and a modern streaming-platform-inspired design.

Technology Stack

- Frontend: React JS
- Build Tool: Vite
- Programming Language: JavaScript
- Styling: HTML5, CSS3
- API Integration: TMDB API
- Routing: React Router DOM
- State Management: React Hooks
- Data Storage: Browser LocalStorage
- Development Environment: Visual Studio Code
- Package Manager: NPM

Main Features and Modules

1. Home Page

- Create an attractive homepage.
- Display popular and trending movies.
- Show movie posters, titles, release years, and ratings.
- Add a modern navigation bar.
- Add featured movie sections.

2. Movie Search

- Implement a movie search functionality.
- Allow users to search movies by title.
- Use a 500ms debounce mechanism.
- Display relevant search results.
- Show a suitable message when no movies are found.

3. Movie Details

- Display detailed movie information.
- Include movie title, poster, overview, rating, release date, and genres.
- Provide a movie details page.
- Add navigation back to the homepage.

4. Favorites System

- Allow users to add movies to favorites.
- Allow users to remove movies from favorites.
- Store favorite movies in LocalStorage.
- Create a separate Favorites page.
- Maintain favorites after refreshing the browser.

5. Infinite Scrolling

- Implement infinite scrolling using IntersectionObserver.
- Load additional movies automatically when users scroll down.
- Display a loading indicator while fetching movies.

6. AI Mood Matcher

- Create an AI Mood Matcher feature.
- Allow users to select their current mood.
- Suggest movies based on selected moods such as:
  - Happy
  - Sad
  - Romantic
  - Excited
  - Relaxed
  - Adventurous
- Display recommended movies according to the selected mood.
- Keep AI integration optional and use a secure backend endpoint if an external AI service is connected.

7. Responsive Design

- Make the website responsive on desktop, laptop, tablet, and mobile devices.
- Use modern CSS layouts.
- Add smooth hover effects and transitions.
- Maintain a consistent color scheme and typography.

8. Performance Optimization

- Implement lazy loading for movie posters.
- Optimize API requests.
- Use reusable React components.
- Implement proper loading and error states.
- Avoid unnecessary component rendering.

Project Structure

Create a well-organized project structure:

- src/
  - components/
  - pages/
  - api/
  - utils/
  - App.jsx
  - main.jsx
  - styles.css
- public/
- package.json
- index.html
- vite.config.js
- .env.example
- README.md
- Prompts.md

API Integration

Use TMDB API to fetch:

- Popular movies
- Trending movies
- Movie search results
- Movie details
- Movie posters

Store the API key in an environment variable named:

VITE_TMDB_API_KEY

Do not expose private AI service keys in frontend code. Use a backend for confidential AI credentials.

UI/UX Requirements

- Create a professional streaming-style interface.
- Use a dark theme.
- Add a visually attractive hero section.
- Use movie poster cards with rounded corners.
- Add responsive navigation.
- Include loading animations and error messages.
- Ensure the website is easy to navigate.

Documentation Requirements

Create complete project documentation including:

1. Project Introduction
2. Project Objectives
3. Problem Statement
4. Technology Used
5. System Requirements
6. Features and Modules
7. Project Folder Structure
8. API Integration
9. Database/LocalStorage Description
10. Installation and Setup Instructions
11. Execution Steps
12. Future Scope
13. Conclusion

Also create a Prompts.md file documenting the AI prompts used during development.

Installation and Execution

The project must run using these commands:

npm install

npm run dev

For production build:

npm run build

Final Deliverables

- Complete React JS source code.
- All required project files.
- Fully functional movie discovery application.
- TMDB API integration.
- Responsive user interface.
- Favorites functionality.
- Search with debounce.
- Infinite scrolling.
- AI Mood Matcher.
- README.md documentation.
- Prompts.md documentation.
- Setup and execution instructions.

Important Instructions

- Provide complete working source code.
- Do not leave incomplete components or placeholder pages.
- Ensure all imports and file paths are correct.
- Fix all compilation and runtime errors.
- Make sure the application runs successfully in VS Code.
- Keep the code clean, modular, and beginner-friendly.
- Explain the installation and execution process step by step.