import { render, cleanup, waitForElement, waitFor, screen } from '@testing-library/react';
import { ReactDOM } from 'react';
import { act } from 'react-dom/test-utils';
import App from './App';
import useApplicationData from './hooks/useApplicationData'

afterEach(cleanup)

describe('testing my test', () => {
  it('renders without crashing', async () => {
    act(() => {
      render(<App />)
      // const { getByText } = render(<App />)
      // return waitFor(() => getByText('Alliance United FC'))
      //   .then(() => {
      //     expect(getByText("Alliance United FC")).toBeInTheDocument();
      //   })
    })
    await waitFor(() => {
      expect(screen.getByText("Alliance United FC")).toBeInTheDocument()
    })
  });
});
