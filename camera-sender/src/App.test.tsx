import React from 'react';
import { render, screen } from '@testing-library/react';
import Camera from './Camera';

test('renders learn react link', () => {
  render(<Camera />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
