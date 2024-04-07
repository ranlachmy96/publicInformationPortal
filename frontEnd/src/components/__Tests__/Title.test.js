import React from 'react';
import { render, screen, cleanup  } from '@testing-library/react';
import '@testing-library/jest-dom';
import Title from '../Title';

afterEach(() => {
    cleanup();
});

test('should render Title component', () => {
  render(<Title text={'Title'} />);
  const titleElement = screen.getByText('Title');
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveTextContent('Title');
});
