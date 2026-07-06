import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { FavoritesPage } from './pages/FavoritesPage'
import { SearchPage } from './pages/SearchPage'
import { store } from './store'

const BookDetailsPage = lazy(() => import('./pages/BookDetailsPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: 'book/:id',
        element: (
          <Suspense fallback={<p className="status">Loading details view...</p>}>
            <BookDetailsPage />
          </Suspense>
        ),
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
    ],
  },
])

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
