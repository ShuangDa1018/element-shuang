import { getCurrentInstance } from 'vue';
export { isVNode } from 'vue';
import { extend, hyphenate, toRawType, isArray, isObject, isString } from '@vue/shared';
export { camelize, capitalize, extend, hasOwn, isArray, isObject, isString, looseEqual } from '@vue/shared';
import isServer from './isServer';
import { warn } from './error';

const SCOPE = 'Util';
function toObject(arr) {
    const res = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
}
const getValueByPath = (obj, paths = '') => {
    let ret = obj;
    paths.split('.').map(path => {
        ret = ret === null || ret === void 0 ? void 0 : ret[path];
    });
    return ret;
};
function getPropByPath(obj, path, strict) {
    let tempObj = obj;
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');
    const keyArr = path.split('.');
    let i = 0;
    for (i; i < keyArr.length - 1; i++) {
        if (!tempObj && !strict)
            break;
        const key = keyArr[i];
        if (key in tempObj) {
            tempObj = tempObj[key];
        }
        else {
            if (strict) {
                throw new Error('please transfer a valid prop path to form item!');
            }
            break;
        }
    }
    return {
        o: tempObj,
        k: keyArr[i],
        v: tempObj === null || tempObj === void 0 ? void 0 : tempObj[keyArr[i]],
    };
}
const generateId = () => Math.floor(Math.random() * 10000);
const escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
const coerceTruthyValueToArray = arr => {
    if (!arr && arr !== 0) {
        return [];
    }
    return Array.isArray(arr) ? arr : [arr];
};
const isIE = function () {
    return !isServer && !isNaN(Number(document.documentMode));
};
const isEdge = function () {
    return !isServer && navigator.userAgent.indexOf('Edge') > -1;
};
const isFirefox = function () {
    return !isServer && !!window.navigator.userAgent.match(/firefox/i);
};
const autoprefixer = function (style) {
    const rules = ['transform', 'transition', 'animation'];
    const prefixes = ['ms-', 'webkit-'];
    rules.forEach(rule => {
        const value = style[rule];
        if (rule && value) {
            prefixes.forEach(prefix => {
                style[prefix + rule] = value;
            });
        }
    });
    return style;
};
const kebabCase = hyphenate;
const isBool = (val) => typeof val === 'boolean';
const isNumber = (val) => typeof val === 'number';
const isHTMLElement = (val) => toRawType(val).startsWith('HTML');
function rafThrottle(fn) {
    let locked = false;
    return function (...args) {
        if (locked)
            return;
        locked = true;
        window.requestAnimationFrame(() => {
            fn.apply(this, args);
            locked = false;
        });
    };
}
const clearTimer = (timer) => {
    clearTimeout(timer.value);
    timer.value = null;
};
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function entries(obj) {
    return Object
        .keys(obj)
        .map((key) => ([key, obj[key]]));
}
function isUndefined(val) {
    return val === void 0;
}
function useGlobalConfig() {
    const vm = getCurrentInstance();
    if ('$ELEMENT' in vm.proxy) {
        return vm.proxy.$ELEMENT;
    }
    return {};
}
const arrayFindIndex = function (arr, pred) {
    return arr.findIndex(pred);
};
const arrayFind = function (arr, pred) {
    return arr.find(pred);
};
function isEmpty(val) {
    if (!val && val !== 0 ||
        isArray(val) && !val.length ||
        isObject(val) && !Object.keys(val).length)
        return true;
    return false;
}
function arrayFlat(arr) {
    return arr.reduce((acm, item) => {
        const val = Array.isArray(item) ? arrayFlat(item) : item;
        return acm.concat(val);
    }, []);
}
function deduplicate(arr) {
    return Array.from(new Set(arr));
}
function $(ref) {
    return ref.value;
}
function addUnit(value) {
    if (isString(value)) {
        return value;
    }
    else if (isNumber(value)) {
        return value + 'px';
    }
    if (process.env.NODE_ENV === 'development') {
        warn(SCOPE, 'binding value must be a string or number');
    }
    return '';
}

export { $, SCOPE, addUnit, arrayFind, arrayFindIndex, arrayFlat, autoprefixer, clearTimer, coerceTruthyValueToArray, deduplicate, entries, escapeRegexpString, generateId, getPropByPath, getRandomInt, getValueByPath, isBool, isEdge, isEmpty, isFirefox, isHTMLElement, isIE, isNumber, isUndefined, kebabCase, rafThrottle, toObject, useGlobalConfig };
