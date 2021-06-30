import type { CascaderNode } from './types';
export declare const isLeaf: (el: HTMLElement) => boolean;
export declare const getSibling: (el: HTMLElement, distance: number) => Nullable<Element>;
export declare const getMenuIndex: (el: HTMLElement) => number;
export declare const focusNode: (el: any) => void;
export declare const checkNode: (el: any) => void;
export declare const sortByOriginalOrder: (oldNodes: CascaderNode[], newNodes: CascaderNode[]) => CascaderNode[];
