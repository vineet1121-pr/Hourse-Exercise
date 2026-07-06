import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { BookCard } from './components/BookCard'
import { FavoritesPage } from './pages/FavoritesPage'
import { renderWithProviders, TestRoutes } from './test/testUtils'

const book = {
  id: 'abc123',
  title: 'Testing React',
  authors: ['Ada Lovelace'],
  description: 'A practical testing guide.',
  categories: ['Computers'],
}

describe('favorites', () => {
  it('adds and removes favorites through global state', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <>
        <BookCard book={book} />
        <FavoritesPage />
      </>,
    )

    expect(
      screen.getByText(/you have not added any favorite books yet/i),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /add favorite/i }))
    expect(screen.getAllByText('Testing React')).toHaveLength(2)

    await user.click(screen.getAllByRole('button', { name: /remove favorite/i })[0])
    expect(
      screen.getByText(/you have not added any favorite books yet/i),
    ).toBeInTheDocument()
  })

  it('links book cards to the details route', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <TestRoutes>
        <BookCard book={book} />
      </TestRoutes>,
    )

    await user.click(screen.getByRole('link', { name: 'Testing React' }))
    expect(screen.getByText(/book details route/i)).toBeInTheDocument()
  })
})
