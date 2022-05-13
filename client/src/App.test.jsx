import { render, cleanup, waitForElement, waitFor } from '@testing-library/react';
import { ReactDOM } from 'react';
import { act } from 'react-dom/test-utils';
import App from './App';

afterEach(cleanup)

describe('testing my test', () => {
  it('renders without crashing', async () => {
    const { getByText } = render(<App />)
    await waitFor(() => {
      expect(getByText('Alliance United FC')).toBeInTheDocument()
    })
  });
});
