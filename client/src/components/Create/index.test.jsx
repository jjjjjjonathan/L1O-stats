import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Create from '.';
import { fixtures } from '../../helpers/data';

afterEach(cleanup);

test('it renders without crashing', async () => {
  render(<Create divisions={fixtures.divisions} teams={fixtures.teams} />);
  const mensButton = await screen.findByText(`Men's Division`);
  expect(mensButton).toBeVisible();
});

test(`it shows form after clicking on men's division`, async () => {
  render(<Create divisions={fixtures.divisions} teams={fixtures.teams} />);
  const mensButton = await screen.getByRole('button', {
    name: `Men's Division`
  });
  fireEvent.click(mensButton);
  const e2eId = await screen.getByPlaceholderText('Select E2EID');
  expect(e2eId).toBeVisible();
});

test(`it shows form after clicking on women's division`, async () => {
  render(<Create divisions={fixtures.divisions} teams={fixtures.teams} />);
  const womensButton = await screen.getByRole('button', {
    name: `Women's Division`
  });
  fireEvent.click(womensButton);
  const e2eId = await screen.getByPlaceholderText('Select E2EID');
  expect(e2eId).toBeVisible();
});
