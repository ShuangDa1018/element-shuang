import type { Ref } from 'vue';
interface Instance {
    closeOnClickModal: Ref<boolean>;
    closeOnPressEscape: Ref<boolean>;
    close: () => void;
    handleClose?: () => void;
    handleAction?: (action: string) => void;
}
declare type StackFrame = {
    id: string;
    zIndex: number;
    modalClass: string;
};
interface IPopupManager {
    getInstance: (id: string) => Instance;
    zIndex: number;
    modalDom?: HTMLElement;
    modalFade: boolean;
    modalStack: StackFrame[];
    nextZIndex: () => number;
    register: (id: string, instance: Instance) => void;
    deregister: (id: string) => void;
    doOnModalClick: () => void;
    openModal: (id: string, zIndex: number, dom: HTMLElement, modalClass: string, modalFade: boolean) => void;
    closeModal: (id: string) => void;
}
declare const PopupManager: IPopupManager;
export default PopupManager;
