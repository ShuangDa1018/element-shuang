import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: string;
    };
    size: {
        type: PropType<ComponentSize>;
        validator: (val: string) => boolean;
    };
    fill: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
}, {
    handleKeydown: (e: any) => void;
    radioGroupSize: import("vue").ComputedRef<ComponentSize>;
    radioGroup: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue: unknown;
    fill: unknown;
    textColor: unknown;
    disabled: boolean;
} & {
    size?: unknown;
}>, {
    modelValue: unknown;
    fill: unknown;
    textColor: unknown;
    disabled: boolean;
}>;
export default _default;
