'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const cubic = (value) => Math.pow(value, 3);
const easeInOutCubic = (value) => value < 0.5
    ? cubic(value * 2) / 2
    : 1 - cubic((1 - value) * 2) / 2;

exports.cubic = cubic;
exports.easeInOutCubic = easeInOutCubic;
