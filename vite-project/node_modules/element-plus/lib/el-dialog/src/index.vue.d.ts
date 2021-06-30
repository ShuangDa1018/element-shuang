import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    beforeClose: {
        type: PropType<(...args: any[]) => unknown>;
    };
    destroyOnClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    center: {
        type: BooleanConstructor;
        default: boolean;
    };
    customClass: {
        type: StringConstructor;
        default: string;
    };
    closeOnClickModal: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnPressEscape: {
        type: BooleanConstructor;
        default: boolean;
    };
    fullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    lockScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    modal: {
        type: BooleanConstructor;
        default: boolean;
    };
    showClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    openDelay: {
        type: NumberConstructor;
        default: number;
    };
    closeDelay: {
        type: NumberConstructor;
        default: number;
    };
    top: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    modalClass: StringConstructor;
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
        validator: (val: string | number) => boolean;
    };
    zIndex: {
        type: NumberConstructor;
    };
}, {
    dialogRef: import("vue").Ref<HTMLElement>;
    afterEnter: () => void;
    afterLeave: () => void;
    beforeLeave: () => void;
    handleClose: () => void;
    onModalClick: () => void;
    closed: import("vue").Ref<boolean>;
    style: import("vue").ComputedRef<import("vue").CSSProperties>;
    rendered: import("vue").Ref<boolean>;
    modalRef: import("vue").Ref<HTMLElement>;
    visible: import("vue").Ref<boolean>;
    zIndex: import("vue").Ref<number>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("open" | "opened" | "close" | "closed" | "update:modelValue")[], "open" | "opened" | "close" | "closed" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    appendToBody: boolean;
    destroyOnClose: boolean;
    center: boolean;
    customClass: unknown;
    closeOnClickModal: boolean;
    closeOnPressEscape: boolean;
    fullscreen: boolean;
    lockScroll: boolean;
    modal: boolean;
    showClose: boolean;
    title: unknown;
    openDelay: unknown;
    closeDelay: unknown;
    top: unknown;
    modelValue: boolean;
    width: unknown;
} & {
    beforeClose?: unknown;
    modalClass?: unknown;
    zIndex?: unknown;
}>, {
    appendToBody: boolean;
    destroyOnClose: boolean;
    center: boolean;
    customClass: unknown;
    closeOnClickModal: boolean;
    closeOnPressEscape: boolean;
    fullscreen: boolean;
    lockScroll: boolean;
    modal: boolean;
    showClose: boolean;
    title: unknown;
    openDelay: unknown;
    closeDelay: unknown;
    top: unknown;
    width: unknown;
}>;
export default _default;
