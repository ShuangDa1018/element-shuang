import { RendererNode } from 'vue';
declare class Menu {
    domNode: RendererNode;
    constructor(domNode: RendererNode);
    init(): void;
}
export default Menu;
