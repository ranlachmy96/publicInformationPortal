import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoCards from '../OrganizationComponents/infoCards';

afterEach(() => {
    cleanup();
});

test('should render HomePage component', () => {
    render(<InfoCards title={"Title"} text={'Text'} phone={"Phone"} />);
    const title = screen.getByTestId('title');
    const text = screen.getByTestId('text');
    const phone = screen.getByTestId('phone');
});
