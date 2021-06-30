import { Ref } from 'vue';
import Node from './node';
import type { PropType } from 'vue';
import type { CascaderValue, CascaderOption, RenderLabel } from './types';
declare const _default: import("vue").DefineComponent<{
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    renderLabel: PropType<RenderLabel>;
    modelValue: PropType<CascaderValue>;
    options: {
        type: PropType<CascaderOption[]>;
        default: () => CascaderOption[];
    };
    props: {
        type: PropType<import("./types").CascaderProps>;
        default: () => import("./types").CascaderProps;
    };
}, {
    menuList: Ref<any[]>;
    menus: Ref<Node[][]>;
    checkedNodes: Ref<Node[]>;
    handleKeyDown: (e: KeyboardEvent) => void;
    handleCheckChange: (node: Node, checked: boolean, emitClose?: boolean) => void;
    getFlattedNodes: (leafOnly: boolean) => Node[];
    getCheckedNodes: (leafOnly: boolean) => Node[];
    clearCheckedNodes: () => void;
    calculateCheckedValue: () => void;
    scrollToExpandingNode: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "close" | "expand-change")[], "update:modelValue" | "change" | "close" | "expand-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    border: boolean;
    options: unknown;
    props: unknown;
} & {
    renderLabel?: unknown;
    modelValue?: unknown;
}>, {
    border: boolean;
    options: unknown;
    props: unknown;
}>;
export default _default;
