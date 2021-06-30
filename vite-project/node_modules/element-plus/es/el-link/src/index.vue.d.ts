import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    type: {
        type: PropType<"primary" | "success" | "warning" | "info" | "danger" | "default">;
        default: string;
        validator: (val: string) => boolean;
    };
    underline: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    href: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
}, {
    handleClick: (event: Event) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type: unknown;
    underline: boolean;
    disabled: boolean;
    href: unknown;
    icon: unknown;
} & {}>, {
    type: unknown;
    underline: boolean;
    disabled: boolean;
    href: unknown;
    icon: unknown;
}>;
export default _default;
