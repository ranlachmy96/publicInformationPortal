import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoOptionCard from '../HomeComponents/InfoOptionCard';

afterEach(() => {
    cleanup();
});

test('should render InfoOptionCard component', () => {
    render(<InfoOptionCard icon={0} title={'Title'} text={'Text'}/>);
    const titleElement = screen.getByText('Title');
    const textElement = screen.getByText('Text');
    expect(titleElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Title');
    expect(textElement).toHaveTextContent('Text');
});