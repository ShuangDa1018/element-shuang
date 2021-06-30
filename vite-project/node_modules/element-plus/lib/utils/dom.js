'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isServer = require('./isServer');
var util = require('./util');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);

const trim = function (s) {
    return (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
const on = function (element, event, handler, useCapture = false) {
    if (element && event && handler) {
        element.addEventListener(event, handler, useCapture);
    }
};
const off = function (element, event, handler, useCapture = false) {
    if (element && event && handler) {
        element.removeEventListener(event, handler, useCapture);
    }
};
const once = function (el, event, fn) {
    const listener = function (...args) {
        if (fn) {
            fn.apply(this, args);
        }
        off(el, event, listener);
    };
    on(el, event, listener);
};
function hasClass(el, cls) {
    if (!el || !cls)
        return false;
    if (cls.indexOf(' ') !== -1)
        throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    }
    else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}
function addClass(el, cls) {
    if (!el)
        return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');
    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName)
            continue;
        if (el.classList) {
            el.classList.add(clsName);
        }
        else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName;
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}
function removeClass(el, cls) {
    if (!el || !cls)
        return;
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';
    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName)
            continue;
        if (el.classList) {
            el.classList.remove(clsName);
        }
        else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}
const getStyle = function (element, styleName) {
    if (isServer__default['default'])
        return;
    if (!element || !styleName)
        return null;
    styleName = util.camelize(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        const style = element.style[styleName];
        if (style)
            return style;
        const computed = document.defaultView.getComputedStyle(element, '');
        return computed ? computed[styleName] : '';
    }
    catch (e) {
        return element.style[styleName];
    }
};
function setStyle(element, styleName, value) {
    if (!element || !styleName)
        return;
    if (util.isObject(styleName)) {
        Object.keys(styleName).forEach(prop => {
            setStyle(element, prop, styleName[prop]);
        });
    }
    else {
        styleName = util.camelize(styleName);
        element.style[styleName] = value;
    }
}
function removeStyle(element, style) {
    if (!element || !style)
        return;
    if (util.isObject(style)) {
        Object.keys(style).forEach(prop => {
            setStyle(element, prop, '');
        });
    }
    else {
        setStyle(element, style, '');
    }
}
const isScroll = (el, isVertical) => {
    if (isServer__default['default'])
        return;
    const determinedDirection = isVertical === null || isVertical === undefined;
    const overflow = determinedDirection
        ? getStyle(el, 'overflow')
        : isVertical
            ? getStyle(el, 'overflow-y')
            : getStyle(el, 'overflow-x');
    return overflow.match(/(scroll|auto)/);
};
const getScrollContainer = (el, isVertical) => {
    if (isServer__default['default'])
        return;
    let parent = el;
    while (parent) {
        if ([window, document, document.documentElement].includes(parent)) {
            return window;
        }
        if (isScroll(parent, isVertical)) {
            return parent;
        }
        parent = parent.parentNode;
    }
    return parent;
};
const isInContainer = (el, container) => {
    if (isServer__default['default'] || !el || !container)
        return false;
    const elRect = el.getBoundingClientRect();
    let containerRect;
    if ([window, document, document.documentElement, null, undefined].includes(container)) {
        containerRect = {
            top: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
            left: 0,
        };
    }
    else {
        containerRect = container.getBoundingClientRect();
    }
    return (elRect.top < containerRect.bottom &&
        elRect.bottom > containerRect.top &&
        elRect.right > containerRect.left &&
        elRect.left < containerRect.right);
};
const getOffsetTop = (el) => {
    let offset = 0;
    let parent = el;
    while (parent) {
        offset += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return offset;
};
const getOffsetTopDistance = (el, containerEl) => {
    return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl));
};
const stop = (e) => e.stopPropagation();

exports.addClass = addClass;
exports.getOffsetTop = getOffsetTop;
exports.getOffsetTopDistance = getOffsetTopDistance;
exports.getScrollContainer = getScrollContainer;
exports.getStyle = getStyle;
exports.hasClass = hasClass;
exports.isInContainer = isInContainer;
exports.isScroll = isScroll;
exports.off = off;
exports.on = on;
exports.once = once;
exports.removeClass = removeClass;
exports.removeStyle = removeStyle;
exports.setStyle = setStyle;
exports.stop = stop;
