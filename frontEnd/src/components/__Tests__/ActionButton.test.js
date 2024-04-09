import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActionButton from '../ChatComponents/ActionButton';

afterEach(() => {
    cleanup();
});

test('should render HomePage component', () => {
    render(<ActionButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
});
