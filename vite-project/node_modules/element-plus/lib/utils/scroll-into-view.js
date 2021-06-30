'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isServer = require('./isServer');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);

function scrollIntoView(container, selected) {
    if (isServer__default['default'])
        return;
    if (!selected) {
        container.scrollTop = 0;
        return;
    }
    const offsetParents = [];
    let pointer = selected.offsetParent;
    while (pointer !== null &&
        container !== pointer &&
        container.contains(pointer)) {
        offsetParents.push(pointer);
        pointer = pointer.offsetParent;
    }
    const top = selected.offsetTop +
        offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0);
    const bottom = top + selected.offsetHeight;
    const viewRectTop = container.scrollTop;
    const viewRectBottom = viewRectTop + container.clientHeight;
    if (top < viewRectTop) {
        container.scrollTop = top;
    }
    else if (bottom > viewRectBottom) {
        container.scrollTop = bottom - container.clientHeight;
    }
}

exports.default = scrollIntoView;
