import type { PropType } from 'vue';
import type Color from '../color';
declare const _default: import("vue").DefineComponent<{
    color: {
        type: PropType<Color>;
        required: true;
    };
}, {
    cursorTop: import("vue").Ref<number>;
    cursorLeft: import("vue").Ref<number>;
    background: import("vue").Ref<string>;
    colorValue: import("vue").ComputedRef<{
        hue: any;
        value: any;
    }>;
    handleDrag: (event: any) => void;
    update: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color: unknown;
} & {}>, {}>;
export default _default;
