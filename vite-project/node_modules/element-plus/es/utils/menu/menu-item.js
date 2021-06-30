import { EVENT_CODE, triggerEvent } from '../aria';
import SubMenu from './submenu';

class MenuItem {
    constructor(domNode) {
        this.domNode = domNode;
        this.submenu = null;
        this.submenu = null;
        this.init();
    }
    init() {
        this.domNode.setAttribute('tabindex', '0');
        const menuChild = this.domNode.querySelector('.el-menu');
        if (menuChild) {
            this.submenu = new SubMenu(this, menuChild);
        }
        this.addListeners();
    }
    addListeners() {
        this.domNode.addEventListener('keydown', (event) => {
            let prevDef = false;
            switch (event.code) {
                case EVENT_CODE.down: {
                    triggerEvent(event.currentTarget, 'mouseenter');
                    this.submenu && this.submenu.gotoSubIndex(0);
                    prevDef = true;
                    break;
                }
                case EVENT_CODE.up: {
                    triggerEvent(event.currentTarget, 'mouseenter');
                    this.submenu && this.submenu.gotoSubIndex(this.submenu.subMenuItems.length - 1);
                    prevDef = true;
                    break;
                }
                case EVENT_CODE.tab: {
                    triggerEvent(event.currentTarget, 'mouseleave');
                    break;
                }
                case EVENT_CODE.enter:
                case EVENT_CODE.space: {
                    prevDef = true;
                    event.currentTarget.click();
                    break;
                }
            }
            if (prevDef) {
                event.preventDefault();
            }
        });
    }
}

export default MenuItem;
