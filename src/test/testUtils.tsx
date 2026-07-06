import { render, type RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { makeStore } from '../store'
import type { ReactElement } from 'react'

type RenderWithProvidersOptions = RenderOptions & {
  route?: string
}

export function renderWithProviders(
  ui: ReactElement,
  { route = '/', ...options }: RenderWithProvidersOptions = {},
) {
  const store = makeStore()

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
    options,
  )
}

export function TestRoutes({ children }: { children: ReactElement }) {
  return (
    <Routes>
      <Route path="/" element={children} />
      <Route path="/favorites" element={<p>Favorites route</p>} />
      <Route path="/book/:id" element={<p>Book details route</p>} />
    </Routes>
  )
}
