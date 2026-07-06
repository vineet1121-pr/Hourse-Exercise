import { useId, useState, type FormEvent } from 'react'
import type { SearchFields } from '../types'

type SearchFormProps = {
  onSearch: (fields: SearchFields) => void
  isLoading?: boolean
}

const emptyFields: SearchFields = {
  title: '',
  author: '',
  keyword: '',
}

export function SearchForm({ onSearch, isLoading = false }: SearchFormProps) {
  const [fields, setFields] = useState<SearchFields>(emptyFields)
  const [error, setError] = useState('')
  const titleId = useId()
  const authorId = useId()
  const keywordId = useId()
  const errorId = useId()

  function updateField(field: keyof SearchFields, value: string) {
    setFields((current) => ({ ...current, [field]: value }))
    if (error) {
      setError('')
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const hasQuery = Object.values(fields).some((value) => value.trim())
    if (!hasQuery) {
      setError('Enter a title, author, or keyword to search.')
      return
    }

    onSearch(fields)
  }

  return (
    <form
      className="search-form"
      onSubmit={handleSubmit}
      aria-describedby={error ? errorId : undefined}
      noValidate
    >
      <div className="field-grid">
        <label>
          <span>Title</span>
          <input
            id={titleId}
            name="title"
            value={fields.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="The Hobbit"
            autoComplete="off"
          />
        </label>
        <label>
          <span>Author</span>
          <input
            id={authorId}
            name="author"
            value={fields.author}
            onChange={(event) => updateField('author', event.target.value)}
            placeholder="Ursula K. Le Guin"
            autoComplete="off"
          />
        </label>
        <label>
          <span>Genre or keyword</span>
          <input
            id={keywordId}
            name="keyword"
            value={fields.keyword}
            onChange={(event) => updateField('keyword', event.target.value)}
            placeholder="history, design, fantasy"
            autoComplete="off"
          />
        </label>
      </div>
      {error ? (
        <p className="form-error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search books'}
      </button>
    </form>
  )
}
