declare const _default: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
}, {
    data: {
        hover: boolean;
        translate: number;
        scale: number;
        active: boolean;
        ready: boolean;
        inStage: boolean;
        animating: boolean;
    };
    itemStyle: import("vue").ComputedRef<Partial<Pick<CSSStyleDeclaration, "transform" | "transition" | "animation">>>;
    translateItem: (index: number, activeIndex: number, oldIndex: number) => void;
    type: string;
    handleItemClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    name: unknown;
    label: unknown;
} & {}>, {
    name: unknown;
    label: unknown;
}>;
export default _default;
