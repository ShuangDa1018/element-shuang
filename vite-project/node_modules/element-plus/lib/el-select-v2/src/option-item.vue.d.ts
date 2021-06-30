declare const _default: import("vue").DefineComponent<{
    data: ArrayConstructor;
    disabled: BooleanConstructor;
    hovering: BooleanConstructor;
    item: ObjectConstructor;
    index: NumberConstructor;
    style: ObjectConstructor;
    selected: BooleanConstructor;
}, {
    hoverItem: () => void;
    selectOptionClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("select" | "hover")[], "select" | "hover", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    disabled: boolean;
    hovering: boolean;
    selected: boolean;
} & {
    data?: unknown;
    item?: Record<string, any>;
    index?: unknown;
    style?: Record<string, any>;
}>, {
    disabled: boolean;
    hovering: boolean;
    selected: boolean;
}>;
export default _default;
