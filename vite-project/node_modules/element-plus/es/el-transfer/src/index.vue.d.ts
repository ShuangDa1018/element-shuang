import type { PropType, VNode } from 'vue';
import type { DataItem, Format, Props, TargetOrder } from './transfer';
export declare const CHANGE_EVENT = "change";
declare const _default: import("vue").DefineComponent<{
    data: {
        type: PropType<DataItem[]>;
        default: () => any[];
    };
    titles: {
        type: PropType<[string, string]>;
        default: () => any[];
    };
    buttonTexts: {
        type: PropType<[string, string]>;
        default: () => any[];
    };
    filterPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    filterMethod: PropType<(query: string, item: DataItem) => boolean>;
    leftDefaultChecked: {
        type: PropType<(string | number)[]>;
        default: () => any[];
    };
    rightDefaultChecked: {
        type: PropType<(string | number)[]>;
        default: () => any[];
    };
    renderContent: PropType<(h: any, option: any) => VNode>;
    modelValue: {
        type: PropType<(string | number)[]>;
        default: () => any[];
    };
    format: {
        type: PropType<Format>;
        default: () => {};
    };
    filterable: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: PropType<Props>;
        default: () => {
            label: string;
            key: string;
            disabled: string;
        };
    };
    targetOrder: {
        type: PropType<TargetOrder>;
        default: string;
        validator: (val: string) => boolean;
    };
}, {
    hasButtonTexts: import("vue").ComputedRef<boolean>;
    leftPanelTitle: import("vue").ComputedRef<any>;
    rightPanelTitle: import("vue").ComputedRef<any>;
    panelFilterPlaceholder: import("vue").ComputedRef<unknown>;
    clearQuery: (which: 'left' | 'right') => void;
    optionRender: import("vue").ComputedRef<(option: any) => any>;
    leftChecked: import("vue").Ref<any[]>;
    rightChecked: import("vue").Ref<any[]>;
    sourceData: import("vue").ComputedRef<DataItem[]>;
    targetData: import("vue").ComputedRef<any[]>;
    onSourceCheckedChange: (val: (string | number)[], movedKeys: (string | number)[]) => void;
    onTargetCheckedChange: (val: (string | number)[], movedKeys: (string | number)[]) => void;
    addToLeft: () => void;
    addToRight: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue" | "left-check-change" | "right-check-change")[], "change" | "update:modelValue" | "left-check-change" | "right-check-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    data: unknown;
    titles: unknown;
    buttonTexts: unknown;
    filterPlaceholder: unknown;
    leftDefaultChecked: unknown;
    rightDefaultChecked: unknown;
    modelValue: unknown;
    format: unknown;
    filterable: boolean;
    props: unknown;
    targetOrder: unknown;
} & {
    filterMethod?: unknown;
    renderContent?: unknown;
}>, {
    data: unknown;
    titles: unknown;
    buttonTexts: unknown;
    filterPlaceholder: unknown;
    leftDefaultChecked: unknown;
    rightDefaultChecked: unknown;
    modelValue: unknown;
    format: unknown;
    filterable: boolean;
    props: unknown;
    targetOrder: unknown;
}>;
export default _default;
