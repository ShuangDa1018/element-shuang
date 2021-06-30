declare const _default: import("vue").DefineComponent<{
    label: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    closable: BooleanConstructor;
    disabled: BooleanConstructor;
    lazy: BooleanConstructor;
}, {
    index: import("vue").Ref<string>;
    loaded: import("vue").Ref<boolean>;
    isClosable: import("vue").ComputedRef<any>;
    active: import("vue").ComputedRef<boolean>;
    paneName: import("vue").ComputedRef<string>;
    shouldBeRender: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    label: unknown;
    name: unknown;
    closable: boolean;
    disabled: boolean;
    lazy: boolean;
} & {}>, {
    label: unknown;
    name: unknown;
    closable: boolean;
    disabled: boolean;
    lazy: boolean;
}>;
export default _default;
