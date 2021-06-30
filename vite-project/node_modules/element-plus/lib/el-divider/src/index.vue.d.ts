declare const _default: import("vue").DefineComponent<{
    direction: {
        type: StringConstructor;
        default: string;
        validator(val: string): boolean;
    };
    contentPosition: {
        type: StringConstructor;
        default: string;
        validator(val: string): boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    direction: unknown;
    contentPosition: unknown;
} & {}>, {
    direction: unknown;
    contentPosition: unknown;
}>;
export default _default;
