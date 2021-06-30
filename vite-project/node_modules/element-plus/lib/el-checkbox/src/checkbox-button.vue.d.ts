declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (BooleanConstructor | NumberConstructor | StringConstructor)[];
        default: () => any;
    };
    label: {
        type: (BooleanConstructor | NumberConstructor | StringConstructor)[];
    };
    indeterminate: BooleanConstructor;
    disabled: BooleanConstructor;
    checked: BooleanConstructor;
    name: {
        type: StringConstructor;
        default: any;
    };
    trueLabel: {
        type: (NumberConstructor | StringConstructor)[];
        default: any;
    };
    falseLabel: {
        type: (NumberConstructor | StringConstructor)[];
        default: any;
    };
}, {
    focus: import("vue").Ref<boolean>;
    isChecked: import("vue").ComputedRef<any>;
    isDisabled: import("vue").ComputedRef<any>;
    model: import("vue").WritableComputedRef<any>;
    handleChange: (e: InputEvent) => void;
    activeStyle: import("vue").ComputedRef<{
        backgroundColor: string;
        borderColor: string;
        color: string;
        boxShadow: string;
    }>;
    size: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    indeterminate: boolean;
    disabled: boolean;
    checked: boolean;
} & {
    modelValue?: unknown;
    label?: unknown;
    name?: unknown;
    trueLabel?: unknown;
    falseLabel?: unknown;
}>, {
    modelValue: unknown;
    indeterminate: boolean;
    disabled: boolean;
    checked: boolean;
    name: unknown;
    trueLabel: unknown;
    falseLabel: unknown;
}>;
export default _default;
