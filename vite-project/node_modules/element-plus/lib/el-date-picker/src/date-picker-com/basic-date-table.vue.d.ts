import { PropType } from 'vue';
import dayjs from 'dayjs';
declare const _default: import("vue").DefineComponent<{
    date: {
        type: PropType<dayjs.Dayjs>;
    };
    minDate: {
        type: PropType<dayjs.Dayjs>;
    };
    maxDate: {
        type: PropType<dayjs.Dayjs>;
    };
    parsedValue: {
        type: PropType<dayjs.Dayjs | dayjs.Dayjs[]>;
    };
    selectionMode: {
        type: StringConstructor;
        default: string;
    };
    showWeekNumber: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabledDate: {
        type: FunctionConstructor;
    };
    cellClassName: {
        type: FunctionConstructor;
    };
    rangeState: {
        type: ObjectConstructor;
        default: () => {
            endDate: any;
            selecting: boolean;
        };
    };
}, {
    handleMouseMove: (event: any) => void;
    t: (...args: any[]) => string;
    rows: import("vue").ComputedRef<any[][]>;
    isWeekActive: (cell: any) => any;
    getCellClasses: (cell: any) => string;
    WEEKS: import("vue").ComputedRef<any>;
    handleClick: (event: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("changerange" | "pick" | "select")[], "changerange" | "pick" | "select", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    selectionMode: unknown;
    showWeekNumber: boolean;
    rangeState: Record<string, any>;
} & {
    date?: unknown;
    minDate?: unknown;
    maxDate?: unknown;
    parsedValue?: unknown;
    disabledDate?: unknown;
    cellClassName?: unknown;
}>, {
    selectionMode: unknown;
    showWeekNumber: boolean;
    rangeState: Record<string, any>;
}>;
export default _default;
