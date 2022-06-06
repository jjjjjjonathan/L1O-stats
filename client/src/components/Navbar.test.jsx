import Navbar from './Navbar';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

test('it renders without crashing', async () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const createFixtureLink = await screen.getByTestId('dark-mode-check');
  expect(createFixtureLink).toBeVisible();
});
