const EVENT_CODE = {
    tab: 'Tab',
    enter: 'Enter',
    space: 'Space',
    left: 'ArrowLeft',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    esc: 'Escape',
    delete: 'Delete',
    backspace: 'Backspace',
};
const FOCUSABLE_ELEMENT_SELECTORS = `a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])`;
const isVisible = (element) => {
    if (process.env.NODE_ENV === 'test')
        return true;
    const computed = getComputedStyle(element);
    return computed.position === 'fixed' ? false : element.offsetParent !== null;
};
const obtainAllFocusableElements = (element) => {
    return Array.from(element.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)).filter(isFocusable)
        .filter(isVisible);
};
const isFocusable = (element) => {
    if (element.tabIndex > 0 ||
        (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
        return true;
    }
    if (element.disabled) {
        return false;
    }
    switch (element.nodeName) {
        case 'A': {
            return !!element.href && element.rel !== 'ignore';
        }
        case 'INPUT': {
            return !(element.type === 'hidden' || element.type === 'file');
        }
        case 'BUTTON':
        case 'SELECT':
        case 'TEXTAREA': {
            return true;
        }
        default: {
            return false;
        }
    }
};
const attemptFocus = (element) => {
    var _a;
    if (!isFocusable(element)) {
        return false;
    }
    Utils.IgnoreUtilFocusChanges = true;
    (_a = element.focus) === null || _a === void 0 ? void 0 : _a.call(element);
    Utils.IgnoreUtilFocusChanges = false;
    return document.activeElement === element;
};
const triggerEvent = function (elm, name, ...opts) {
    let eventName;
    if (name.includes('mouse') || name.includes('click')) {
        eventName = 'MouseEvents';
    }
    else if (name.includes('key')) {
        eventName = 'KeyboardEvent';
    }
    else {
        eventName = 'HTMLEvents';
    }
    const evt = document.createEvent(eventName);
    evt.initEvent(name, ...opts);
    elm.dispatchEvent(evt);
    return elm;
};
const Utils = {
    IgnoreUtilFocusChanges: false,
    focusFirstDescendant: function (element) {
        for (let i = 0; i < element.childNodes.length; i++) {
            const child = element.childNodes[i];
            if (attemptFocus(child) ||
                this.focusFirstDescendant(child)) {
                return true;
            }
        }
        return false;
    },
    focusLastDescendant: function (element) {
        for (let i = element.childNodes.length - 1; i >= 0; i--) {
            const child = element.childNodes[i];
            if (attemptFocus(child) ||
                this.focusLastDescendant(child)) {
                return true;
            }
        }
        return false;
    },
};

export default Utils;
export { EVENT_CODE, attemptFocus, isFocusable, isVisible, obtainAllFocusableElements, triggerEvent };
