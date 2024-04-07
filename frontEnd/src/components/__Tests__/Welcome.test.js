import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Welcome from '../HomeComponents/Welcome';

afterEach(() => {
    cleanup();
});

test('should render Welcome component', () => {
    render(<Welcome />);
    const welcomeElement = screen.getByTestId('welcome');
    expect(welcomeElement).toBeInTheDocument();
});
