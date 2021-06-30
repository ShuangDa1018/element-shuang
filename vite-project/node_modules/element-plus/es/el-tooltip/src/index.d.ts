declare const _default: import("vue").DefineComponent<{
    manual: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: BooleanConstructor;
        validator: (val: unknown) => boolean;
        default: any;
    };
    openDelay: {
        type: NumberConstructor;
        default: number;
    };
    visibleArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    tabindex: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    arrowOffset: {
        type: NumberConstructor;
        default: number;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoClose: {
        type: NumberConstructor;
        default: number;
    };
    boundariesPadding: {
        type: NumberConstructor;
        default: number;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    class: {
        type: StringConstructor;
        default: string;
    };
    style: ObjectConstructor;
    hideAfter: {
        type: NumberConstructor;
        default: number;
    };
    cutoff: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    effect: {
        type: import("vue").PropType<import("../../el-popper").Effect>;
        default: import("../../el-popper").Effect;
    };
    enterable: {
        type: BooleanConstructor;
        default: boolean;
    };
    manualMode: {
        type: BooleanConstructor;
        default: boolean;
    };
    showAfter: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    placement: {
        type: import("vue").PropType<import("../../el-popper").Placement>;
        default: import("../../el-popper").Placement;
    };
    popperClass: {
        type: StringConstructor;
        default: string;
    };
    pure: {
        type: BooleanConstructor;
        default: boolean;
    };
    popperOptions: {
        type: import("vue").PropType<import("../../el-popper").Options>;
        default: () => any;
    };
    showArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    strategy: {
        type: import("vue").PropType<import("@popperjs/core").PositioningStrategy>;
        default: import("@popperjs/core").PositioningStrategy;
    };
    transition: {
        type: StringConstructor;
        default: string;
    };
    trigger: {
        type: import("vue").PropType<import("../../el-popper/src/use-popper").Trigger>;
        default: string;
    };
    visible: {
        type: BooleanConstructor;
        default: any;
    };
    stopPopperMouseEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    gpuAcceleration: {
        type: BooleanConstructor;
        default: boolean;
    };
    fallbackPlacements: {
        type: import("vue").PropType<import("../../el-popper").Placement[]>;
        default: any[];
    };
}, {
    popper: any;
    onUpdateVisible: (val: any) => void;
    updatePopper: () => any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    class: unknown;
    manual: boolean;
    openDelay: unknown;
    visibleArrow: boolean;
    tabindex: unknown;
    arrowOffset: unknown;
    appendToBody: boolean;
    autoClose: unknown;
    boundariesPadding: unknown;
    content: unknown;
    hideAfter: unknown;
    cutoff: boolean;
    disabled: boolean;
    effect: unknown;
    enterable: boolean;
    manualMode: boolean;
    showAfter: unknown;
    offset: unknown;
    placement: unknown;
    popperClass: unknown;
    pure: boolean;
    showArrow: boolean;
    strategy: unknown;
    transition: unknown;
    trigger: unknown;
    stopPopperMouseEvent: boolean;
    gpuAcceleration: boolean;
    fallbackPlacements: unknown;
} & {
    style?: Record<string, any>;
    modelValue?: boolean;
    popperOptions?: unknown;
    visible?: boolean;
}>, {
    class: unknown;
    manual: boolean;
    modelValue: boolean;
    openDelay: unknown;
    visibleArrow: boolean;
    tabindex: unknown;
    arrowOffset: unknown;
    appendToBody: boolean;
    autoClose: unknown;
    boundariesPadding: unknown;
    content: unknown;
    hideAfter: unknown;
    cutoff: boolean;
    disabled: boolean;
    effect: unknown;
    enterable: boolean;
    manualMode: boolean;
    showAfter: unknown;
    offset: unknown;
    placement: unknown;
    popperClass: unknown;
    pure: boolean;
    popperOptions: unknown;
    showArrow: boolean;
    strategy: unknown;
    transition: unknown;
    trigger: unknown;
    visible: boolean;
    stopPopperMouseEvent: boolean;
    gpuAcceleration: boolean;
    fallbackPlacements: unknown;
}>;
export default _default;
