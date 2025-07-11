// libraries
import React, { createContext, useEffect, useState } from 'react';
// helpers
import { playExperiments } from '../utils/helpers/experiment';

export const ABTestContext = createContext([]);

export const ABTestProvider = ({ children, value = {}, onUpdate }) => {
    const [playedExperiments, setPlayedExperiments] = useState([]);

    useEffect(() => {
        if (!value) {
            return;
        }

        const { currentResult, playedResult } = playExperiments(value);
        setPlayedExperiments(playedResult);

        if (onUpdate) {
            onUpdate(currentResult, playedResult);
        }
    }, [value]);

    return <ABTestContext.Provider value={playedExperiments}>{children}</ABTestContext.Provider>;
};
