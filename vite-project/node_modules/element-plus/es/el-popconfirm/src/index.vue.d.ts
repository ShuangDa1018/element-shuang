declare const _default: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
    };
    confirmButtonText: {
        type: StringConstructor;
    };
    cancelButtonText: {
        type: StringConstructor;
    };
    confirmButtonType: {
        type: StringConstructor;
        default: string;
    };
    cancelButtonType: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
    iconColor: {
        type: StringConstructor;
        default: string;
    };
    hideIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    visible: import("vue").Ref<boolean>;
    confirm: () => void;
    cancel: () => void;
    confirmButtonText_: import("vue").ComputedRef<unknown>;
    cancelButtonText_: import("vue").ComputedRef<unknown>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("confirm" | "cancel")[], "confirm" | "cancel", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    confirmButtonType: unknown;
    cancelButtonType: unknown;
    icon: unknown;
    iconColor: unknown;
    hideIcon: boolean;
} & {
    title?: unknown;
    confirmButtonText?: unknown;
    cancelButtonText?: unknown;
}>, {
    confirmButtonType: unknown;
    cancelButtonType: unknown;
    icon: unknown;
    iconColor: unknown;
    hideIcon: boolean;
}>;
export default _default;
