import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Message from '../ChatComponents/ChatWindowComponents/Message';

afterEach(() => {
    cleanup();
});

test('should render Title component', () => {
    render(<Message message={{ message: 'text' }} />);
    const messageElement = screen.getByTestId('Message');
    expect(messageElement).toBeInTheDocument();
});
