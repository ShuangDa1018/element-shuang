declare const _default: import("vue").DefineComponent<{
    visibilityHeight: {
        type: NumberConstructor;
        default: number;
    };
    target: {
        type: StringConstructor;
        default: string;
    };
    right: {
        type: NumberConstructor;
        default: number;
    };
    bottom: {
        type: NumberConstructor;
        default: number;
    };
}, {
    el: any;
    container: any;
    visible: import("vue").Ref<boolean>;
    styleBottom: import("vue").ComputedRef<string>;
    styleRight: import("vue").ComputedRef<string>;
    handleClick: (event: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    visibilityHeight: unknown;
    target: unknown;
    right: unknown;
    bottom: unknown;
} & {}>, {
    visibilityHeight: unknown;
    target: unknown;
    right: unknown;
    bottom: unknown;
}>;
export default _default;
