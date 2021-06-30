import { PropType } from 'vue';
import Color from '../color';
declare const _default: import("vue").DefineComponent<{
    colors: {
        type: ArrayConstructor;
        required: true;
    };
    color: {
        type: PropType<Color>;
        required: true;
    };
}, {
    rgbaColors: any;
    handleSelect: (index: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    colors: unknown;
    color: unknown;
} & {}>, {}>;
export default _default;
