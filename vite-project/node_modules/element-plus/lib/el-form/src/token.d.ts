import type { InjectionKey } from 'vue';
import type { Emitter } from 'mitt';
import type { FieldErrorList } from 'async-validator';
export interface ElFormContext {
    registerLabelWidth(width: number, oldWidth: number): void;
    deregisterLabelWidth(width: number): void;
    autoLabelWidth: string | undefined;
    formMitt: Emitter;
    emit: (evt: string, ...args: any[]) => void;
    labelSuffix: string;
    inline?: boolean;
    model?: Record<string, unknown>;
    size?: string;
    showMessage?: boolean;
    labelPosition?: string;
    labelWidth?: string;
    rules?: Record<string, unknown>;
    statusIcon?: boolean;
    hideRequiredAsterisk?: boolean;
    disabled?: boolean;
}
export interface ValidateFieldCallback {
    (isValid?: boolean, invalidFields?: FieldErrorList): void;
}
export interface ElFormItemContext {
    prop?: string;
    formItemMitt: Emitter;
    size: ComponentSize;
    validateState: string;
    validate(callback?: ValidateFieldCallback): void;
    updateComputedLabelWidth(width: number): void;
    addValidateEvents(): void;
    removeValidateEvents(): void;
    resetField(): void;
    clearValidate(): void;
}
export declare const elFormKey: InjectionKey<ElFormContext>;
export declare const elFormItemKey: InjectionKey<ElFormItemContext>;
export declare const elFormEvents: {
    readonly addField: "el.form.addField";
    readonly removeField: "el.form.removeField";
};
