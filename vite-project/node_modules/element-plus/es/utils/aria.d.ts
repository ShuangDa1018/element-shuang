export declare const EVENT_CODE: {
    tab: string;
    enter: string;
    space: string;
    left: string;
    up: string;
    right: string;
    down: string;
    esc: string;
    delete: string;
    backspace: string;
};
export declare const isVisible: (element: HTMLElement) => boolean;
export declare const obtainAllFocusableElements: (element: HTMLElement) => HTMLElement[];
export declare const isFocusable: (element: HTMLElement) => boolean;
export declare const attemptFocus: (element: HTMLElement) => boolean;
export declare const triggerEvent: (elm: HTMLElement, name: string, ...opts: Array<boolean>) => HTMLElement;
declare const Utils: {
    IgnoreUtilFocusChanges: boolean;
    focusFirstDescendant: (element: HTMLElement) => boolean;
    focusLastDescendant: (element: HTMLElement) => boolean;
};
export default Utils;
