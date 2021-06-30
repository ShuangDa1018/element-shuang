import { CascaderNode } from './types';
import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    nodes: {
        type: PropType<CascaderNode[]>;
        required: true;
    };
    index: {
        type: NumberConstructor;
        required: true;
    };
}, {
    panel: import("./types").ElCascaderPanelContext;
    hoverZone: any;
    isEmpty: import("vue").ComputedRef<boolean>;
    menuId: import("vue").ComputedRef<string>;
    t: (...args: any[]) => string;
    handleExpand: (e: MouseEvent) => void;
    handleMouseMove: (e: MouseEvent) => void;
    clearHoverZone: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    nodes: unknown;
    index: unknown;
} & {}>, {}>;
export default _default;
