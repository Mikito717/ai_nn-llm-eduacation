import { render, screen } from '@testing-library/react';
import HelloWorld from '../HelloWorld';

test('renders hello world', () => {
  render(<HelloWorld />);
  const helloWorldElement = screen.getByText(/hello world/i);
  expect(helloWorldElement).toBeInTheDocument();
});