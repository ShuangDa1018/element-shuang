declare const _default: import("vue").DefineComponent<{
    pageSize: NumberConstructor;
    pageSizes: {
        type: ArrayConstructor;
        default: () => number[];
    };
    popperClass: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
}, {
    t: (...args: any[]) => string;
    innerPagesizes: import("vue").ComputedRef<unknown>;
    innerPageSize: import("vue").Ref<number>;
    handleChange: (val: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "page-size-change"[], "page-size-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    pageSizes: unknown;
    popperClass: unknown;
    disabled: boolean;
} & {
    pageSize?: unknown;
}>, {
    pageSizes: unknown;
    popperClass: unknown;
    disabled: boolean;
}>;
export default _default;
