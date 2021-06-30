declare const _default: import("vue").DefineComponent<{
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    count: {
        type: NumberConstructor;
        default: number;
    };
    rows: {
        type: NumberConstructor;
        default: number;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    throttle: {
        type: NumberConstructor;
    };
}, {
    uiLoading: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    animated: boolean;
    count: unknown;
    rows: unknown;
    loading: boolean;
} & {
    throttle?: unknown;
}>, {
    animated: boolean;
    count: unknown;
    rows: unknown;
    loading: boolean;
}>;
export default _default;
