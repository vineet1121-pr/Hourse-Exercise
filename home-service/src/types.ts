export type SearchFields = {
  title: string
  author: string
  keyword: string
}

export type Book = {
  id: string
  title: string
  authors: string[]
  description: string
  thumbnail?: string
  publishedDate?: string
  publisher?: string
  pageCount?: number
  categories: string[]
  previewLink?: string
  infoLink?: string
}

export type GoogleBookVolume = {
  id: string
  volumeInfo?: {
    title?: string
    authors?: string[]
    description?: string
    imageLinks?: {
      smallThumbnail?: string
      thumbnail?: string
    }
    publishedDate?: string
    publisher?: string
    pageCount?: number
    categories?: string[]
    previewLink?: string
    infoLink?: string
  }
}
