import List from './List';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { fixtures } from '../helpers/data';
// import ListItem from './ListItem';

afterEach(cleanup);

test('it should show message to create fixtures if none are created', async () => {
  render(
    <List divisions={fixtures.divisions} teams={fixtures.teams} fixtures={[]} />
  );
  const message = await screen.findByText(
    'No fixtures, click on "Create a fixture" in the navigation bar to add some'
  );
  expect(message).toBeVisible();
});

// test('it should show fixture component if you click on table row', async () => {
//   render(
//     <List
//       divisions={fixtures.divisions}
//       teams={fixtures.teams}
//       fixtures={fixtures.fixtures}
//     />
//   );
//   const tableRow = await screen.findByText('Guelph Union');
//   fireEvent.click(tableRow);
//   const title = await screen.findByText('Guelph Union vs. Alliance United FC');
//   expect(title).toBeVisible();
// });
