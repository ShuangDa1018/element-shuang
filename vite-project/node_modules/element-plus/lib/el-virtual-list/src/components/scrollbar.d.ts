import type { CSSProperties } from 'vue';
declare type SyntheticMouseEvent = TouchEvent | MouseEvent;
declare const ScrollBar: import("vue").DefineComponent<{
    layout: {
        type: import("vue").PropType<import("../types").LayoutDirection>;
        default: string;
    };
    total: NumberConstructor;
    ratio: NumberConstructor;
    clientSize: NumberConstructor;
    scrollFrom: NumberConstructor;
    visible: BooleanConstructor;
}, {
    state: {
        isDragging: boolean;
        traveled: number;
    };
    trackRef: any;
    trackStyle: import("vue").ComputedRef<CSSProperties>;
    thumbRef: any;
    thumbStyle: import("vue").ComputedRef<CSSProperties>;
    onThumbMouseDown: (e: SyntheticMouseEvent) => void;
    onMouseUp: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("scroll" | "start-move" | "stop-move")[], "scroll" | "start-move" | "stop-move", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    layout: unknown;
    visible: boolean;
} & {
    total?: unknown;
    ratio?: unknown;
    clientSize?: unknown;
    scrollFrom?: unknown;
}>, {
    layout: unknown;
    visible: boolean;
}>;
export default ScrollBar;
