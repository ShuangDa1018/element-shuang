import { Ref } from 'vue';
import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<number | number[]>;
        default: number;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    showInput: {
        type: BooleanConstructor;
        default: boolean;
    };
    showInputControls: {
        type: BooleanConstructor;
        default: boolean;
    };
    inputSize: {
        type: StringConstructor;
        default: string;
    };
    showStops: {
        type: BooleanConstructor;
        default: boolean;
    };
    showTooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
    formatTooltip: {
        type: PropType<(val: number) => number | string>;
        default: any;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    range: {
        type: BooleanConstructor;
        default: boolean;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    debounce: {
        type: NumberConstructor;
        default: number;
    };
    label: {
        type: StringConstructor;
        default: any;
    };
    tooltipClass: {
        type: StringConstructor;
        default: any;
    };
    marks: ObjectConstructor;
}, {
    firstValue: Ref<number>;
    secondValue: Ref<number>;
    oldValue: Ref<number>;
    dragging: Ref<boolean>;
    sliderSize: Ref<number>;
    slider: Ref<HTMLElement>;
    firstButton: any;
    secondButton: any;
    sliderDisabled: import("vue").ComputedRef<boolean>;
    runwayStyle: import("vue").ComputedRef<CSSStyleDeclaration>;
    barStyle: import("vue").ComputedRef<CSSStyleDeclaration>;
    emitChange: () => Promise<void>;
    onSliderClick: (event: MouseEvent) => void;
    getStopStyle: (position: number) => CSSStyleDeclaration;
    stops: import("vue").ComputedRef<number[]>;
    markList: import("vue").ComputedRef<import("./slider.type").Mark[]>;
    sliderWrapper: Ref<HTMLElement>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "input")[], "update:modelValue" | "change" | "input", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue: unknown;
    min: unknown;
    max: unknown;
    step: unknown;
    showInput: boolean;
    showInputControls: boolean;
    inputSize: unknown;
    showStops: boolean;
    showTooltip: boolean;
    disabled: boolean;
    range: boolean;
    vertical: boolean;
    height: unknown;
    debounce: unknown;
} & {
    formatTooltip?: unknown;
    label?: unknown;
    tooltipClass?: unknown;
    marks?: Record<string, any>;
}>, {
    modelValue: unknown;
    min: unknown;
    max: unknown;
    step: unknown;
    showInput: boolean;
    showInputControls: boolean;
    inputSize: unknown;
    showStops: boolean;
    showTooltip: boolean;
    formatTooltip: unknown;
    disabled: boolean;
    range: boolean;
    vertical: boolean;
    height: unknown;
    debounce: unknown;
    label: unknown;
    tooltipClass: unknown;
}>;
export default _default;
