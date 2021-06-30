import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    valueKey: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    debounce: {
        type: NumberConstructor;
        default: number;
    };
    placement: {
        type: StringConstructor;
        validator: (val: string) => boolean;
        default: string;
    };
    fetchSuggestions: {
        type: PropType<(queryString: string, cb: (data: any[]) => void) => void>;
        default: () => void;
    };
    popperClass: {
        type: StringConstructor;
        default: string;
    };
    triggerOnFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectWhenUnmatched: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    popperAppendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    highlightFirstItem: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    attrs: import("vue").Ref<{}>;
    suggestions: import("vue").Ref<any[]>;
    highlightedIndex: import("vue").Ref<number>;
    dropdownWidth: import("vue").Ref<string>;
    activated: import("vue").Ref<boolean>;
    suggestionDisabled: import("vue").Ref<boolean>;
    loading: import("vue").Ref<boolean>;
    inputRef: any;
    regionRef: any;
    popper: any;
    id: import("vue").ComputedRef<string>;
    suggestionVisible: import("vue").ComputedRef<boolean>;
    suggestionLoading: import("vue").ComputedRef<boolean>;
    getData: (queryString: any) => void;
    handleInput: (value: any) => void;
    handleChange: (value: any) => void;
    handleFocus: (e: any) => void;
    handleBlur: (e: any) => void;
    handleClear: () => void;
    handleKeyEnter: () => void;
    close: () => void;
    focus: () => void;
    select: (item: any) => void;
    highlight: (index: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "input" | "change" | "focus" | "blur" | "clear" | "select")[], "update:modelValue" | "input" | "change" | "focus" | "blur" | "clear" | "select", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    valueKey: unknown;
    modelValue: unknown;
    debounce: unknown;
    placement: unknown;
    fetchSuggestions: unknown;
    popperClass: unknown;
    triggerOnFocus: boolean;
    selectWhenUnmatched: boolean;
    hideLoading: boolean;
    popperAppendToBody: boolean;
    highlightFirstItem: boolean;
} & {}>, {
    valueKey: unknown;
    modelValue: unknown;
    debounce: unknown;
    placement: unknown;
    fetchSuggestions: unknown;
    popperClass: unknown;
    triggerOnFocus: boolean;
    selectWhenUnmatched: boolean;
    hideLoading: boolean;
    popperAppendToBody: boolean;
    highlightFirstItem: boolean;
}>;
export default _default;
