import { useState } from 'react'
import { searchBooks } from '../api/googleBooks'
import { BookGrid } from '../components/BookGrid'
import { SearchForm } from '../components/SearchForm'
import type { Book, SearchFields } from '../types'

export function SearchPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )
  const [error, setError] = useState('')

  async function handleSearch(fields: SearchFields) {
    setStatus('loading')
    setError('')

    try {
      const results = await searchBooks(fields)
      setBooks(results)
      setStatus('success')
    } catch (searchError) {
      setBooks([])
      setStatus('error')
      setError(
        searchError instanceof Error
          ? searchError.message
          : 'Something went wrong while searching.',
      )
    }
  }

  return (
    <section className="page-section" aria-labelledby="search-heading">
      <div className="page-heading">
        <p className="eyebrow">Google Books API</p>
        <h1 id="search-heading">Find your next read</h1>
        <p>
          Search by title, author, keyword, or any combination. Save books to
          favorites and open detailed pages without losing your place.
        </p>
      </div>
      <SearchForm onSearch={handleSearch} isLoading={status === 'loading'} />
      {status === 'loading' ? (
        <p className="status" role="status">
          Searching Google Books...
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <BookGrid
        books={books}
        emptyMessage={
          status === 'idle'
            ? 'Search results will appear here.'
            : 'No books matched that search.'
        }
      />
    </section>
  )
}
