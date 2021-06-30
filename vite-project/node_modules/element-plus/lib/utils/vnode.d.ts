import type { VNode, VNodeTypes, VNodeChild } from 'vue';
declare type Children = VNodeTypes[] | VNodeTypes;
export declare enum PatchFlags {
    TEXT = 1,
    CLASS = 2,
    STYLE = 4,
    PROPS = 8,
    FULL_PROPS = 16,
    HYDRATE_EVENTS = 32,
    STABLE_FRAGMENT = 64,
    KEYED_FRAGMENT = 128,
    UNKEYED_FRAGMENT = 256,
    NEED_PATCH = 512,
    DYNAMIC_SLOTS = 1024,
    HOISTED = -1,
    BAIL = -2
}
export declare const isFragment: (node: VNodeChild) => boolean;
export declare const isText: (node: VNodeChild) => boolean;
export declare const isComment: (node: VNodeChild) => boolean;
export declare const isTemplate: (node: VNodeChild) => boolean;
declare function getChildren(node: VNode, depth: number): undefined | VNode;
export declare const isValidElementNode: (node: VNodeChild) => boolean;
export declare const getFirstValidNode: (nodes: VNodeChild, maxDepth?: number) => ReturnType<typeof getChildren>;
export declare function renderIf(condition: boolean, node: VNodeTypes, props: any, children?: Children, patchFlag?: number, patchProps?: string[]): VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
export declare function renderBlock(node: VNodeTypes, props: any, children?: Children, patchFlag?: number, patchProps?: string[]): VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
export {};
