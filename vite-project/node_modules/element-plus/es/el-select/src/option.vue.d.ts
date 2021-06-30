declare const _default: import("vue").DefineComponent<{
    value: {
        required: true;
        type: (StringConstructor | NumberConstructor | BooleanConstructor | ObjectConstructor)[];
    };
    label: (StringConstructor | NumberConstructor)[];
    created: BooleanConstructor;
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    currentLabel: import("vue").ComputedRef<any>;
    itemSelected: import("vue").ComputedRef<boolean>;
    isDisabled: import("vue").ComputedRef<any>;
    select: import("./token").SelectContext;
    hoverItem: () => void;
    visible: import("vue").Ref<boolean>;
    hover: import("vue").Ref<boolean>;
    selectOptionClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    value: unknown;
    created: boolean;
    disabled: boolean;
} & {
    label?: unknown;
}>, {
    created: boolean;
    disabled: boolean;
}>;
export default _default;
