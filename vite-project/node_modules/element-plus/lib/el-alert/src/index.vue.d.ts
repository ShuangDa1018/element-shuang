import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    description: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: PropType<"success" | "info" | "error" | "warning">;
        default: string;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeText: {
        type: StringConstructor;
        default: string;
    };
    showIcon: BooleanConstructor;
    center: BooleanConstructor;
    effect: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}, {
    visible: import("vue").Ref<boolean>;
    typeClass: import("vue").ComputedRef<string>;
    iconClass: import("vue").ComputedRef<any>;
    isBigIcon: import("vue").ComputedRef<"" | "is-big">;
    isBoldTitle: import("vue").ComputedRef<"" | "is-bold">;
    close: (evt: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "close"[], "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    title: unknown;
    description: unknown;
    type: unknown;
    closable: boolean;
    closeText: unknown;
    showIcon: boolean;
    center: boolean;
    effect: unknown;
} & {}>, {
    title: unknown;
    description: unknown;
    type: unknown;
    closable: boolean;
    closeText: unknown;
    showIcon: boolean;
    center: boolean;
    effect: unknown;
}>;
export default _default;
