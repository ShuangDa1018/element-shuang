import { PropType } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
declare const _default: import("vue").DefineComponent<{
    visible: BooleanConstructor;
    actualVisible: {
        type: BooleanConstructor;
        default: any;
    };
    datetimeRole: {
        type: StringConstructor;
    };
    parsedValue: {
        type: PropType<string | dayjs.Dayjs>;
    };
    format: {
        type: StringConstructor;
        default: string;
    };
}, {
    transitionName: import("vue").ComputedRef<"" | "el-zoom-in-top">;
    arrowControl: any;
    onSetOption: (e: any) => void;
    t: (...args: any[]) => string;
    handleConfirm: (visible: boolean, first: any) => void;
    handleChange: (_date: Dayjs) => void;
    setSelectionRange: (start: any, end: any) => void;
    amPmMode: import("vue").ComputedRef<"" | "A" | "a">;
    showSeconds: import("vue").ComputedRef<any>;
    handleCancel: () => void;
    disabledHours: any;
    disabledMinutes: any;
    disabledSeconds: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("pick" | "select-range" | "set-picker-option")[], "pick" | "select-range" | "set-picker-option", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    visible: boolean;
    format: unknown;
} & {
    actualVisible?: boolean;
    datetimeRole?: unknown;
    parsedValue?: unknown;
}>, {
    visible: boolean;
    actualVisible: boolean;
    format: unknown;
}>;
export default _default;
