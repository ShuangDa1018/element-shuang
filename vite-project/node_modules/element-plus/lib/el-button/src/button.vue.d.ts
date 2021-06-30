import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    type: {
        type: PropType<"primary" | "success" | "warning" | "danger" | "info" | "text" | "default">;
        default: string;
        validator: (val: string) => boolean;
    };
    size: {
        type: PropType<ComponentSize>;
        validator: (val: string) => boolean;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
    nativeType: {
        type: PropType<"button" | "submit" | "reset">;
        default: string;
        validator: (val: string) => boolean;
    };
    loading: BooleanConstructor;
    disabled: BooleanConstructor;
    plain: BooleanConstructor;
    autofocus: BooleanConstructor;
    round: BooleanConstructor;
    circle: BooleanConstructor;
}, {
    buttonSize: import("vue").ComputedRef<any>;
    buttonDisabled: import("vue").ComputedRef<boolean>;
    handleClick: (evt: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type: unknown;
    icon: unknown;
    nativeType: unknown;
    loading: boolean;
    disabled: boolean;
    plain: boolean;
    autofocus: boolean;
    round: boolean;
    circle: boolean;
} & {
    size?: unknown;
}>, {
    type: unknown;
    icon: unknown;
    nativeType: unknown;
    loading: boolean;
    disabled: boolean;
    plain: boolean;
    autofocus: boolean;
    round: boolean;
    circle: boolean;
}>;
export default _default;
