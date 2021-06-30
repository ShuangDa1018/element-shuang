import type { VNode, InjectionKey } from 'vue';
import type { default as CascaderNode } from './node';
export type { CascaderNode };
export declare type CascaderNodeValue = string | number;
export declare type CascaderNodePathValue = CascaderNodeValue[];
export declare type CascaderValue = CascaderNodeValue | CascaderNodePathValue | (CascaderNodeValue | CascaderNodePathValue)[];
export declare type CascaderConfig = Required<CascaderProps>;
export declare type isDisabled = (data: CascaderOption, node: CascaderNode) => boolean;
export declare type isLeaf = (data: CascaderOption, node: CascaderNode) => boolean;
export declare type Resolve = (dataList?: CascaderOption[]) => void;
export declare type LazyLoad = (node: CascaderNode, resolve: Resolve) => void;
export declare type RenderLabel = ({ node: CascaderNode, data: CascaderOption }: {
    node: any;
    data: any;
}) => VNode | VNode[];
export declare enum ExpandTrigger {
    CLICK = "click",
    HOVER = "hover"
}
export interface CascaderOption extends Record<string, unknown> {
    label?: string;
    value?: CascaderNodeValue;
    children?: CascaderOption[];
    disabled?: boolean;
    leaf?: boolean;
}
export interface CascaderProps {
    expandTrigger?: ExpandTrigger;
    multiple?: boolean;
    checkStrictly?: boolean;
    emitPath?: boolean;
    lazy?: boolean;
    lazyLoad?: LazyLoad;
    value?: string;
    label?: string;
    children?: string;
    disabled?: string | isDisabled;
    leaf?: string | isLeaf;
    hoverThreshold?: number;
}
export interface Tag {
    node?: CascaderNode;
    key: number;
    text: string;
    hitState?: boolean;
    closable: boolean;
}
export interface ElCascaderPanelContext {
    config: CascaderConfig;
    expandingNode: Nullable<CascaderNode>;
    checkedNodes: CascaderNode[];
    isHoverMenu: boolean;
    renderLabelFn: RenderLabel;
    lazyLoad: (node?: CascaderNode, cb?: (dataList: CascaderOption[]) => void) => void;
    expandNode: (node: CascaderNode, silent?: boolean) => void;
    handleCheckChange: (node: CascaderNode, checked: boolean, emitClose?: boolean) => void;
}
export declare const CASCADER_PANEL_INJECTION_KEY: InjectionKey<ElCascaderPanelContext>;
