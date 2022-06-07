import { render, screen } from '@testing-library/react';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fixtures } from './helpers/data';

const divisionsResponse = rest.get('/api/divisions', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(fixtures.divisions));
});

const teamsResponse = rest.get('/api/teams', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(fixtures.teams));
});

const fixturesResponse = rest.get('/api/fixtures', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(fixtures.fixtures));
});

const handlers = [divisionsResponse, teamsResponse, fixturesResponse];

const server = new setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('it should show Loading if state is not set', async () => {
  render(<App />);
  const teamName = await screen.findByText('Loading');
  expect(teamName).toBeVisible();
});

test('it should show Mens Division if state is set', async () => {
  render(<App />);
  const teamName = await screen.findByText("Men's Division");
  expect(teamName).toBeVisible();
});
