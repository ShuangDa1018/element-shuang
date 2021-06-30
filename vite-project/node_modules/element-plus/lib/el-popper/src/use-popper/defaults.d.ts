import type { PropType } from 'vue';
import type { Placement, PositioningStrategy, Instance as PopperInstance, Options } from '@popperjs/core';
export declare enum Effect {
    DARK = "dark",
    LIGHT = "light"
}
export declare type RefElement = Nullable<HTMLElement>;
export declare type Offset = [number, number] | number;
export type { Placement, PositioningStrategy, PopperInstance, Options };
export declare type TriggerType = 'click' | 'hover' | 'focus' | 'manual';
export declare type Trigger = TriggerType | TriggerType[];
export declare type IPopperOptions = {
    arrowOffset: number;
    autoClose: number;
    boundariesPadding: number;
    class: string;
    cutoff: boolean;
    disabled: boolean;
    enterable: boolean;
    hideAfter: number;
    manualMode: boolean;
    offset: number;
    placement: Placement;
    popperOptions: Options;
    showAfter: number;
    showArrow: boolean;
    strategy: PositioningStrategy;
    trigger: Trigger;
    visible: boolean;
    stopPopperMouseEvent: boolean;
    gpuAcceleration: boolean;
    fallbackPlacements: Array<Placement>;
};
export declare const DEFAULT_TRIGGER = "hover";
declare const _default: {
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
        type: PropType<Placement>;
        default: Placement;
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
        type: PropType<Options>;
        default: () => any;
    };
    showArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    strategy: {
        type: PropType<PositioningStrategy>;
        default: PositioningStrategy;
    };
    transition: {
        type: StringConstructor;
        default: string;
    };
    trigger: {
        type: PropType<Trigger>;
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
        type: PropType<Placement[]>;
        default: any[];
    };
};
export default _default;
