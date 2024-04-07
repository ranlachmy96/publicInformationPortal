import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArticlePage from '../Pages/ArticlesPage';

afterEach(() => {
    cleanup();
});

test('should render ArticlePage component', () => {
    render(<ArticlePage />);
    const articlePageElement = screen.getByTestId('articlePage');
    expect(articlePageElement).toBeInTheDocument();
});
