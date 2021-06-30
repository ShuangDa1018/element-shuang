import type { PropType } from 'vue';
declare type Hide = (cancel: boolean) => void;
declare type DrawerDirection = 'ltr' | 'rtl' | 'ttb' | 'btt';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    beforeClose: PropType<(hide: Hide) => void>;
    customClass: {
        type: StringConstructor;
        default: string;
    };
    direction: {
        type: PropType<DrawerDirection>;
        default: string;
        validator: (val: DrawerDirection) => boolean;
    };
    showClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    closeOnClickModal: {
        type: BooleanConstructor;
        default: boolean;
    };
    withHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    openDelay: {
        type: NumberConstructor;
        default: number;
    };
    closeDelay: {
        type: NumberConstructor;
        default: number;
    };
    zIndex: NumberConstructor;
    modal: {
        type: BooleanConstructor;
        default: boolean;
    };
    modalFade: {
        type: BooleanConstructor;
        default: boolean;
    };
    modalClass: StringConstructor;
    lockScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnPressEscape: {
        type: BooleanConstructor;
        default: boolean;
    };
    destroyOnClose: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    drawerRef: import("vue").Ref<HTMLElement>;
    isHorizontal: import("vue").ComputedRef<boolean>;
    drawerSize: import("vue").ComputedRef<unknown>;
    afterEnter: () => void;
    afterLeave: () => void;
    beforeLeave: () => void;
    handleClose: () => void;
    onModalClick: () => void;
    closed: import("vue").Ref<boolean>;
    dialogRef: any;
    style: import("vue").ComputedRef<import("vue").CSSProperties>;
    rendered: import("vue").Ref<boolean>;
    modalRef: import("vue").Ref<HTMLElement>;
    visible: import("vue").Ref<boolean>;
    zIndex: import("vue").Ref<number>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("open" | "opened" | "close" | "closed" | "update:modelValue")[], "open" | "opened" | "close" | "closed" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue: boolean;
    appendToBody: boolean;
    customClass: unknown;
    direction: unknown;
    showClose: boolean;
    size: unknown;
    title: unknown;
    closeOnClickModal: boolean;
    withHeader: boolean;
    openDelay: unknown;
    closeDelay: unknown;
    modal: boolean;
    modalFade: boolean;
    lockScroll: boolean;
    closeOnPressEscape: boolean;
    destroyOnClose: boolean;
} & {
    beforeClose?: unknown;
    zIndex?: unknown;
    modalClass?: unknown;
}>, {
    appendToBody: boolean;
    customClass: unknown;
    direction: unknown;
    showClose: boolean;
    size: unknown;
    title: unknown;
    closeOnClickModal: boolean;
    withHeader: boolean;
    openDelay: unknown;
    closeDelay: unknown;
    modal: boolean;
    modalFade: boolean;
    lockScroll: boolean;
    closeOnPressEscape: boolean;
    destroyOnClose: boolean;
}>;
export default _default;
