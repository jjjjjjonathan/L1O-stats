import { render } from '@testing-library/react';
import App from './App';

describe('testing my test', () => {
  it('renders without crashing', () => {
    render(<App />);
    const fn = jest.fn();
    expect(fn).toHaveBeenCalledTimes(0);
  });
});
