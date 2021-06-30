declare const _default: import("vue").DefineComponent<{
    disabled: BooleanConstructor;
    currentPage: {
        type: NumberConstructor;
        default: number;
    };
    pageCount: {
        type: NumberConstructor;
        default: number;
    };
    nextText: {
        type: StringConstructor;
        default: string;
    };
}, {
    internalDisabled: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    disabled: boolean;
    currentPage: unknown;
    pageCount: unknown;
    nextText: unknown;
} & {}>, {
    disabled: boolean;
    currentPage: unknown;
    pageCount: unknown;
    nextText: unknown;
}>;
export default _default;
