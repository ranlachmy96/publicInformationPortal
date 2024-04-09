import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatWindow from '../ChatComponents/ChatWindow';

afterEach(() => {
    cleanup();
});

test('should render ArticlePage component', () => {
    render(<ChatWindow />);
    const articlePageElement = screen.getByTestId('chat-window');
    expect(articlePageElement).toBeInTheDocument();
});
