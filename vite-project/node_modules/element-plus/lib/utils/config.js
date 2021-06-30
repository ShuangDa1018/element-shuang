'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

let $ELEMENT = {};
const setConfig = (option) => {
    $ELEMENT = option;
};
const getConfig = (key) => {
    return $ELEMENT[key];
};

exports.getConfig = getConfig;
exports.setConfig = setConfig;
