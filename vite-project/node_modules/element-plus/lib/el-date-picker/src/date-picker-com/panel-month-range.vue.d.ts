import dayjs from 'dayjs';
import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    unlinkPanels: BooleanConstructor;
    parsedValue: {
        type: PropType<dayjs.Dayjs[]>;
    };
}, {
    shortcuts: any;
    disabledDate: any;
    onSelect: (selecting: any) => void;
    handleRangePick: (val: any, close?: boolean) => void;
    rangeState: import("vue").Ref<{
        endDate: any;
        selecting: boolean;
    }>;
    handleChangeRange: (val: any) => void;
    minDate: any;
    maxDate: any;
    enableYearArrow: import("vue").ComputedRef<boolean>;
    leftLabel: import("vue").ComputedRef<string>;
    rightLabel: import("vue").ComputedRef<string>;
    leftNextYear: () => void;
    leftPrevYear: () => void;
    rightNextYear: () => void;
    rightPrevYear: () => void;
    t: (...args: any[]) => string;
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
        diff: (date: dayjs.ConfigType, unit?: "M" | "millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year" | "date" | "d" | "y" | "h" | "m" | "s" | "ms" | "week" | "w" | "quarter" | "Q", float?: boolean) => number;
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
        diff: (date: dayjs.ConfigType, unit?: "M" | "millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year" | "date" | "d" | "y" | "h" | "m" | "s" | "ms" | "week" | "w" | "quarter" | "Q", float?: boolean) => number;
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
    hasShortcuts: import("vue").ComputedRef<boolean>;
    handleShortcutClick: (shortcut: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("pick" | "set-picker-option")[], "pick" | "set-picker-option", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    unlinkPanels: boolean;
} & {
    parsedValue?: unknown;
}>, {
    unlinkPanels: boolean;
}>;
export default _default;
