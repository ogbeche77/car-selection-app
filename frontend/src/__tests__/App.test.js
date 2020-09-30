import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import App from '../App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('should render App fields', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('vehicle-model')).toBeInTheDocument();
    expect(getByTestId('vehicle-body')).toBeInTheDocument();
    expect(getByTestId('vehicle-fuel')).toBeInTheDocument();
    expect(getByTestId('vehicle-capacity')).toBeInTheDocument();
    expect(getByTestId('vehicle-engine')).toBeInTheDocument();
});