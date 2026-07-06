import { Link } from 'react-router-dom'
import { useFavorites } from '../store'
import type { Book } from '../types'

type BookCardProps = {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(book.id)
  const authors = book.authors.length ? book.authors.join(', ') : 'Unknown author'

  return (
    <article className="book-card">
      <Link className="cover-link" to={`/book/${book.id}`} aria-label={`View ${book.title}`}>
        {book.thumbnail ? (
          <img src={book.thumbnail} alt={`Cover of ${book.title}`} />
        ) : (
          <span className="cover-placeholder" aria-hidden="true">
            No cover
          </span>
        )}
      </Link>
      <div className="book-card-body">
        <h2>
          <Link to={`/book/${book.id}`}>{book.title}</Link>
        </h2>
        <p className="muted">{authors}</p>
        <p>{book.description || 'No description is available for this title.'}</p>
      </div>
      <button
        type="button"
        className={favorite ? 'secondary-button active' : 'secondary-button'}
        onClick={() => toggleFavorite(book)}
        aria-pressed={favorite}
      >
        {favorite ? 'Remove favorite' : 'Add favorite'}
      </button>
    </article>
  )
}
