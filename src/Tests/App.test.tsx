import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../Components/App';

test('renders learn react link', () => {
  render(<App />);
  const label = screen.getAllByLabelText("Gender Filter");
  expect(label).toBeInTheDocument();
});
