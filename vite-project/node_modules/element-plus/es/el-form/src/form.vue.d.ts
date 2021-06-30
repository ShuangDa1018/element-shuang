import { PropType } from 'vue';
import { ValidateFieldCallback } from './token';
import { FieldErrorList } from 'async-validator';
interface Callback {
    (isValid?: boolean, invalidFields?: FieldErrorList): void;
}
declare const _default: import("vue").DefineComponent<{
    model: ObjectConstructor;
    rules: ObjectConstructor;
    labelPosition: StringConstructor;
    labelWidth: StringConstructor;
    labelSuffix: {
        type: StringConstructor;
        default: string;
    };
    inline: BooleanConstructor;
    inlineMessage: BooleanConstructor;
    statusIcon: BooleanConstructor;
    showMessage: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: PropType<ComponentSize>;
    disabled: BooleanConstructor;
    validateOnRuleChange: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideRequiredAsterisk: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    validate: (callback?: Callback) => Promise<boolean>;
    resetFields: () => void;
    clearValidate: (props?: string | string[]) => void;
    validateField: (props: string | string[], cb: ValidateFieldCallback) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "validate"[], "validate", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    labelSuffix: unknown;
    inline: boolean;
    inlineMessage: boolean;
    statusIcon: boolean;
    showMessage: boolean;
    disabled: boolean;
    validateOnRuleChange: boolean;
    hideRequiredAsterisk: boolean;
} & {
    model?: Record<string, any>;
    rules?: Record<string, any>;
    labelPosition?: unknown;
    labelWidth?: unknown;
    size?: unknown;
}>, {
    labelSuffix: unknown;
    inline: boolean;
    inlineMessage: boolean;
    statusIcon: boolean;
    showMessage: boolean;
    disabled: boolean;
    validateOnRuleChange: boolean;
    hideRequiredAsterisk: boolean;
}>;
export default _default;
