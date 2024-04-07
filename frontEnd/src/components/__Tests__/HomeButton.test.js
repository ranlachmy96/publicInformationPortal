import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeButton from '../HomeComponents/HomeButton'

afterEach(() => {
    cleanup();
});

test('should render HomeButton component', () => {
    render(<HomeButton text={'Home'} page={'home'} />);
    const buttonElement = screen.getByText('Home');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Home');
});
