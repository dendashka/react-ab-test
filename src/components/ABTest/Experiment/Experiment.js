// libraries
import { useContext } from 'react';
// contexts
import { ABTestContext } from '../../../contexts/ABTestContext';

export const Experiment = ({ children, name, fallback }) => {
    const playedExperiments = useContext(ABTestContext);

    if (name && fallback && !playedExperiments.some((variant) => variant.indexOf(name) >= 0)) {
        return fallback;
    }

    return children;
};
