declare const _default: import("vue").DefineComponent<{
    label: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: string;
    };
    disabled: BooleanConstructor;
    name: {
        type: StringConstructor;
        default: string;
    };
}, {
    isGroup: import("vue").ComputedRef<boolean>;
    size: import("vue").ComputedRef<any>;
    isDisabled: import("vue").ComputedRef<boolean>;
    tabIndex: import("vue").ComputedRef<-1 | 0>;
    value: import("vue").WritableComputedRef<string | number | boolean>;
    focus: import("vue").Ref<boolean>;
    activeStyle: import("vue").ComputedRef<{
        backgroundColor: string;
        borderColor: string;
        boxShadow: string;
        color: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    label: unknown;
    disabled: boolean;
    name: unknown;
} & {}>, {
    label: unknown;
    disabled: boolean;
    name: unknown;
}>;
export default _default;
