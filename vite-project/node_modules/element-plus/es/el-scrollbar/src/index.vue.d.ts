import type { CSSProperties, PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    maxHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    native: {
        type: BooleanConstructor;
        default: boolean;
    };
    wrapStyle: {
        type: PropType<string | CSSProperties[]>;
        default: string;
    };
    wrapClass: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    viewClass: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    viewStyle: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    noresize: BooleanConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
}, {
    moveX: import("vue").Ref<number>;
    moveY: import("vue").Ref<number>;
    sizeWidth: import("vue").Ref<string>;
    sizeHeight: import("vue").Ref<string>;
    style: import("vue").ComputedRef<unknown>;
    scrollbar: any;
    wrap: any;
    resize: any;
    update: () => void;
    handleScroll: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "scroll"[], "scroll", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    height: unknown;
    maxHeight: unknown;
    native: boolean;
    wrapStyle: unknown;
    wrapClass: unknown;
    viewClass: unknown;
    viewStyle: unknown;
    noresize: boolean;
    tag: unknown;
} & {}>, {
    height: unknown;
    maxHeight: unknown;
    native: boolean;
    wrapStyle: unknown;
    wrapClass: unknown;
    viewClass: unknown;
    viewStyle: unknown;
    noresize: boolean;
    tag: unknown;
}>;
export default _default;
