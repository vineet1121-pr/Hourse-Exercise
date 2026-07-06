import { NavLink, Outlet } from 'react-router-dom'
import { useFavorites } from '../store'

export function AppLayout() {
  const { favoriteCount } = useFavorites()

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/">
          Book Explorer
        </a>
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink to="/">Search</NavLink>
          <NavLink to="/favorites">Favorites ({favoriteCount})</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
