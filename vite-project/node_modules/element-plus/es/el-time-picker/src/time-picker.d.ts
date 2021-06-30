declare const _default: import("vue").DefineComponent<{
    isRange: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: (ArrayConstructor | StringConstructor)[];
        default: string;
    };
    popperClass: {
        type: StringConstructor;
        default: string;
    };
    format: {
        type: StringConstructor;
    };
    valueFormat: {
        type: import("vue").PropType<string>;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearIcon: {
        type: StringConstructor;
        default: string;
    };
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    prefixIcon: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: import("vue").PropType<ComponentSize>;
        validator: (val: string) => boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    popperOptions: {
        type: import("vue").PropType<import("@popperjs/core").Options>;
        default: () => {};
    };
    modelValue: {
        type: import("vue").PropType<string | Date | Date[]>;
        default: string;
    };
    rangeSeparator: {
        type: StringConstructor;
        default: string;
    };
    startPlaceholder: StringConstructor;
    endPlaceholder: StringConstructor;
    defaultValue: {
        type: import("vue").PropType<Date | Date[]>;
    };
    defaultTime: {
        type: import("vue").PropType<Date | Date[]>;
    };
    disabledHours: {
        type: FunctionConstructor;
    };
    disabledMinutes: {
        type: FunctionConstructor;
    };
    disabledSeconds: {
        type: FunctionConstructor;
    };
    disabledDate: {
        type: FunctionConstructor;
    };
    cellClassName: {
        type: FunctionConstructor;
    };
    shortcuts: {
        type: ArrayConstructor;
        default: () => any[];
    };
    arrowControl: {
        type: BooleanConstructor;
        default: boolean;
    };
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    unlinkPanels: BooleanConstructor;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isRange: boolean;
    name: unknown;
    popperClass: unknown;
    type: unknown;
    clearable: boolean;
    clearIcon: unknown;
    editable: boolean;
    prefixIcon: unknown;
    readonly: boolean;
    disabled: boolean;
    placeholder: unknown;
    popperOptions: unknown;
    modelValue: unknown;
    rangeSeparator: unknown;
    shortcuts: unknown;
    arrowControl: boolean;
    validateEvent: boolean;
    unlinkPanels: boolean;
} & {
    format?: unknown;
    valueFormat?: unknown;
    size?: unknown;
    startPlaceholder?: unknown;
    endPlaceholder?: unknown;
    defaultValue?: unknown;
    defaultTime?: unknown;
    disabledHours?: unknown;
    disabledMinutes?: unknown;
    disabledSeconds?: unknown;
    disabledDate?: unknown;
    cellClassName?: unknown;
}>, {
    isRange: boolean;
    name: unknown;
    popperClass: unknown;
    type: unknown;
    clearable: boolean;
    clearIcon: unknown;
    editable: boolean;
    prefixIcon: unknown;
    readonly: boolean;
    disabled: boolean;
    placeholder: unknown;
    popperOptions: unknown;
    modelValue: unknown;
    rangeSeparator: unknown;
    shortcuts: unknown;
    arrowControl: boolean;
    validateEvent: boolean;
    unlinkPanels: boolean;
}>;
export default _default;
