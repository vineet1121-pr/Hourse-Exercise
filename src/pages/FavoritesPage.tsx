import { BookGrid } from '../components/BookGrid'
import { useFavorites } from '../store'

export function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <section className="page-section" aria-labelledby="favorites-heading">
      <div className="page-heading compact">
        <p className="eyebrow">Saved list</p>
        <h1 id="favorites-heading">Favorite books</h1>
      </div>
      <BookGrid
        books={favorites}
        emptyMessage="You have not added any favorite books yet."
      />
    </section>
  )
}
