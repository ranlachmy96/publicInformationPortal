import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../OrganizationComponents/organizationButton';

afterEach(() => {
    cleanup();
});

test('should render HomePage component', () => {
    render(<Button text={"Text"} page={"Page"} />);
    const text = screen.getByText('Text');
    expect(text).toBeInTheDocument();    
});
