import dayjs from 'dayjs';
import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    disabledDate: {
        type: PropType<(_: Date) => void>;
    };
    selectionMode: {
        type: StringConstructor;
        default: string;
    };
    minDate: {
        type: PropType<dayjs.Dayjs>;
    };
    maxDate: {
        type: PropType<dayjs.Dayjs>;
    };
    date: {
        type: PropType<dayjs.Dayjs>;
    };
    parsedValue: {
        type: PropType<dayjs.Dayjs>;
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
    handleMonthTableClick: (event: any) => void;
    rows: import("vue").ComputedRef<any[][]>;
    getCellStyle: (cell: any) => any;
    t: (...args: any[]) => string;
    months: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("changerange" | "pick" | "select")[], "changerange" | "pick" | "select", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    selectionMode: unknown;
    rangeState: Record<string, any>;
} & {
    disabledDate?: unknown;
    minDate?: unknown;
    maxDate?: unknown;
    date?: unknown;
    parsedValue?: unknown;
}>, {
    selectionMode: unknown;
    rangeState: Record<string, any>;
}>;
export default _default;
