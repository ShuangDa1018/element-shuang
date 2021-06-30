declare const _default: import("vue").DefineComponent<{
    image: {
        type: StringConstructor;
        default: string;
    };
    imageSize: NumberConstructor;
    description: {
        type: StringConstructor;
        default: string;
    };
}, {
    emptyDescription: import("vue").ComputedRef<unknown>;
    imageStyle: import("vue").ComputedRef<{
        width: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    image: unknown;
    description: unknown;
} & {
    imageSize?: unknown;
}>, {
    image: unknown;
    description: unknown;
}>;
export default _default;
