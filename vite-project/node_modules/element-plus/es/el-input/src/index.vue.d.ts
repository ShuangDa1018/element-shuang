import type { PropType } from 'vue';
declare type AutosizeProp = {
    minRows?: number;
    maxRows?: number;
} | boolean;
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: PropType<ComponentSize>;
        validator: (val: string) => boolean;
    };
    resize: {
        type: PropType<"none" | "both" | "horizontal" | "vertical">;
        validator: (val: string) => boolean;
    };
    autosize: {
        type: PropType<AutosizeProp>;
        default: boolean;
    };
    autocomplete: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    placeholder: {
        type: StringConstructor;
    };
    form: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showPassword: {
        type: BooleanConstructor;
        default: boolean;
    };
    showWordLimit: {
        type: BooleanConstructor;
        default: boolean;
    };
    suffixIcon: {
        type: StringConstructor;
        default: string;
    };
    prefixIcon: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
    };
    tabindex: {
        type: (StringConstructor | NumberConstructor)[];
    };
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    inputStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
}, {
    input: any;
    textarea: any;
    attrs: import("vue").Ref<{}>;
    inputSize: import("vue").ComputedRef<any>;
    validateState: import("vue").ComputedRef<string>;
    validateIcon: import("vue").ComputedRef<any>;
    computedTextareaStyle: import("vue").ComputedRef<{
        resize: unknown;
    }>;
    resizeTextarea: () => void;
    inputDisabled: import("vue").ComputedRef<boolean>;
    showClear: import("vue").ComputedRef<boolean>;
    showPwdVisible: import("vue").ComputedRef<boolean>;
    isWordLimitVisible: import("vue").ComputedRef<boolean>;
    upperLimit: import("vue").ComputedRef<unknown>;
    textLength: import("vue").ComputedRef<any>;
    hovering: import("vue").Ref<boolean>;
    inputExceed: import("vue").ComputedRef<boolean>;
    passwordVisible: import("vue").Ref<boolean>;
    inputOrTextarea: import("vue").ComputedRef<any>;
    handleInput: (event: any) => void;
    handleChange: (event: any) => void;
    handleFocus: (event: any) => void;
    handleBlur: (event: any) => void;
    handleCompositionStart: () => void;
    handleCompositionUpdate: (event: any) => void;
    handleCompositionEnd: (event: any) => void;
    handlePasswordVisible: () => void;
    clear: () => void;
    select: () => void;
    focus: () => void;
    blur: () => void;
    getSuffixVisible: () => unknown;
    onMouseLeave: (e: any) => void;
    onMouseEnter: (e: any) => void;
    handleKeydown: (e: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "input" | "change" | "focus" | "blur" | "clear" | "mouseleave" | "mouseenter" | "keydown")[], "update:modelValue" | "input" | "change" | "focus" | "blur" | "clear" | "mouseleave" | "mouseenter" | "keydown", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue: unknown;
    type: unknown;
    autosize: unknown;
    autocomplete: unknown;
    form: unknown;
    disabled: boolean;
    readonly: boolean;
    clearable: boolean;
    showPassword: boolean;
    showWordLimit: boolean;
    suffixIcon: unknown;
    prefixIcon: unknown;
    validateEvent: boolean;
    inputStyle: Record<string, any>;
} & {
    size?: unknown;
    resize?: unknown;
    placeholder?: unknown;
    label?: unknown;
    tabindex?: unknown;
}>, {
    modelValue: unknown;
    type: unknown;
    autosize: unknown;
    autocomplete: unknown;
    form: unknown;
    disabled: boolean;
    readonly: boolean;
    clearable: boolean;
    showPassword: boolean;
    showWordLimit: boolean;
    suffixIcon: unknown;
    prefixIcon: unknown;
    validateEvent: boolean;
    inputStyle: Record<string, any>;
}>;
export default _default;
