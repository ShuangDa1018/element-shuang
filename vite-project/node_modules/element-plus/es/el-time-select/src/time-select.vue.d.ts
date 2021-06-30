declare const _default: import("vue").DefineComponent<{
    modelValue: StringConstructor;
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    start: {
        type: StringConstructor;
        default: string;
    };
    end: {
        type: StringConstructor;
        default: string;
    };
    step: {
        type: StringConstructor;
        default: string;
    };
    minTime: {
        type: StringConstructor;
        default: string;
    };
    maxTime: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    prefixIcon: {
        type: StringConstructor;
        default: string;
    };
    clearIcon: {
        type: StringConstructor;
        default: string;
    };
}, {
    value: import("vue").ComputedRef<unknown>;
    items: import("vue").ComputedRef<any[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "blur" | "focus" | "update:modelValue")[], "change" | "blur" | "focus" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    editable: boolean;
    clearable: boolean;
    size: unknown;
    placeholder: unknown;
    start: unknown;
    end: unknown;
    step: unknown;
    minTime: unknown;
    maxTime: unknown;
    name: unknown;
    prefixIcon: unknown;
    clearIcon: unknown;
} & {
    modelValue?: unknown;
}>, {
    editable: boolean;
    clearable: boolean;
    size: unknown;
    placeholder: unknown;
    start: unknown;
    end: unknown;
    step: unknown;
    minTime: unknown;
    maxTime: unknown;
    name: unknown;
    prefixIcon: unknown;
    clearIcon: unknown;
}>;
export default _default;
