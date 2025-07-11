import React from 'react';
import { createRoot } from 'react-dom/client';
import { ABTestProviderLayer } from './components/ABTestProviderLayer';
import { BasicExample } from './components/BasicExample';

const App = () => {
    return (
        <ABTestProviderLayer>
            <main>
                <h1>Experiment result</h1>
                <BasicExample />
            </main>
        </ABTestProviderLayer>
    );
};

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(<App />);
});
