import { WritableComputedRef } from 'vue';
import type { ComputedRef } from 'vue';
import type { ElFormContext } from '../../el-form';
import type { RadioGroupContext } from './token';
export declare const useRadio: () => {
    isGroup: ComputedRef<boolean>;
    focus: import("vue").Ref<boolean>;
    radioGroup: RadioGroupContext;
    elForm: ElFormContext;
    ELEMENT: any;
    elFormItemSize: ComputedRef<any>;
};
interface IUseRadioAttrsProps {
    disabled?: boolean;
    label: string | number | boolean;
}
interface IUseRadioAttrsState {
    isGroup: ComputedRef<boolean>;
    radioGroup: RadioGroupContext;
    elForm: ElFormContext;
    model: WritableComputedRef<string | number | boolean>;
}
export declare const useRadioAttrs: (props: IUseRadioAttrsProps, { isGroup, radioGroup, elForm, model, }: IUseRadioAttrsState) => {
    isDisabled: ComputedRef<boolean>;
    tabIndex: ComputedRef<-1 | 0>;
};
export {};
