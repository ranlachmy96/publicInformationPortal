import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Video from '../HomeComponents/Video';

afterEach(() => {
    cleanup();
});

test('should render Video component', () => {
    render(<Video />);
    const videoElement = screen.getByTestId('video');
    expect(videoElement).toBeInTheDocument();
});
