declare const _default: import("vue").DefineComponent<{
    value: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    isDot: BooleanConstructor;
    hidden: BooleanConstructor;
    type: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
}, {
    content: import("vue").ComputedRef<unknown>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    value: unknown;
    max: unknown;
    isDot: boolean;
    hidden: boolean;
    type: unknown;
} & {}>, {
    value: unknown;
    max: unknown;
    isDot: boolean;
    hidden: boolean;
    type: unknown;
}>;
export default _default;
