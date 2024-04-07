import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../Pages/HomePage';

afterEach(() => {
    cleanup();
});

test('should render HomePage component', () => {
    render(<HomePage />);
    const homePageElement = screen.getByTestId('homePage');
    expect(homePageElement).toBeInTheDocument();
});
