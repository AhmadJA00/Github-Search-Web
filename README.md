# GitHub Info Search

A React + TypeScript web application to search GitHub users and repositories using the **GitHub Public API**.

<!-- This project was built as part of the **Front-End Assignment – Department of Information Technology, Kurdistan Regional Government**. -->

🔗 **Live Demo**: [Deployed on Vercel](https://github-info-search.vercel.app)

---

## 🚀 Features

- **User Profile Search**

  - Search GitHub users by username
  - Display profile info (name, bio, followers, email, location, etc.)
  - Show the user’s repositories

- **Repositories Search**

  - Search repositories by username
  - View details: name, description, stars, forks, issues, language

- **Advanced Filtering**

  - Filter repos by language, stars, forks, and last updated
  - Sorting by stars, forks, and update date

- **Performance & UX Enhancements**

  - **Catch User Data** in local storage to reduce unnecessary API calls (valid for 1 hour)
  - **AbortController** to cancel API requests when components unmount
  - Loading states & error handling (user not found, API errors, etc.)
  - Fully **responsive design** with Tailwind CSS

---

## 🛠️ Tech Stack

- **React 19** with **TypeScript**
- **Tailwind CSS** (for styling, no external UI libraries used)
- **Axios** (for API requests)
- **Vite** (for project setup & build)
- **Custom Hooks**

  - `useUserData` – manage and fetch user info
  - `useRepoData` – manage and fetch repositories
  - `useDebounce` – debounce input handling

---

## 📂 Project Structure

```
src/
 ├── assets/           # Store static assets
 ├── components/       # Reusable UI components
 ├── hooks/            # Custom hooks (useUserData, useRepoData, useDebounce)
 ├── layouts/          # shared Layout (MainLayout)
 ├── pages/            # Main pages (Home, Repositories)
 ├── api.ts/           # API calls
 ├── App.tsx           # Root component
 ├── types.ts          # TypeScript types/interfaces
 ├── axios.ts          # Set up API Calls with axios
 ├── helpers.ts        # helper functions
 └── main.tsx          # Entry point
```

---

## ⚡ Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YourUsername/github-info-search.git
   cd github-info-search
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add your **GitHub Access Token** (recommended for higher API rate limits):

   ```
   VITE_GITHUB_TOKEN=your_personal_access_token
   ```

   Get an Access token from [Github Access Token](https://github.com/settings/tokens)

4. Run the project:

   ```bash
   npm run dev
   ```

---

## 📌 Notes

- Used **AbortController** to cancel API requests on component unmount.
- Debounce input search to avoid multiple requests while typing.
- The catched data will be valid for one hour.
- Fully responsive layout without relying on external UI libraries.

---

## 👨‍💻 Author

**Ahmad Jihad**

- Front-End Developer
- GitHub: [AhmadJA00](https://github.com/AhmadJA00)
- Email: [ahmadjihad742@gmail.com](mailto:ahmadjihad742@gmail.com)

---
