import type { PropType, ExtractPropTypes, CSSProperties, VNodeChild } from 'vue';
export declare const defaultProps: {
    direction: {
        type: PropType<"horizontal" | "vertical">;
        default: string;
    };
    class: {
        type: (StringConstructor | ObjectConstructor | ArrayConstructor)[];
        default: string;
    };
    style: {
        type: PropType<string | any[] | CSSProperties>;
    };
    alignment: {
        type: PropType<"">;
        default: string;
    };
    prefixCls: {
        type: StringConstructor;
    };
    spacer: {
        type: PropType<VNodeChild>;
        default: any;
        validator: (val: unknown) => boolean;
    };
    wrap: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<number | "large" | "medium" | "small" | "mini" | [number, number]>;
        validator: (val: unknown) => boolean;
    };
};
export declare function useSpace(props: ExtractPropTypes<typeof defaultProps>): {
    classes: import("vue").ComputedRef<unknown[]>;
    containerStyle: import("vue").ComputedRef<CSSProperties[]>;
    itemStyle: import("vue").ComputedRef<{
        paddingBottom: string;
        marginRight: string;
    }>;
};
