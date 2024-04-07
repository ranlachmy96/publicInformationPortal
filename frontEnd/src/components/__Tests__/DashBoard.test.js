import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashBoard from '../DashBoard';

afterEach(() => {
    cleanup();
});

test('should render DashBoard component', () => {
    render(<DashBoard />);
    const dashBoardElement = screen.getByTestId('dashBoard');
    expect(dashBoardElement).toBeInTheDocument();
});