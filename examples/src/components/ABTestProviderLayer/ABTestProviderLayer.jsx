import React from 'react';
import { ABTestProvider } from 'react-ab-test';

const experiments = {
    EXAMPLE: [
        {
            name: 'EXAMPLE_A',
            percent: 50,
        },
        {
            name: 'EXAMPLE_B',
            percent: 50,
        },
    ],
};

export const ABTestProviderLayer = ({ children }) => {
    return (
        <ABTestProvider value={experiments}>
            {children}
        </ABTestProvider>
    );
};
