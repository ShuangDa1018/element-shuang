import dayjs, { Dayjs } from 'dayjs';
import { PropType } from 'vue';
import type { IDatePickerType } from '../date-picker.type';
declare const _default: import("vue").DefineComponent<{
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    parsedValue: {
        type: PropType<dayjs.Dayjs | dayjs.Dayjs[]>;
    };
    format: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: PropType<IDatePickerType>;
        required: true;
        validator: (val: string) => boolean;
    };
}, {
    handleTimePick: (value: any, visible: any, first: any) => void;
    handleTimePickClose: () => void;
    onTimePickerInputFocus: () => void;
    timePickerVisible: import("vue").Ref<boolean>;
    visibleTime: import("vue").ComputedRef<any>;
    visibleDate: import("vue").ComputedRef<any>;
    showTime: import("vue").ComputedRef<boolean>;
    changeToNow: () => void;
    onConfirm: () => void;
    footerVisible: import("vue").ComputedRef<boolean>;
    handleYearPick: (year: any) => void;
    showMonthPicker: () => void;
    showYearPicker: () => void;
    handleMonthPick: (month: any) => void;
    hasShortcuts: import("vue").ComputedRef<boolean>;
    shortcuts: any;
    arrowControl: any;
    disabledDate: any;
    cellClassName: any;
    selectionMode: import("vue").ComputedRef<unknown>;
    handleShortcutClick: (shortcut: any) => void;
    prevYear_: () => void;
    nextYear_: () => void;
    prevMonth_: () => void;
    nextMonth_: () => void;
    innerDate: import("vue").Ref<{
        clone: () => dayjs.Dayjs;
        isValid: () => boolean;
        year: {
            (): number;
            (value: number): dayjs.Dayjs;
        };
        month: {
            (): number;
            (value: number): dayjs.Dayjs;
        };
        date: {
            (): number;
            (value: number): dayjs.Dayjs;
        };
        day: {
            (): number;
            (value: number): dayjs.Dayjs;
        };
        hour: {
            (): number;
            (value: number): dayjs.Dayjs;
        };
        minute: {
            (): number;
            (value: number): dayjs.Dayjs;
        };
        second: {
            (): number;
            (value: number): dayjs.Dayjs;
        };
        millisecond: {
            (): number;
            (value: number): dayjs.Dayjs;
        };
        set: (unit: dayjs.UnitType, value: number) => dayjs.Dayjs;
        get: (unit: dayjs.UnitType) => number;
        add: (value: number, unit: dayjs.OpUnitType) => dayjs.Dayjs;
        subtract: (value: number, unit: dayjs.OpUnitType) => dayjs.Dayjs;
        startOf: (unit: dayjs.OpUnitType) => dayjs.Dayjs;
        endOf: (unit: dayjs.OpUnitType) => dayjs.Dayjs;
        format: (template?: string) => string;
        diff: (date: dayjs.ConfigType, unit?: "M" | "year" | "month" | "date" | "week" | "day" | "hour" | "minute" | "second" | "millisecond" | "d" | "y" | "h" | "m" | "s" | "ms" | "w" | "quarter" | "Q", float?: boolean) => number;
        valueOf: () => number;
        unix: () => number;
        daysInMonth: () => number;
        toDate: () => Date;
        toJSON: () => string;
        toISOString: () => string;
        toString: () => string;
        utcOffset: () => number;
        isBefore: (date: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
        isSame: (date: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
        isAfter: (date: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
        locale: {
            (): string;
            (preset: string | ILocale, object?: Partial<ILocale>): dayjs.Dayjs;
        };
        localeData: () => any;
        week: {
            (): number;
            (value: number): dayjs.Dayjs;
        };
        weekYear: () => number;
        dayOfYear: {
            (): number;
            (value: number): dayjs.Dayjs;
        };
        isSameOrAfter: (date: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
        isSameOrBefore: (date: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
    }>;
    t: (...args: any[]) => string;
    yearLabel: import("vue").ComputedRef<string>;
    currentView: import("vue").Ref<string>;
    month: import("vue").ComputedRef<number>;
    handleDatePick: (value: Dayjs) => void;
    handleVisibleTimeChange: (value: any) => void;
    handleVisibleDateChange: (value: any) => void;
    timeFormat: import("vue").ComputedRef<any>;
    userInputTime: any;
    userInputDate: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("pick" | "set-picker-option")[], "pick" | "set-picker-option", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    visible: boolean;
    format: unknown;
    type: unknown;
} & {
    parsedValue?: unknown;
}>, {
    visible: boolean;
    format: unknown;
}>;
export default _default;
