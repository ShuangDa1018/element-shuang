'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ResizeObserver = require('resize-observer-polyfill');
var isServer = require('./isServer');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ResizeObserver__default = /*#__PURE__*/_interopDefaultLegacy(ResizeObserver);
var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);

const resizeHandler = function (entries) {
    for (const entry of entries) {
        const listeners = entry.target.__resizeListeners__ || [];
        if (listeners.length) {
            listeners.forEach(fn => {
                fn();
            });
        }
    }
};
const addResizeListener = function (element, fn) {
    if (isServer__default['default'] || !element)
        return;
    if (!element.__resizeListeners__) {
        element.__resizeListeners__ = [];
        element.__ro__ = new ResizeObserver__default['default'](resizeHandler);
        element.__ro__.observe(element);
    }
    element.__resizeListeners__.push(fn);
};
const removeResizeListener = function (element, fn) {
    if (!element || !element.__resizeListeners__)
        return;
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
        element.__ro__.disconnect();
    }
};

exports.addResizeListener = addResizeListener;
exports.removeResizeListener = removeResizeListener;
