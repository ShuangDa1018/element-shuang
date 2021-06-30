declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    tooltipClass: {
        type: StringConstructor;
        default: string;
    };
}, {
    tooltip: any;
    tooltipVisible: import("vue").Ref<boolean>;
    showTooltip: import("vue").ComputedRef<boolean>;
    wrapperStyle: import("vue").ComputedRef<CSSStyleDeclaration>;
    formatValue: import("vue").ComputedRef<string | number>;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    onButtonDown: (event: MouseEvent | TouchEvent) => void;
    onLeftKeyDown: () => void;
    onRightKeyDown: () => void;
    setPosition: (newPosition: number) => Promise<void>;
    hovering: import("vue").Ref<boolean>;
    dragging: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue: unknown;
    vertical: boolean;
    tooltipClass: unknown;
} & {}>, {
    modelValue: unknown;
    vertical: boolean;
    tooltipClass: unknown;
}>;
export default _default;
