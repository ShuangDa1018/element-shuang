import type { Option } from './select.types';
declare const _default: import("vue").DefineComponent<{
    data: ArrayConstructor;
    hoveringIndex: NumberConstructor;
    width: NumberConstructor;
}, {
    select: import("./token").SelectContext;
    listProps: import("vue").ComputedRef<{
        itemSize: unknown;
        estimatedSize?: undefined;
    } | {
        estimatedSize: unknown;
        itemSize: (idx: number) => number;
    }>;
    listRef: any;
    isSized: import("vue").ComputedRef<boolean>;
    isItemDisabled: (modelValue: any[] | any, selected: boolean) => boolean;
    isItemHovering: (target: number) => boolean;
    isItemSelected: (modelValue: any[] | any, target: Option) => boolean;
    scrollToItem: (index: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    data?: unknown;
    hoveringIndex?: unknown;
    width?: unknown;
}>, {}>;
export default _default;
