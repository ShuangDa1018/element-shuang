import { PropType } from 'vue';
declare type Position = 'top' | 'bottom';
declare const _default: import("vue").DefineComponent<{
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    target: {
        type: StringConstructor;
        default: string;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    position: {
        type: PropType<Position>;
        default: string;
    };
}, {
    root: any;
    state: {
        fixed: boolean;
        height: number;
        width: number;
        scrollTop: number;
        clientHeight: number;
        transform: number;
    };
    rootStyle: import("vue").ComputedRef<{
        height: string;
        width: string;
    }>;
    affixStyle: import("vue").ComputedRef<{
        height: string;
        width: string;
        top: string | number;
        bottom: string | number;
        transform: string;
        zIndex: unknown;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("scroll" | "change")[], "scroll" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    zIndex: unknown;
    target: unknown;
    offset: unknown;
    position: unknown;
} & {}>, {
    zIndex: unknown;
    target: unknown;
    offset: unknown;
    position: unknown;
}>;
export default _default;
