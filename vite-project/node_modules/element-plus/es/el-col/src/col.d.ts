import type { PropType } from 'vue';
declare type SizeObject = {
    span: number;
    offset: number;
};
declare const ElCol: import("vue").DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    span: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    pull: {
        type: NumberConstructor;
        default: number;
    };
    push: {
        type: NumberConstructor;
        default: number;
    };
    xs: {
        type: PropType<number | SizeObject>;
        default: () => SizeObject;
    };
    sm: {
        type: PropType<number | SizeObject>;
        default: () => SizeObject;
    };
    md: {
        type: PropType<number | SizeObject>;
        default: () => SizeObject;
    };
    lg: {
        type: PropType<number | SizeObject>;
        default: () => SizeObject;
    };
    xl: {
        type: PropType<number | SizeObject>;
        default: () => SizeObject;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    tag: unknown;
    span: unknown;
    offset: unknown;
    pull: unknown;
    push: unknown;
    xs: unknown;
    sm: unknown;
    md: unknown;
    lg: unknown;
    xl: unknown;
} & {}>, {
    tag: unknown;
    span: unknown;
    offset: unknown;
    pull: unknown;
    push: unknown;
    xs: unknown;
    sm: unknown;
    md: unknown;
    lg: unknown;
    xl: unknown;
}>;
export default ElCol;
