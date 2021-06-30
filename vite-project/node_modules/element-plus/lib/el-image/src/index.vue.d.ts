import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideOnClickModal: {
        type: BooleanConstructor;
        default: boolean;
    };
    src: {
        type: StringConstructor;
        default: string;
    };
    fit: {
        type: StringConstructor;
        default: string;
    };
    lazy: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollContainer: {
        type: (ObjectConstructor | StringConstructor)[];
        default: any;
    };
    previewSrcList: {
        type: PropType<string[]>;
        default: () => string[];
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}, {
    attrs: import("vue").Ref<{}>;
    loading: import("vue").Ref<boolean>;
    hasLoadError: import("vue").Ref<boolean>;
    showViewer: import("vue").Ref<boolean>;
    imgWidth: import("vue").Ref<number>;
    imgHeight: import("vue").Ref<number>;
    imageStyle: import("vue").ComputedRef<{
        width?: undefined;
        height?: undefined;
    } | {
        width: string;
        height: string;
    } | {
        width: string;
        height?: undefined;
    } | {
        height: string;
        width?: undefined;
    } | {
        'object-fit': unknown;
    }>;
    alignCenter: import("vue").ComputedRef<boolean>;
    preview: import("vue").ComputedRef<boolean>;
    imageIndex: import("vue").ComputedRef<number>;
    clickHandler: () => void;
    closeViewer: () => void;
    container: import("vue").Ref<HTMLElement>;
    handleError: (e: Event) => void;
    t: (...args: any[]) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "error"[], "error", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    appendToBody: boolean;
    hideOnClickModal: boolean;
    src: unknown;
    fit: unknown;
    lazy: boolean;
    previewSrcList: unknown;
    zIndex: unknown;
} & {
    scrollContainer?: unknown;
}>, {
    appendToBody: boolean;
    hideOnClickModal: boolean;
    src: unknown;
    fit: unknown;
    lazy: boolean;
    scrollContainer: unknown;
    previewSrcList: unknown;
    zIndex: unknown;
}>;
export default _default;
