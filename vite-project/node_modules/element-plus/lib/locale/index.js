'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var defaultLang = require('./lang/en');
var dayjs = require('dayjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var defaultLang__default = /*#__PURE__*/_interopDefaultLegacy(defaultLang);
var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);

let lang = defaultLang__default['default'];
let i18nHandler = null;
const i18n = (fn) => {
    i18nHandler = fn;
};
function template(str, option) {
    if (!str || !option)
        return str;
    return str.replace(/\{(\w+)\}/g, (match, key) => {
        return option[key];
    });
}
const t = (...args) => {
    if (i18nHandler)
        return i18nHandler(...args);
    const [path, option] = args;
    let value;
    const array = path.split('.');
    let current = lang;
    for (let i = 0, j = array.length; i < j; i++) {
        const property = array[i];
        value = current[property];
        if (i === j - 1)
            return template(value, option);
        if (!value)
            return '';
        current = value;
    }
    return '';
};
const use = (l) => {
    lang = l || lang;
    if (lang.name) {
        dayjs__default['default'].locale(lang.name);
    }
};
var index = { use, t, i18n };

exports.default = index;
exports.i18n = i18n;
exports.t = t;
exports.use = use;
