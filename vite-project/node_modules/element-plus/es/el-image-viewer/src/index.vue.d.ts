import { PropType } from 'vue';
export declare type ImageViewerAction = 'zoomIn' | 'zoomOut' | 'clocelise' | 'anticlocelise';
declare const _default: import("vue").DefineComponent<{
    urlList: {
        type: PropType<string[]>;
        default: any[];
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    initialIndex: {
        type: NumberConstructor;
        default: number;
    };
    infinite: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideOnClickModal: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    index: import("vue").Ref<unknown>;
    wrapper: any;
    img: any;
    isSingle: import("vue").ComputedRef<boolean>;
    isFirst: import("vue").ComputedRef<boolean>;
    isLast: import("vue").ComputedRef<boolean>;
    currentImg: import("vue").ComputedRef<any>;
    imgStyle: import("vue").ComputedRef<CSSStyleDeclaration>;
    mode: import("vue").Ref<{
        name: string;
        icon: string;
    }>;
    handleActions: (action: ImageViewerAction, options?: {}) => void;
    prev: () => void;
    next: () => void;
    hide: () => void;
    toggleMode: () => void;
    handleImgLoad: () => void;
    handleImgError: (e: any) => void;
    handleMouseDown: (e: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "switch")[], "close" | "switch", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    urlList: unknown;
    zIndex: unknown;
    initialIndex: unknown;
    infinite: boolean;
    hideOnClickModal: boolean;
} & {}>, {
    urlList: unknown;
    zIndex: unknown;
    initialIndex: unknown;
    infinite: boolean;
    hideOnClickModal: boolean;
}>;
export default _default;
