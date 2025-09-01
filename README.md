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

  - Search repositories by username, Repository Name, Organization name
  - View details: name, description, stars, forks, language

- **Advanced Filtering**

  - Filter repos by language, stars, forks, and last updated
  - Sorting by stars, forks, and update date

- **Performance & UX Enhancements**

  - **Catch User Data & User Repositories** in local storage to reduce unnecessary API calls (valid for 1 hour)
  - **AbortController** to cancel API requests when components unmount
  - **Memoization** to prevent unnecessary renders `UserDataCard, RepoCard,...`
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
 ├── Components/       # Reusable UI components
 ├── hooks/            # Custom hooks (useUserData, useRepoData, useDebounce)
 ├── Layouts/          # shared Layout (MainLayout)
 ├── Pages/            # Main pages (Home, Repositories)
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
   VITE_BASE_API="https://api.github.com
   VITE_GITHUB_TOKEN=your_personal_access_token
   ```

   Get an Access token from [Github Access Token](https://github.com/settings/tokens)

4. Run the project:

   ```bash
   npm run dev
   ```

---

## 🔌 APIs & External Services

### **GitHub REST API v3**

This application is built around the **GitHub REST API v3**, providing comprehensive access to GitHub's public data.

#### **Core API Endpoints**

##### **Current User Information API**

```http
GET /user
```

- **Purpose**: Fetch the current GitHub user profiles (login, avatar, bio, followers, etc.)
- **Usage**: Used in `getUser()` function to display user information if the user doesn't want to search for another user
- **Data**: Returns user data, including public repos count, location, company, etc.
- **Notes**: Current user is based on the token that you generated from the [Github Access Token](https://github.com/settings/tokens), after getting the token you must store it in .env `VITE_GITHUB_API_TOKEN`

##### **User Information API**

```http
GET /users/{username}
```

- **Purpose**: Fetch GitHub user profiles (login, avatar, bio, followers, etc.)
- **Usage**: Used in `getUser()` function to display user information cards
- **Data**: Returns user data including public repos count, location, company, etc.

##### **User Repositories API**

```http
GET /users/{username}/repos
```

- **Purpose**: Fetch repositories belonging to a specific user
- **Usage**: Used in `getRepos()` function to display user's repository list
- **Features**: Supports pagination (`page`, `per_page` parameters)
- **Notes**: This API endpoint is a property of the user data object (`userData.repos_url`)

##### **Repository Search API**

```http
GET /search/repositories
```

- **Purpose**: Advanced repository search with multiple filter criteria
- **Usage**: Used in `getRepositories()` function for the repositories page
- **Query Parameters**:
  - `q`: Search query with GitHub search syntax by `username, repositires name, organization`
  - `sort`: Sort by stars, forks, updated, etc.
  - `order`: Ascending/descending order
  - `page` & `per_page`: Pagination

#### **API Configuration & Headers**

```typescript
// GitHub API v3 headers
headers: {
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json",
  "X-GitHub-Api-Version": "2022-11-28",
  Authorization: `Bearer ${token}` // Optional GitHub token
}
```

### **Browser APIs**

#### **Local Storage API**

```typescript
// Cache management functions
localStorage.setItem(key, JSON.stringify(data));
localStorage.getItem(key);
localStorage.removeItem(key);
```

**Purpose**:

- Cache user data and repositories for 1 hour
- Reduce API calls and improve performance
- Store search results temporarily

#### **URL Search Params API**

```typescript
// URL parameter management
new URLSearchParams(window.location.search);
searchParams.get("page");
searchParams.set("search", value);
```

**Purpose**:

- Manage application state in URL
- Enable bookmarkable searches
- Handle pagination and filters

### **API Usage Patterns**

#### **Home Page (Users)**

1. `getUser(username)` → Fetch user profile
2. `getRepos(repos_url)` → Fetch user's repositories
3. Cache both results in localStorage

#### **Repositories Page**

1. `getRepositories(searchKey)` → Advanced repository search
2. Apply filters: language, stars, forks, date
3. Support pagination and sorting

#### **Search Functionality**

1. Debounced search input (1 second delay)
2. Real-time URL updates
3. Multiple search modes: users, repos, organizations

### **Performance Optimizations**

1. **Request Cancellation**: AbortController prevents memory leaks
2. **Local Caching**: 1-hour cache reduces API calls
3. **Debounced Search**: Prevents excessive API requests
4. **Type Safety**: Full TypeScript interfaces for API responses
5. **Error Boundaries**: Graceful error handling for API failures

---

## 👨‍💻 Author

**Ahmad Jihad**

- Front-End Developer
- GitHub: [AhmadJA00](https://github.com/AhmadJA00)
- LinkedIn: [Ahmed Jihad](https://www.linkedin.com/in/ahmed-jihad-14055023a/)
- Email: [ahmadjihad742@gmail.com](mailto:ahmadjihad742@gmail.com)

---
