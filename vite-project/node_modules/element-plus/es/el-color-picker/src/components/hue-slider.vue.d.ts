import type { PropType } from 'vue';
import type Color from '../color';
declare const _default: import("vue").DefineComponent<{
    color: {
        type: PropType<Color>;
        required: true;
    };
    vertical: BooleanConstructor;
}, {
    bar: import("vue").Ref<HTMLElement>;
    thumb: import("vue").Ref<HTMLElement>;
    thumbLeft: import("vue").Ref<number>;
    thumbTop: import("vue").Ref<number>;
    hueValue: import("vue").ComputedRef<any>;
    handleClick: (event: Event) => void;
    update: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color: unknown;
    vertical: boolean;
} & {}>, {
    vertical: boolean;
}>;
export default _default;
