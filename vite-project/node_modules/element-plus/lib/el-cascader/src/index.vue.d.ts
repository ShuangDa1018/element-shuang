import { Ref } from 'vue';
import type { ComputedRef, PropType } from 'vue';
import type { CascaderValue, CascaderNode, Tag } from '../../el-cascader-panel';
declare const _default: import("vue").DefineComponent<{
    size: {
        type: PropType<ComponentSize>;
        validator: (val: string) => boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: () => string;
    };
    disabled: BooleanConstructor;
    clearable: BooleanConstructor;
    filterable: BooleanConstructor;
    filterMethod: {
        type: PropType<(node: CascaderNode, keyword: string) => boolean>;
        default: (node: CascaderNode, keyword: string) => boolean;
    };
    separator: {
        type: StringConstructor;
        default: string;
    };
    showAllLevels: {
        type: BooleanConstructor;
        default: boolean;
    };
    collapseTags: BooleanConstructor;
    debounce: {
        type: NumberConstructor;
        default: number;
    };
    beforeFilter: {
        type: PropType<(value: string) => boolean | Promise<any>>;
        default: () => boolean;
    };
    popperClass: {
        type: StringConstructor;
        default: string;
    };
    modelValue: PropType<CascaderValue>;
    options: {
        type: PropType<import("../../el-cascader-panel").CascaderOption[]>;
        default: () => import("../../el-cascader-panel").CascaderOption[];
    };
    props: {
        type: PropType<import("../../el-cascader-panel").CascaderProps>;
        default: () => import("../../el-cascader-panel").CascaderProps;
    };
}, {
    popperOptions: {
        modifiers: {
            name: string;
            enabled: boolean;
            phase: string;
            fn: ({ state }: {
                state: any;
            }) => void;
            requires: string[];
        }[];
    };
    popper: any;
    popperPaneRef: ComputedRef<any>;
    input: any;
    tagWrapper: any;
    panel: any;
    suggestionPanel: any;
    popperVisible: Ref<boolean>;
    inputHover: Ref<boolean>;
    filtering: Ref<boolean>;
    presentText: ComputedRef<string>;
    checkedValue: import("vue").WritableComputedRef<unknown>;
    inputValue: Ref<string>;
    searchInputValue: Ref<string>;
    presentTags: Ref<Tag[]>;
    suggestions: Ref<CascaderNode[]>;
    isDisabled: ComputedRef<boolean>;
    realSize: ComputedRef<string>;
    tagSize: ComputedRef<"small" | "mini">;
    multiple: ComputedRef<boolean>;
    readonly: ComputedRef<boolean>;
    clearBtnVisible: ComputedRef<boolean>;
    t: (...args: any[]) => string;
    togglePopperVisible: (visible?: boolean) => void;
    hideSuggestionPanel: () => void;
    deleteTag: (tag: Tag) => void;
    focusFirstNode: () => void;
    getCheckedNodes: (leafOnly: boolean) => any;
    handleExpandChange: (value: CascaderValue) => void;
    handleKeyDown: (e: KeyboardEvent) => void;
    handleClear: () => void;
    handleSuggestionClick: (node: CascaderNode) => void;
    handleDelete: () => void;
    handleInput: (val: string, e: KeyboardEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "focus" | "blur" | "visible-change" | "expand-change" | "remove-tag")[], "update:modelValue" | "change" | "focus" | "blur" | "visible-change" | "expand-change" | "remove-tag", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    placeholder: unknown;
    disabled: boolean;
    clearable: boolean;
    filterable: boolean;
    filterMethod: unknown;
    separator: unknown;
    showAllLevels: boolean;
    collapseTags: boolean;
    debounce: unknown;
    beforeFilter: unknown;
    popperClass: unknown;
    options: unknown;
    props: unknown;
} & {
    size?: unknown;
    modelValue?: unknown;
}>, {
    placeholder: unknown;
    disabled: boolean;
    clearable: boolean;
    filterable: boolean;
    filterMethod: unknown;
    separator: unknown;
    showAllLevels: boolean;
    collapseTags: boolean;
    debounce: unknown;
    beforeFilter: unknown;
    popperClass: unknown;
    options: unknown;
    props: unknown;
}>;
export default _default;
