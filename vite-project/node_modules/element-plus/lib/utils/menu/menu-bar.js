'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MenuItem = require('./menu-item');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var MenuItem__default = /*#__PURE__*/_interopDefaultLegacy(MenuItem);

class Menu {
    constructor(domNode) {
        this.domNode = domNode;
        this.init();
    }
    init() {
        const menuChildren = this.domNode.childNodes;
        [].filter
            .call(menuChildren, (child) => child.nodeType === 1)
            .forEach((child) => {
            new MenuItem__default['default'](child);
        });
    }
}

exports.default = Menu;
