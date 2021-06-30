import MenuItem from './menu-item';

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
            new MenuItem(child);
        });
    }
}

export default Menu;
