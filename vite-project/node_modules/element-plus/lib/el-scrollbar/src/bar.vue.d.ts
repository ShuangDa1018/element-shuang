import { Ref } from 'vue';
declare const _default: import("vue").DefineComponent<{
    vertical: BooleanConstructor;
    size: StringConstructor;
    move: NumberConstructor;
}, {
    instance: any;
    thumb: any;
    bar: import("vue").ComputedRef<{
        offset: string;
        scroll: string;
        scrollSize: string;
        size: string;
        key: string;
        axis: string;
        client: string;
        direction: string;
    } | {
        offset: string;
        scroll: string;
        scrollSize: string;
        size: string;
        key: string;
        axis: string;
        client: string;
        direction: string;
    }>;
    clickTrackHandler: (e: any) => void;
    clickThumbHandler: (e: MouseEvent) => void;
    thumbStyle: import("vue").ComputedRef<any>;
    visible: Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    vertical: boolean;
} & {
    size?: unknown;
    move?: unknown;
}>, {
    vertical: boolean;
}>;
export default _default;
