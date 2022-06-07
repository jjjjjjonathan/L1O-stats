import Navbar from './Navbar';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

const defaultAlert = { type: null, msg: '' };

const successAlert = {
  type: 'success',
  msg: 'You just created a new fixture!'
};

const errorAlert = {
  type: 'error',
  msg: 'Something went wrong!'
};
test('it renders without crashing', () => {
  render(
    <BrowserRouter>
      <Navbar alert={defaultAlert} />
    </BrowserRouter>
  );
  const createFixtureLink = screen.getByTestId('dark-mode-check');
  expect(createFixtureLink).toBeVisible();
});

test('it shows alert if there is a success message', () => {
  render(
    <BrowserRouter>
      <Navbar alert={successAlert} />
    </BrowserRouter>
  );
  const successText = screen.getByText(successAlert.msg);
  expect(successText).toBeVisible();
});

test('it shows alert if there is an error message', () => {
  render(
    <BrowserRouter>
      <Navbar alert={errorAlert} />
    </BrowserRouter>
  );
  const errorText = screen.getByText(errorAlert.msg);
  expect(errorText).toBeVisible();
});
