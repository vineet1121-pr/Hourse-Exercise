import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getBookById } from '../api/googleBooks'
import { useFavorites } from '../store'
import type { Book } from '../types'

export default function BookDetailsPage() {
  const { id } = useParams()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [book, setBook] = useState<Book | null>(null)
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  )
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadBook() {
      if (!id) {
        setStatus('error')
        setError('Missing book id.')
        return
      }

      setStatus('loading')
      try {
        const result = await getBookById(id)
        if (isActive) {
          setBook(result)
          setStatus('success')
        }
      } catch (detailsError) {
        if (isActive) {
          setStatus('error')
          setError(
            detailsError instanceof Error
              ? detailsError.message
              : 'Something went wrong while loading the book.',
          )
        }
      }
    }

    void loadBook()

    return () => {
      isActive = false
    }
  }, [id])

  if (status === 'loading') {
    return (
      <section className="page-section">
        <p className="status" role="status">
          Loading book details...
        </p>
      </section>
    )
  }

  if (status === 'error' || !book) {
    return (
      <section className="page-section">
        <p className="form-error" role="alert">
          {error}
        </p>
        <Link to="/">Back to search</Link>
      </section>
    )
  }

  const favorite = isFavorite(book.id)

  return (
    <article className="details-page">
      <Link to="/" className="back-link">
        Back to search
      </Link>
      <div className="details-layout">
        <div className="details-cover">
          {book.thumbnail ? (
            <img src={book.thumbnail} alt={`Cover of ${book.title}`} />
          ) : (
            <span className="cover-placeholder">No cover</span>
          )}
        </div>
        <div className="details-content">
          <p className="eyebrow">{book.categories.join(', ') || 'Book details'}</p>
          <h1>{book.title}</h1>
          <p className="muted">
            {book.authors.length ? book.authors.join(', ') : 'Unknown author'}
          </p>
          <button
            type="button"
            className={favorite ? 'secondary-button active' : 'secondary-button'}
            onClick={() => toggleFavorite(book)}
            aria-pressed={favorite}
          >
            {favorite ? 'Remove favorite' : 'Add favorite'}
          </button>
          <dl className="meta-list">
            {book.publisher ? (
              <>
                <dt>Publisher</dt>
                <dd>{book.publisher}</dd>
              </>
            ) : null}
            {book.publishedDate ? (
              <>
                <dt>Published</dt>
                <dd>{book.publishedDate}</dd>
              </>
            ) : null}
            {book.pageCount ? (
              <>
                <dt>Pages</dt>
                <dd>{book.pageCount}</dd>
              </>
            ) : null}
          </dl>
          <p className="description">
            {book.description || 'No description is available for this title.'}
          </p>
          {book.previewLink ? (
            <a href={book.previewLink} target="_blank" rel="noreferrer">
              Open Google Books preview
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
