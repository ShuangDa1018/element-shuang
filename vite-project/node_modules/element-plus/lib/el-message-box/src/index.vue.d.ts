import { PropType } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import type { Action, MessageBoxState, MessageBoxType } from './message-box.type';
declare const _default: import("vue").DefineComponent<{
    buttonSize: {
        type: PropType<ComponentSize>;
        validator: (val: string) => boolean;
    };
    modal: {
        type: BooleanConstructor;
        default: boolean;
    };
    lockScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    showClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnClickModal: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnPressEscape: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnHashChange: {
        type: BooleanConstructor;
        default: boolean;
    };
    center: BooleanConstructor;
    roundButton: {
        default: boolean;
        type: BooleanConstructor;
    };
    container: {
        type: StringConstructor;
        default: string;
    };
    boxType: {
        type: PropType<MessageBoxType>;
        default: string;
    };
}, {
    visible: import("vue").Ref<boolean>;
    hasMessage: import("vue").ComputedRef<boolean>;
    icon: import("vue").ComputedRef<string>;
    confirmButtonClasses: import("vue").ComputedRef<string>;
    inputRef: import("vue").Ref<ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>>;
    confirmRef: import("vue").Ref<ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>>;
    doClose: () => void;
    handleClose: () => void;
    handleWrapperClick: () => void;
    handleInputEnter: () => void;
    handleAction: (action: Action) => void;
    t: (...args: any[]) => string;
    title: import("vue").Ref<string>;
    message: import("vue").Ref<string>;
    type: import("vue").Ref<import("./message-box.type").MessageType>;
    iconClass: import("vue").Ref<string>;
    customClass: import("vue").Ref<string>;
    showInput: import("vue").Ref<boolean>;
    inputValue: import("vue").Ref<string>;
    inputPlaceholder: import("vue").Ref<string>;
    inputType: import("vue").Ref<string>;
    inputPattern: import("vue").Ref<{
        exec: (string: string) => RegExpExecArray;
        test: (string: string) => boolean;
        readonly source: string;
        readonly global: boolean;
        readonly ignoreCase: boolean;
        readonly multiline: boolean;
        lastIndex: number;
        compile: () => RegExp;
        readonly flags: string;
        readonly sticky: boolean;
        readonly unicode: boolean;
        readonly dotAll: boolean;
    } & {
        [Symbol.match]: (string: string) => RegExpMatchArray;
    } & {
        [Symbol.matchAll]: (str: string) => IterableIterator<RegExpMatchArray>;
    } & {
        [Symbol.replace]: {
            (string: string, replaceValue: string): string;
            (string: string, replacer: (substring: string, ...args: any[]) => string): string;
        };
    } & {
        [Symbol.search]: (string: string) => number;
    } & {
        [Symbol.split]: (string: string, limit?: number) => string[];
    }>;
    inputValidator: import("vue").Ref<import("./message-box.type").MessageBoxInputValidator>;
    inputErrorMessage: import("vue").Ref<string>;
    showConfirmButton: import("vue").Ref<boolean>;
    showCancelButton: import("vue").Ref<boolean>;
    action: import("vue").Ref<Action>;
    dangerouslyUseHTMLString: import("vue").Ref<boolean>;
    confirmButtonText: import("vue").Ref<string>;
    cancelButtonText: import("vue").Ref<string>;
    confirmButtonLoading: import("vue").Ref<boolean>;
    cancelButtonLoading: import("vue").Ref<boolean>;
    confirmButtonClass: import("vue").Ref<string>;
    confirmButtonDisabled: import("vue").Ref<boolean>;
    cancelButtonClass: import("vue").Ref<string>;
    editorErrorMessage: import("vue").Ref<string>;
    beforeClose: import("vue").Ref<(action: Action, instance: MessageBoxState, done: () => void) => void>;
    callback: import("vue").Ref<import("./message-box.type").Callback>;
    distinguishCancelAndClose: import("vue").Ref<boolean>;
    modalFade: import("vue").Ref<boolean>;
    modalClass: import("vue").Ref<string>;
    validateError: import("vue").Ref<boolean>;
    zIndex: import("vue").Ref<number>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("vanish" | "action")[], "vanish" | "action", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modal: boolean;
    lockScroll: boolean;
    showClose: boolean;
    closeOnClickModal: boolean;
    closeOnPressEscape: boolean;
    closeOnHashChange: boolean;
    center: boolean;
    roundButton: boolean;
    container: unknown;
    boxType: unknown;
} & {
    buttonSize?: unknown;
}>, {
    modal: boolean;
    lockScroll: boolean;
    showClose: boolean;
    closeOnClickModal: boolean;
    closeOnPressEscape: boolean;
    closeOnHashChange: boolean;
    center: boolean;
    roundButton: boolean;
    container: unknown;
    boxType: unknown;
}>;
export default _default;
