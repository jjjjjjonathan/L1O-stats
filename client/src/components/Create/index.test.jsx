import { render, screen, cleanup, fireEvent, getByText } from '@testing-library/react'
import Create from '.'
import { fixtures } from '../../helpers/data'

afterEach(cleanup)

test('it renders without crashing', async () => {
  render(<Create divisions={fixtures.divisions} teams={fixtures.teams} />)
  const mensButton = await screen.findByText(`Men's Division`)
  expect(mensButton).toBeVisible()
})

test('it shows mens teams after clicking on mens division', async () => {
  render(<Create divisions={fixtures.divisions} teams={fixtures.teams} />)
  const mensButton = await screen.findByText(`Men's Division`)
  fireEvent.click(mensButton)
})