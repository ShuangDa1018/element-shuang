import isServer from './isServer';
import { camelize, isObject } from './util';

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
    if (isServer)
        return;
    if (!element || !styleName)
        return null;
    styleName = camelize(styleName);
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
    if (isObject(styleName)) {
        Object.keys(styleName).forEach(prop => {
            setStyle(element, prop, styleName[prop]);
        });
    }
    else {
        styleName = camelize(styleName);
        element.style[styleName] = value;
    }
}
function removeStyle(element, style) {
    if (!element || !style)
        return;
    if (isObject(style)) {
        Object.keys(style).forEach(prop => {
            setStyle(element, prop, '');
        });
    }
    else {
        setStyle(element, style, '');
    }
}
const isScroll = (el, isVertical) => {
    if (isServer)
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
    if (isServer)
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
    if (isServer || !el || !container)
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

export { addClass, getOffsetTop, getOffsetTopDistance, getScrollContainer, getStyle, hasClass, isInContainer, isScroll, off, on, once, removeClass, removeStyle, setStyle, stop };
