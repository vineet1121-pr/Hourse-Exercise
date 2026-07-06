import { useMemo } from 'react'
import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { Book } from '../types'

type FavoritesState = {
  books: Book[]
}

const initialState: FavoritesState = { books: [] }

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Book>) => {
      if (!state.books.some((book) => book.id === action.payload.id)) {
        state.books.push(action.payload)
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload)
    },
    toggleFavorite: (state, action: PayloadAction<Book>) => {
      const exists = state.books.some((book) => book.id === action.payload.id)
      state.books = exists
        ? state.books.filter((book) => book.id !== action.payload.id)
        : [...state.books, action.payload]
    },
  },
})

export const { addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions

export const makeStore = () =>
  configureStore({
    reducer: {
      favorites: favoritesSlice.reducer,
    },
  })

export const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useFavorites() {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.books)

  return useMemo(
    () => ({
      favorites,
      favoriteCount: favorites.length,
      isFavorite: (id: string) => favorites.some((book) => book.id === id),
      addFavorite: (book: Book) => dispatch(addFavorite(book)),
      removeFavorite: (id: string) => dispatch(removeFavorite(id)),
      toggleFavorite: (book: Book) => dispatch(toggleFavorite(book)),
    }),
    [dispatch, favorites],
  )
}
