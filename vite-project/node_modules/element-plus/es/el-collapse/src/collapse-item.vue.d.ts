import { PropType } from 'vue';
import { CollapseProvider } from './collapse';
declare const _default: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: PropType<string | number>;
        default: () => number;
    };
    disabled: BooleanConstructor;
}, {
    isActive: import("vue").ComputedRef<boolean>;
    contentWrapStyle: import("vue").Ref<{
        height: string;
        display: string;
    }>;
    contentHeight: import("vue").Ref<number>;
    focusing: import("vue").Ref<boolean>;
    isClick: import("vue").Ref<boolean>;
    id: import("vue").Ref<number>;
    handleFocus: () => void;
    handleHeaderClick: () => void;
    handleEnterClick: () => void;
    collapse: CollapseProvider;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    title: unknown;
    name: unknown;
    disabled: boolean;
} & {}>, {
    title: unknown;
    name: unknown;
    disabled: boolean;
}>;
export default _default;
