import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { FavoritesPage } from './pages/FavoritesPage'
import { SearchPage } from './pages/SearchPage'
import { makeStore } from './store'

describe('routing', () => {
  it('navigates between search and favorites pages', async () => {
    const user = userEvent.setup()
    const store = makeStore()

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<SearchPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    )

    expect(
      screen.getByRole('heading', { name: /find your next read/i }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /favorites/i }))
    expect(
      screen.getByRole('heading', { name: /favorite books/i }),
    ).toBeInTheDocument()
  })
})
