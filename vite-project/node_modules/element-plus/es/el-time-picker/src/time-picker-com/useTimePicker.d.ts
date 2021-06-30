import { Dayjs } from 'dayjs';
export declare const getTimeLists: (disabledHours: any, disabledMinutes: any, disabledSeconds: any) => {
    getHoursList: (role: any, compare?: any) => any[];
    getMinutesList: (hour: any, role: any, compare?: any) => any[];
    getSecondsList: (hour: any, minute: any, role: any, compare?: any) => any[];
};
export declare const getAvaliableArrs: (disabledHours: any, disabledMinutes: any, disabledSeconds: any) => {
    getAvaliableHours: (role: any, compare?: any) => any;
    getAvaliableMinutes: (hour: any, role: any, compare?: any) => any;
    getAvaliableSeconds: (hour: any, minute: any, role: any, compare?: any) => any;
};
export declare const useOldValue: (props: {
    parsedValue?: string | Dayjs | Dayjs[];
    visible: boolean;
}) => import("vue").Ref<string | {
    clone: () => Dayjs;
    isValid: () => boolean;
    year: {
        (): number;
        (value: number): Dayjs;
    };
    month: {
        (): number;
        (value: number): Dayjs;
    };
    date: {
        (): number;
        (value: number): Dayjs;
    };
    day: {
        (): number;
        (value: number): Dayjs;
    };
    hour: {
        (): number;
        (value: number): Dayjs;
    };
    minute: {
        (): number;
        (value: number): Dayjs;
    };
    second: {
        (): number;
        (value: number): Dayjs;
    };
    millisecond: {
        (): number;
        (value: number): Dayjs;
    };
    set: (unit: import("dayjs").UnitType, value: number) => Dayjs;
    get: (unit: import("dayjs").UnitType) => number;
    add: (value: number, unit: import("dayjs").OpUnitType) => Dayjs;
    subtract: (value: number, unit: import("dayjs").OpUnitType) => Dayjs;
    startOf: (unit: import("dayjs").OpUnitType) => Dayjs;
    endOf: (unit: import("dayjs").OpUnitType) => Dayjs;
    format: (template?: string) => string;
    diff: (date: import("dayjs").ConfigType, unit?: "year" | "month" | "date" | "day" | "hour" | "minute" | "second" | "millisecond" | "week" | "d" | "M" | "y" | "h" | "m" | "s" | "ms" | "w" | "quarter" | "Q", float?: boolean) => number;
    valueOf: () => number;
    unix: () => number;
    daysInMonth: () => number;
    toDate: () => Date;
    toJSON: () => string;
    toISOString: () => string;
    toString: () => string;
    utcOffset: () => number;
    isBefore: (date: import("dayjs").ConfigType, unit?: import("dayjs").OpUnitType) => boolean;
    isSame: (date: import("dayjs").ConfigType, unit?: import("dayjs").OpUnitType) => boolean;
    isAfter: (date: import("dayjs").ConfigType, unit?: import("dayjs").OpUnitType) => boolean;
    locale: {
        (): string;
        (preset: string | ILocale, object?: Partial<ILocale>): Dayjs;
    };
    localeData: () => any;
    week: {
        (): number;
        (value: number): Dayjs;
    };
    weekYear: () => number;
    dayOfYear: {
        (): number;
        (value: number): Dayjs;
    };
    isSameOrAfter: (date: import("dayjs").ConfigType, unit?: import("dayjs").OpUnitType) => boolean;
    isSameOrBefore: (date: import("dayjs").ConfigType, unit?: import("dayjs").OpUnitType) => boolean;
} | {
    clone: () => Dayjs;
    isValid: () => boolean;
    year: {
        (): number;
        (value: number): Dayjs;
    };
    month: {
        (): number;
        (value: number): Dayjs;
    };
    date: {
        (): number;
        (value: number): Dayjs;
    };
    day: {
        (): number;
        (value: number): Dayjs;
    };
    hour: {
        (): number;
        (value: number): Dayjs;
    };
    minute: {
        (): number;
        (value: number): Dayjs;
    };
    second: {
        (): number;
        (value: number): Dayjs;
    };
    millisecond: {
        (): number;
        (value: number): Dayjs;
    };
    set: (unit: import("dayjs").UnitType, value: number) => Dayjs;
    get: (unit: import("dayjs").UnitType) => number;
    add: (value: number, unit: import("dayjs").OpUnitType) => Dayjs;
    subtract: (value: number, unit: import("dayjs").OpUnitType) => Dayjs;
    startOf: (unit: import("dayjs").OpUnitType) => Dayjs;
    endOf: (unit: import("dayjs").OpUnitType) => Dayjs;
    format: (template?: string) => string;
    diff: (date: import("dayjs").ConfigType, unit?: "year" | "month" | "date" | "day" | "hour" | "minute" | "second" | "millisecond" | "week" | "d" | "M" | "y" | "h" | "m" | "s" | "ms" | "w" | "quarter" | "Q", float?: boolean) => number;
    valueOf: () => number;
    unix: () => number;
    daysInMonth: () => number;
    toDate: () => Date;
    toJSON: () => string;
    toISOString: () => string;
    toString: () => string;
    utcOffset: () => number;
    isBefore: (date: import("dayjs").ConfigType, unit?: import("dayjs").OpUnitType) => boolean;
    isSame: (date: import("dayjs").ConfigType, unit?: import("dayjs").OpUnitType) => boolean;
    isAfter: (date: import("dayjs").ConfigType, unit?: import("dayjs").OpUnitType) => boolean;
    locale: {
        (): string;
        (preset: string | ILocale, object?: Partial<ILocale>): Dayjs;
    };
    localeData: () => any;
    week: {
        (): number;
        (value: number): Dayjs;
    };
    weekYear: () => number;
    dayOfYear: {
        (): number;
        (value: number): Dayjs;
    };
    isSameOrAfter: (date: import("dayjs").ConfigType, unit?: import("dayjs").OpUnitType) => boolean;
    isSameOrBefore: (date: import("dayjs").ConfigType, unit?: import("dayjs").OpUnitType) => boolean;
}[]>;
