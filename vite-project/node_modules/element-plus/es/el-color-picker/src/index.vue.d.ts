import type { PropType } from 'vue';
import type { ComputedRef } from '@vue/reactivity';
interface IUseOptions {
    currentColor: ComputedRef<string>;
}
export declare const useOptions: () => IUseOptions;
declare const _default: import("vue").DefineComponent<{
    modelValue: StringConstructor;
    showAlpha: BooleanConstructor;
    colorFormat: StringConstructor;
    disabled: BooleanConstructor;
    size: {
        type: PropType<ComponentSize>;
        validator: (val: string) => boolean;
    };
    popperClass: StringConstructor;
    predefine: ArrayConstructor;
}, {
    color: {
        enableAlpha: boolean;
        format: string;
        value: string;
        selected?: boolean;
        set: (prop: any, value?: number) => void;
        get: (prop: string) => any;
        toRgb: () => {
            r: number;
            g: number;
            b: number;
        };
        fromString: (value: any) => void;
        compare: (color: any) => boolean;
        doOnChange: () => void;
    };
    colorDisabled: ComputedRef<boolean>;
    colorSize: ComputedRef<any>;
    displayedColor: ComputedRef<string>;
    showPanelColor: import("vue").Ref<boolean>;
    showPicker: import("vue").Ref<boolean>;
    customInput: import("vue").Ref<string>;
    handleConfirm: () => void;
    hide: () => void;
    handleTrigger: () => void;
    clear: () => void;
    confirmValue: () => void;
    t: (...args: any[]) => string;
    hue: any;
    svPanel: any;
    alpha: any;
    popper: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "active-change" | "update:modelValue")[], "change" | "active-change" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    showAlpha: boolean;
    disabled: boolean;
} & {
    modelValue?: unknown;
    colorFormat?: unknown;
    size?: unknown;
    popperClass?: unknown;
    predefine?: unknown;
}>, {
    showAlpha: boolean;
    disabled: boolean;
}>;
export default _default;
