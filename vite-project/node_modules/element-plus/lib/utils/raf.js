'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isServer = require('./isServer');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);

exports.rAF = (fn) => setTimeout(fn, 16);
exports.cAF = (handle) => clearTimeout(handle);
if (!isServer__default['default']) {
    exports.rAF = (fn) => window.requestAnimationFrame(fn);
    exports.cAF = (handle) => window.cancelAnimationFrame(handle);
}
