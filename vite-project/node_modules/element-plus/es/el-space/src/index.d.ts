declare const _default: import("vue").DefineComponent<{
    direction: {
        type: import("vue").PropType<"horizontal" | "vertical">;
        default: string;
    };
    class: {
        type: (StringConstructor | ObjectConstructor | ArrayConstructor)[];
        default: string;
    };
    style: {
        type: import("vue").PropType<string | any[] | import("vue").CSSProperties>;
    };
    alignment: {
        type: import("vue").PropType<"">;
        default: string;
    };
    prefixCls: {
        type: StringConstructor;
    };
    spacer: {
        type: import("vue").PropType<import("vue").VNodeChild>;
        default: any;
        validator: (val: unknown) => boolean;
    };
    wrap: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: import("vue").PropType<number | "large" | "medium" | "small" | "mini" | [number, number]>;
        validator: (val: unknown) => boolean;
    };
}, {
    classes: import("vue").ComputedRef<unknown[]>;
    containerStyle: import("vue").ComputedRef<import("vue").CSSProperties[]>;
    itemStyle: import("vue").ComputedRef<{
        paddingBottom: string;
        marginRight: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    direction: unknown;
    class: unknown;
    alignment: unknown;
    wrap: boolean;
} & {
    style?: unknown;
    prefixCls?: unknown;
    spacer?: unknown;
    size?: unknown;
}>, {
    direction: unknown;
    class: unknown;
    alignment: unknown;
    spacer: unknown;
    wrap: boolean;
}>;
export default _default;
