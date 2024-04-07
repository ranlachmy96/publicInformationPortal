import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SafetyInstructionPage from '../Pages/SafetyInstructionPage';

afterEach(() => {
    cleanup();
});

test('should render SafetyInstructionPage component', () => {
    render(<SafetyInstructionPage />);
    const safetyInstructionPageElement = screen.getByTestId('safetyInstructionPage');
    expect(safetyInstructionPageElement).toBeInTheDocument();
});
