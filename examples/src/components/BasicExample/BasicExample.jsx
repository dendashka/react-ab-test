import React from 'react';
import { Experiment, Variant } from 'react-ab-test';

export const BasicExample = () => {
    return (
        <div>
            <Experiment name="EXAMPLE">
                <Variant name="EXAMPLE_A">
                    <p>variant A</p>
                </Variant>
                <Variant name="EXAMPLE_B">
                    <p>variant B</p>
                </Variant>
            </Experiment>
        </div>
    );
};
