import axios from 'axios'
import type { Book, GoogleBookVolume, SearchFields } from '../types'

const API_BASE = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

function getGoogleBooksError(error: unknown, fallback: string) {
  if (axios.isAxiosError(error) && error.response?.status === 429) {
    return new Error(
      'Google Books is rate limiting requests right now. Please wait a moment and try again, or configure a Google Books API key.',
    )
  }

  return new Error(fallback)
}

export function buildSearchQuery(fields: SearchFields) {
  const parts = [
    fields.title.trim() ? `intitle:${fields.title.trim()}` : '',
    fields.author.trim() ? `inauthor:${fields.author.trim()}` : '',
    fields.keyword.trim(),
  ].filter(Boolean)

  return parts.join(' ')
}

export function normalizeBook(volume: GoogleBookVolume): Book {
  const info = volume.volumeInfo ?? {}

  return {
    id: volume.id,
    title: info.title ?? 'Untitled book',
    authors: info.authors ?? [],
    description: info.description ?? '',
    thumbnail: info.imageLinks?.thumbnail ?? info.imageLinks?.smallThumbnail,
    publishedDate: info.publishedDate,
    publisher: info.publisher,
    pageCount: info.pageCount,
    categories: info.categories ?? [],
    previewLink: info.previewLink,
    infoLink: info.infoLink,
  }
}

export async function searchBooks(fields: SearchFields): Promise<Book[]> {
  const query = buildSearchQuery(fields)
  try {
    const response = await axios.get<{ items?: GoogleBookVolume[] }>(
      API_BASE,
      {
        params: {
          q: query,
          maxResults: 24,
          printType: 'books',
          key: API_KEY,
        },
      },
    )

    return (response.data.items ?? []).map(normalizeBook)
  } catch (error) {
    throw getGoogleBooksError(
      error,
      'Unable to search books right now. Please try again.',
    )
  }
}

export async function getBookById(id: string): Promise<Book> {
  try {
    const response = await axios.get<GoogleBookVolume>(
      `${API_BASE}/${encodeURIComponent(id)}`,
      {
        params: {
          key: API_KEY,
        },
      },
    )

    return normalizeBook(response.data)
  } catch (error) {
    throw getGoogleBooksError(
      error,
      'Unable to load this book. Please try again.',
    )
  }
}
