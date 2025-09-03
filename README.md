
# 🎬 Movie Catalog Frontend

>A modern web app for browsing, searching, and managing movies, built with **Next.js 15**, **React Query**, **Tailwind CSS**, and **FontAwesome**. Connects to the Movie Recommender API backend.

---

## 📌 Features

- Movie listing, search, filters, and pagination
- Create, update, and delete movies (CRUD)
- Modal forms and confirmation dialogs
- Responsive UI with Tailwind CSS
- FontAwesome icons (React)
- Debounced search and filter logic
- API integration via React Query

---

## 🛠️ Tech Stack

- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- React Query (@tanstack/react-query)
- FontAwesome React

---

## 📁 Project Structure

```
src/
├── app/                # Next.js app router, pages, layout
│   ├── movies/         # Movies page and logic
│   ├── globals.css     # Global styles (Tailwind, custom vars)
│   └── layout.tsx      # App layout
├── components/         # UI components (MovieCatalog, MovieHeader, etc)
│   └── ui/             # Shared UI (Button, Sonner, etc)
├── features/           # Custom hooks (useMovies)
├── services/           # API service layer
├── lib/                # Utilities
public/                 # Static assets
```

---

## 🔌 API Endpoints (Backend)

| Method | Endpoint                       | Description                                  |
|--------|---------------------------------|----------------------------------------------|
| GET    | `/api/movies`                   | List all movies                              |
| GET    | `/api/movies/{id}`              | Get movie details                            |
| GET    | `/api/movies/search?query=...`  | Search movies by title or genre              |
| POST   | `/api/movies`                   | Add a new movie                              |
| PUT    | `/api/movies/{id}`              | Update a movie                               |
| DELETE | `/api/movies/{id}`              | Delete a movie                               |

---

## 🚀 Running Locally

1. Install dependencies:
	```bash
	pnpm install
	# or npm install
	```
2. Start the development server:
	```bash
	pnpm dev
	# or npm run dev
	```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

Unit and integration tests can be added in the `__tests__/` folder. (Not included by default)

---

## 📦 Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author
**Jonathan Reyna**  
Software Engineer | Architecture Specialist  
[Portfolio Website](https://jhonlpjr.github.io/) | [GitHub](https://github.com/jhonlpjr) | [LinkedIn](https://www.linkedin.com/in/jonathan-reyna-rossel-889195168/)
