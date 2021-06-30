import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    lowThreshold: {
        type: NumberConstructor;
        default: number;
    };
    highThreshold: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    colors: {
        type: (ArrayConstructor | ObjectConstructor)[];
        default: () => string[];
    };
    voidColor: {
        type: StringConstructor;
        default: string;
    };
    disabledVoidColor: {
        type: StringConstructor;
        default: string;
    };
    iconClasses: {
        type: (ArrayConstructor | ObjectConstructor)[];
        default: () => string[];
    };
    voidIconClass: {
        type: StringConstructor;
        default: string;
    };
    disabledVoidIconClass: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowHalf: {
        type: BooleanConstructor;
        default: boolean;
    };
    showText: {
        type: BooleanConstructor;
        default: boolean;
    };
    showScore: {
        type: BooleanConstructor;
        default: boolean;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
    texts: {
        type: PropType<string[]>;
        default: () => string[];
    };
    scoreTemplate: {
        type: StringConstructor;
        default: string;
    };
}, {
    hoverIndex: import("vue").Ref<number>;
    currentValue: import("vue").Ref<unknown>;
    rateDisabled: import("vue").ComputedRef<boolean>;
    text: import("vue").ComputedRef<string>;
    decimalStyle: import("vue").ComputedRef<{
        color: any;
        width: string;
    }>;
    decimalIconClass: import("vue").ComputedRef<any>;
    classes: import("vue").ComputedRef<unknown[]>;
    showDecimalIcon: (item: number) => boolean;
    getIconStyle: (item: number) => {
        color: any;
    };
    selectValue: (value: number) => void;
    handleKey: (e: KeyboardEvent) => unknown;
    setCurrentValue: (value: number, event: MouseEvent) => void;
    resetCurrentValue: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue: unknown;
    lowThreshold: unknown;
    highThreshold: unknown;
    max: unknown;
    colors: unknown;
    voidColor: unknown;
    disabledVoidColor: unknown;
    iconClasses: unknown;
    voidIconClass: unknown;
    disabledVoidIconClass: unknown;
    disabled: boolean;
    allowHalf: boolean;
    showText: boolean;
    showScore: boolean;
    textColor: unknown;
    texts: unknown;
    scoreTemplate: unknown;
} & {}>, {
    modelValue: unknown;
    lowThreshold: unknown;
    highThreshold: unknown;
    max: unknown;
    colors: unknown;
    voidColor: unknown;
    disabledVoidColor: unknown;
    iconClasses: unknown;
    voidIconClass: unknown;
    disabledVoidIconClass: unknown;
    disabled: boolean;
    allowHalf: boolean;
    showText: boolean;
    showScore: boolean;
    textColor: unknown;
    texts: unknown;
    scoreTemplate: unknown;
}>;
export default _default;
