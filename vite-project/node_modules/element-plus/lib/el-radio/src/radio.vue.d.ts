import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: string;
    };
    label: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: string;
    };
    disabled: BooleanConstructor;
    name: {
        type: StringConstructor;
        default: string;
    };
    border: BooleanConstructor;
    size: {
        type: PropType<ComponentSize>;
        validator: (val: string) => boolean;
    };
}, {
    focus: import("vue").Ref<boolean>;
    isGroup: import("vue").ComputedRef<boolean>;
    isDisabled: import("vue").ComputedRef<boolean>;
    model: import("vue").ComputedRef<string | number | boolean>;
    tabIndex: import("vue").ComputedRef<-1 | 0>;
    radioSize: import("vue").ComputedRef<any>;
    handleChange: () => void;
    radioRef: import("vue").Ref<HTMLInputElement>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue: unknown;
    label: unknown;
    disabled: boolean;
    name: unknown;
    border: boolean;
} & {
    size?: unknown;
}>, {
    modelValue: unknown;
    label: unknown;
    disabled: boolean;
    name: unknown;
    border: boolean;
}>;
export default _default;
