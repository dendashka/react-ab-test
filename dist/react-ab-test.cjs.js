var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  ABTestContext: () => ABTestContext,
  ABTestProvider: () => ABTestProvider,
  Experiment: () => Experiment,
  Variant: () => Variant
});
module.exports = __toCommonJS(index_exports);

// src/components/ABTest/Experiment/Experiment.js
var import_react2 = require("react");

// src/contexts/ABTestContext.jsx
var import_react = __toESM(require("react"));

// src/utils/helpers/cookies.js
var setCookie = (name, value, hours) => {
  const date = /* @__PURE__ */ new Date();
  const milliseconds = 1e3;
  const seconds = 60;
  const minutes = 60;
  date.setTime(date.getTime() + hours * seconds * minutes * milliseconds);
  const cookieValue = encodeURIComponent(value) + (hours === null ? "" : `;expires=${date.toUTCString()};path=/`);
  document.cookie = `${name}=${cookieValue}`;
};
var getCookie = (name) => {
  const results = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  if (results) {
    return decodeURIComponent(results[2]);
  }
  return null;
};

// src/utils/constants/experimentCookieName.js
var EXPERIMENT_COOKIE_NAME = "ga-ab-testing";

// src/utils/helpers/experiment.js
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
  const playedExperiments = getCookie(EXPERIMENT_COOKIE_NAME) || "";
  return playedExperiments.split(" ");
}
function isExperimentPlayed(experiment) {
  const cookieValue = getCookie(EXPERIMENT_COOKIE_NAME) || "";
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
  return winnerVariation ? winnerVariation.name : "";
}
function updateABTestCookie(variation) {
  const daysInYear = 365;
  const hoursInDay = 24;
  const expiresTerm = daysInYear * hoursInDay;
  const currentCookieValue = getCookie(EXPERIMENT_COOKIE_NAME) || "";
  const updatedCookieValue = `${currentCookieValue} ${variation}`;
  setCookie(EXPERIMENT_COOKIE_NAME, updatedCookieValue.trim(), expiresTerm);
  return updatedCookieValue;
}
function playExperiments(experimentsData) {
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

// src/contexts/ABTestContext.jsx
var ABTestContext = (0, import_react.createContext)([]);
var ABTestProvider = ({ children, value = {}, onUpdate }) => {
  const [playedExperiments, setPlayedExperiments] = (0, import_react.useState)([]);
  (0, import_react.useEffect)(() => {
    if (!value) {
      return;
    }
    const { currentResult, playedResult } = playExperiments(value);
    setPlayedExperiments(playedResult);
    if (onUpdate) {
      onUpdate(currentResult, playedResult);
    }
  }, [value]);
  return /* @__PURE__ */ import_react.default.createElement(ABTestContext.Provider, { value: playedExperiments }, children);
};

// src/components/ABTest/Experiment/Experiment.js
var Experiment = ({ children, name, fallback }) => {
  const playedExperiments = (0, import_react2.useContext)(ABTestContext);
  if (name && fallback && !playedExperiments.some((variant) => variant.indexOf(name) >= 0)) {
    return fallback;
  }
  return children;
};

// src/components/ABTest/Variant/Variant.js
var import_react3 = require("react");
var Variant = ({ name, children }) => {
  const playedExperiments = (0, import_react3.useContext)(ABTestContext);
  if (!playedExperiments.some((variant) => variant === name)) {
    return null;
  }
  return children;
};
