import { BookCard } from './BookCard'
import type { Book } from '../types'

type BookGridProps = {
  books: Book[]
  emptyMessage: string
}

export function BookGrid({ books, emptyMessage }: BookGridProps) {
  if (!books.length) {
    return <p className="empty-state">{emptyMessage}</p>
  }

  return (
    <section className="book-grid" aria-label="Book list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </section>
  )
}
