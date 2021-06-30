import SubMenu from './submenu';
declare class MenuItem {
    domNode: HTMLElement;
    submenu: SubMenu;
    constructor(domNode: HTMLElement);
    init(): void;
    addListeners(): void;
}
export default MenuItem;
