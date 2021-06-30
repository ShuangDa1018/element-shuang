import { PropType, Ref } from 'vue';
import { Emitter } from 'mitt';
export interface CollapseProvider {
    activeNames: Ref;
    collapseMitt: Emitter;
}
declare const _default: import("vue").DefineComponent<{
    accordion: BooleanConstructor;
    modelValue: {
        type: PropType<string | number | (string | number)[]>;
        default: () => any[];
    };
}, {
    activeNames: Ref<any[]>;
    setActiveNames: (_activeNames: any) => void;
    handleItemClick: (name: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    accordion: boolean;
    modelValue: unknown;
} & {}>, {
    accordion: boolean;
    modelValue: unknown;
}>;
export default _default;
