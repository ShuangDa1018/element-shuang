import ResizeObserver from 'resize-observer-polyfill';
export declare type ResizableElement = CustomizedHTMLElement<{
    __resizeListeners__: Array<(...args: unknown[]) => unknown>;
    __ro__: ResizeObserver;
}>;
export declare const addResizeListener: (element: ResizableElement, fn: (...args: unknown[]) => unknown) => void;
export declare const removeResizeListener: (element: ResizableElement, fn: (...args: unknown[]) => unknown) => void;
