import { render, screen } from '@testing-library/react'
import Create from '.'
import { fixtures } from '../../helpers/data'

test('it renders without crashing', () => {
  render(<Create divisions={fixtures.divisions} teams={fixtures.teams} />)
})