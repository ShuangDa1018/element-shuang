import { PropType } from 'vue';
import dayjs from 'dayjs';
import type { IDatePickerType } from '../date-picker.type';
declare const _default: import("vue").DefineComponent<{
    unlinkPanels: BooleanConstructor;
    parsedValue: {
        type: PropType<dayjs.Dayjs[]>;
    };
    type: {
        type: PropType<IDatePickerType>;
        required: true;
        validator: (val: string) => boolean;
    };
}, {
    shortcuts: any;
    disabledDate: any;
    cellClassName: any;
    minTimePickerVisible: import("vue").Ref<boolean>;
    maxTimePickerVisible: import("vue").Ref<boolean>;
    handleMinTimeClose: () => void;
    handleMaxTimeClose: () => void;
    handleShortcutClick: (shortcut: any) => void;
    rangeState: import("vue").Ref<{
        endDate: any;
        selecting: boolean;
    }>;
    minDate: any;
    maxDate: any;
    handleRangePick: (val: any, close?: boolean) => void;
    onSelect: (selecting: any) => void;
    handleChangeRange: (val: any) => void;
    btnDisabled: import("vue").ComputedRef<boolean>;
    enableYearArrow: import("vue").ComputedRef<boolean>;
    enableMonthArrow: import("vue").ComputedRef<boolean>;
    rightPrevMonth: () => void;
    rightPrevYear: () => void;
    rightNextMonth: () => void;
    rightNextYear: () => void;
    leftPrevMonth: () => void;
    leftPrevYear: () => void;
    leftNextMonth: () => void;
    leftNextYear: () => void;
    hasShortcuts: import("vue").ComputedRef<boolean>;
    leftLabel: import("vue").ComputedRef<string>;
    rightLabel: import("vue").ComputedRef<string>;
    leftDate: import("vue").Ref<{
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
        diff: (date: dayjs.ConfigType, unit?: "M" | "year" | "month" | "date" | "week" | "millisecond" | "second" | "minute" | "hour" | "day" | "d" | "y" | "h" | "m" | "s" | "ms" | "w" | "quarter" | "Q", float?: boolean) => number;
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
    rightDate: import("vue").Ref<{
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
        diff: (date: dayjs.ConfigType, unit?: "M" | "year" | "month" | "date" | "week" | "millisecond" | "second" | "minute" | "hour" | "day" | "d" | "y" | "h" | "m" | "s" | "ms" | "w" | "quarter" | "Q", float?: boolean) => number;
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
    showTime: import("vue").ComputedRef<boolean>;
    t: (...args: any[]) => string;
    minVisibleDate: import("vue").ComputedRef<any>;
    maxVisibleDate: import("vue").ComputedRef<any>;
    minVisibleTime: import("vue").ComputedRef<any>;
    maxVisibleTime: import("vue").ComputedRef<any>;
    arrowControl: any;
    handleDateInput: (value: any, type: any) => void;
    handleDateChange: (value: any, type: any) => void;
    handleTimeInput: (value: any, type: any) => void;
    handleTimeChange: (value: any, type: any) => void;
    handleMinTimePick: (value: any, visible: any, first: any) => void;
    handleMaxTimePick: (value: any, visible: any, first: any) => void;
    handleClear: () => void;
    handleConfirm: (visible?: boolean) => void;
    timeFormat: import("vue").ComputedRef<any>;
    clearable: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("pick" | "set-picker-option")[], "pick" | "set-picker-option", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    unlinkPanels: boolean;
    type: unknown;
} & {
    parsedValue?: unknown;
}>, {
    unlinkPanels: boolean;
}>;
export default _default;
