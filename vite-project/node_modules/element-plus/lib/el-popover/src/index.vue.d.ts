import { Effect } from '../../el-popper';
import type { PropType } from 'vue';
import type { TriggerType } from '../../el-popper';
declare const _default: import("vue").DefineComponent<{
    content: {
        type: StringConstructor;
    };
    trigger: {
        type: PropType<TriggerType>;
        default: string;
    };
    title: {
        type: StringConstructor;
    };
    transition: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    tabindex: (NumberConstructor | StringConstructor)[];
    arrowOffset: {
        type: NumberConstructor;
        default: number;
    };
    autoClose: {
        type: NumberConstructor;
        default: number;
    };
    boundariesPadding: {
        type: NumberConstructor;
        default: number;
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
        type: PropType<Effect>;
        default: Effect;
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
        type: PropType<import("../../el-popper").Placement>;
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
        type: PropType<import("../../el-popper").Options>;
        default: () => any;
    };
    showArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    strategy: {
        type: PropType<import("@popperjs/core").PositioningStrategy>;
        default: import("@popperjs/core").PositioningStrategy;
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
        type: PropType<import("../../el-popper").Placement[]>;
        default: any[];
    };
}, {
    popperStyle: import("vue").ComputedRef<{
        width: string;
        zIndex: number;
    }>;
    update: () => void;
    doDestroy: (forceDestroy?: boolean) => void;
    show: () => void;
    hide: () => void;
    onPopperMouseEnter: () => void;
    onPopperMouseLeave: () => void;
    onAfterEnter: () => void;
    onAfterLeave: () => void;
    onBeforeEnter: () => void;
    onBeforeLeave: () => void;
    initializePopper: () => void;
    isManualMode: () => boolean;
    arrowRef: import("vue").Ref<HTMLElement>;
    events: import("../../el-popper/src/use-popper").PopperEvents;
    popperId: string;
    popperInstance: import("../../el-popper").PopperInstance;
    popperRef: import("vue").Ref<HTMLElement>;
    triggerRef: import("vue").Ref<import("../../el-popper/src/use-popper").ElementType>;
    visibility: import("vue").WritableComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    class: unknown;
    trigger: unknown;
    transition: unknown;
    width: unknown;
    appendToBody: boolean;
    arrowOffset: unknown;
    autoClose: unknown;
    boundariesPadding: unknown;
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
    stopPopperMouseEvent: boolean;
    gpuAcceleration: boolean;
    fallbackPlacements: unknown;
} & {
    title?: unknown;
    style?: Record<string, any>;
    content?: unknown;
    tabindex?: unknown;
    popperOptions?: unknown;
    visible?: boolean;
}>, {
    class: unknown;
    trigger: unknown;
    transition: unknown;
    width: unknown;
    appendToBody: boolean;
    arrowOffset: unknown;
    autoClose: unknown;
    boundariesPadding: unknown;
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
    visible: boolean;
    stopPopperMouseEvent: boolean;
    gpuAcceleration: boolean;
    fallbackPlacements: unknown;
}>;
export default _default;
