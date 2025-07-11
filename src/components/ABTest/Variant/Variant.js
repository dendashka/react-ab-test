// libraries
import { useContext } from 'react';
// contexts
import { ABTestContext } from '../../../contexts/ABTestContext';

export const Variant = ({ name, children }) => {
    const playedExperiments = useContext(ABTestContext);

    if (!playedExperiments.some((variant) => variant === name)) {
        return null;
    }

    return children;
};
