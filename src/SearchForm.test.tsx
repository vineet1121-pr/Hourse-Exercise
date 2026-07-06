import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SearchForm } from './components/SearchForm'
import { renderWithProviders } from './test/testUtils'

describe('SearchForm', () => {
  it('requires at least one field before submitting', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()

    renderWithProviders(<SearchForm onSearch={onSearch} />)
    await user.click(screen.getByRole('button', { name: /search books/i }))

    expect(
      screen.getByText(/enter a title, author, or keyword/i),
    ).toBeInTheDocument()
    expect(onSearch).not.toHaveBeenCalled()
  })

  it('submits controlled field values', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()

    renderWithProviders(<SearchForm onSearch={onSearch} />)
    await user.type(screen.getByLabelText(/title/i), 'React')
    await user.type(screen.getByLabelText(/author/i), 'Smith')
    await user.click(screen.getByRole('button', { name: /search books/i }))

    expect(onSearch).toHaveBeenCalledWith({
      title: 'React',
      author: 'Smith',
      keyword: '',
    })
  })
})
