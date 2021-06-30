import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (ObjectConstructor | BooleanConstructor | ArrayConstructor)[];
        default: () => any;
    };
    disabled: BooleanConstructor;
    min: {
        type: NumberConstructor;
        default: any;
    };
    max: {
        type: NumberConstructor;
        default: any;
    };
    size: {
        type: PropType<ComponentSize>;
        validator: (val: string) => boolean;
    };
    fill: {
        type: StringConstructor;
        default: any;
    };
    textColor: {
        type: StringConstructor;
        default: any;
    };
}, void, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    disabled: boolean;
} & {
    modelValue?: unknown;
    min?: unknown;
    max?: unknown;
    size?: unknown;
    fill?: unknown;
    textColor?: unknown;
}>, {
    modelValue: unknown;
    disabled: boolean;
    min: unknown;
    max: unknown;
    fill: unknown;
    textColor: unknown;
}>;
export default _default;
