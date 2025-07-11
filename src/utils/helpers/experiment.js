// helpers
import { getCookie, setCookie } from './cookies';
import { EXPERIMENT_COOKIE_NAME } from '../constants/experimentCookieName';

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isValidTotalPercent(variations, totalPercent) {
    const totalDistribution = variations.reduce((acc, curr) => acc + curr.percent, 0);

    return totalDistribution === totalPercent;
}

function isValidVariationsNames(experiment, variations) {
    return variations.every(({ name }) => name.includes(experiment));
}

function validate(experiment, variations, totalDistributionPercent) {
    if (!isValidTotalPercent(variations, totalDistributionPercent)) {
        throw new Error(`Total variations percent is not valid for ${experiment}, must be ${totalDistributionPercent}`);
    }

    if (!isValidVariationsNames(experiment, variations)) {
        throw new Error(`Not valid variations names for ${experiment}. Variations names must include experiment name`);
    }
}

function getPlayedExperiments() {
    const playedExperiments = getCookie(EXPERIMENT_COOKIE_NAME) || '';

    return playedExperiments.split(' ');
}

function isExperimentPlayed(experiment) {
    const cookieValue = getCookie(EXPERIMENT_COOKIE_NAME) || '';

    return cookieValue.indexOf(experiment) >= 0;
}

function getExperimentDistribution(experiment, variations) {
    const totalDistributionPercent = 100;

    validate(experiment, variations, totalDistributionPercent);

    const randomValue = getRandomInteger(0, totalDistributionPercent);
    let interval = 0;

    const winnerVariation = variations.find((variation) => {
        interval += variation.percent;
        return randomValue < interval;
    });

    return winnerVariation ? winnerVariation.name : '';
}

function updateABTestCookie(variation) {
    const daysInYear = 365;
    const hoursInDay = 24;
    const expiresTerm = daysInYear * hoursInDay;
    const currentCookieValue = getCookie(EXPERIMENT_COOKIE_NAME) || '';
    const updatedCookieValue = `${currentCookieValue} ${variation}`;
    setCookie(EXPERIMENT_COOKIE_NAME, updatedCookieValue.trim(), expiresTerm);

    return updatedCookieValue;
}

export function playExperiments(experimentsData) {
    const experimentsToPlay = Object.keys(experimentsData);
    const currentResult = [];
    experimentsToPlay.forEach((experiment) => {
        if (isExperimentPlayed(experiment)) {
            return;
        }

        const experimentDistribution = getExperimentDistribution(experiment, experimentsData[experiment]);
        updateABTestCookie(experimentDistribution);
        currentResult.push(experimentDistribution);
    });

    return { currentResult, playedResult: getPlayedExperiments() };
}
