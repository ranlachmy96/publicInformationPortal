import React from 'react';
import { render, screen, cleanup  } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArticleCard from '../ArticleComponents/ArticleCard';

afterEach(() => {
    cleanup();
});

test('should render ArticleCard component', () => {
  render(<ArticleCard title={'Title'} link={'http://www.example.com'} website={'nyt'} />);
  const titleElement = screen.getByText('Title - Title');
  const sourceElement = screen.getByText('Source - nyt');
  const linkElement = screen.getByText('Link');
  expect(titleElement).toBeInTheDocument();
  expect(sourceElement).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();
});