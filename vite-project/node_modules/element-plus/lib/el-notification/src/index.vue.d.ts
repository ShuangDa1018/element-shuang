import type { PropType } from 'vue';
import type { NotificationVM, Position } from './notification.type';
declare const _default: import("vue").DefineComponent<{
    customClass: {
        type: StringConstructor;
        default: string;
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    iconClass: {
        type: StringConstructor;
        default: string;
    };
    id: {
        type: StringConstructor;
        default: string;
    };
    message: {
        type: PropType<string | NotificationVM>;
        default: string;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    onClick: {
        type: PropType<() => void>;
        default: () => any;
    };
    onClose: {
        type: PropType<() => void>;
        required: true;
    };
    position: {
        type: PropType<Position>;
        default: string;
    };
    showClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}, {
    horizontalClass: import("vue").ComputedRef<"right" | "left">;
    typeClass: import("vue").ComputedRef<string>;
    positionStyle: import("vue").ComputedRef<{
        [x: string]: unknown;
        'z-index': unknown;
    }>;
    visible: import("vue").Ref<boolean>;
    close: () => void;
    clearTimer: () => void;
    startTimer: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "destroy"[], "destroy", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    customClass: unknown;
    dangerouslyUseHTMLString: boolean;
    duration: unknown;
    iconClass: unknown;
    id: unknown;
    message: unknown;
    offset: unknown;
    onClose: unknown;
    position: unknown;
    showClose: boolean;
    title: unknown;
    type: unknown;
    zIndex: unknown;
} & {
    onClick?: unknown;
}>, {
    customClass: unknown;
    dangerouslyUseHTMLString: boolean;
    duration: unknown;
    iconClass: unknown;
    id: unknown;
    message: unknown;
    offset: unknown;
    onClick: unknown;
    position: unknown;
    showClose: boolean;
    title: unknown;
    type: unknown;
    zIndex: unknown;
}>;
export default _default;
