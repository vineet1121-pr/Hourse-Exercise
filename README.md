# Book Explorer

Book Explorer is a React + TypeScript app for searching Google Books, opening book detail pages, and managing a global favorites list.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

Open the local Vite URL printed in the terminal.

## Environment Variables

Environment variables are loaded by Vite from `.env` files in the `home-service` folder. Start by copying `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then add your optional Google Books API key:

```bash
VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

The app can call the public Google Books API without a key, but Google may return `429` when anonymous traffic from the same IP is rate limited. Restart the dev server after changing `.env`.

## Test

```bash
npm test
```

## Build

```bash
npm run build
```

## Implementation Notes

- `src/api/googleBooks.ts` contains the Google Books Axios calls and response normalization.
- `src/store/index.ts` contains the Redux Toolkit favorites slice, store setup, typed hooks, and the `useFavorites` helper.
- `src/components` contains reusable UI pieces and `src/pages` contains route-level views.
- Routing uses React Router with `/`, `/book/:id`, and `/favorites`.
- The book details route is loaded with `React.lazy` and `Suspense` to keep the initial search page bundle smaller.
- The search form is controlled React state and validates that at least one of title, author, or genre/keyword is filled before calling the Google Books API.
- Google Books API calls include query construction, optional API key support, rate-limit messaging, and response normalization.
- Favorites use Redux Toolkit and React Redux so search results, details, and favorites all share the same add/remove behavior through one global store.
- The UI uses semantic landmarks, accessible labels, focus states, `aria-pressed` favorite buttons, and responsive CSS grids.
- Tests cover form validation/submission, navigation between routes, book-card routing, and adding/removing favorites.
