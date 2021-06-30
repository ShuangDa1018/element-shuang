import { Ref, PropType } from 'vue';
import { Dayjs } from 'dayjs';
declare const _default: import("vue").DefineComponent<{
    role: {
        type: StringConstructor;
        required: true;
    };
    spinnerDate: {
        type: PropType<Dayjs>;
        required: true;
    };
    showSeconds: {
        type: BooleanConstructor;
        default: boolean;
    };
    arrowControl: BooleanConstructor;
    amPmMode: {
        type: StringConstructor;
        default: string;
    };
    disabledHours: {
        type: FunctionConstructor;
    };
    disabledMinutes: {
        type: FunctionConstructor;
    };
    disabledSeconds: {
        type: FunctionConstructor;
    };
}, {
    getRefId: (item: any) => string;
    spinnerItems: import("vue").ComputedRef<string[]>;
    currentScrollbar: any;
    hours: import("vue").ComputedRef<any>;
    minutes: import("vue").ComputedRef<any>;
    seconds: import("vue").ComputedRef<any>;
    hoursList: import("vue").ComputedRef<any[]>;
    minutesList: import("vue").ComputedRef<any[]>;
    arrowHourList: import("vue").ComputedRef<any[]>;
    arrowMinuteList: import("vue").ComputedRef<any[]>;
    arrowSecondList: import("vue").ComputedRef<any[]>;
    getAmPmFlag: (hour: any) => string;
    emitSelectRange: (type: any) => void;
    adjustCurrentSpinner: (type: any) => void;
    typeItemHeight: (type: any) => any;
    listHoursRef: Ref<HTMLElement>;
    listMinutesRef: Ref<HTMLElement>;
    listSecondsRef: Ref<HTMLElement>;
    onIncreaseClick: () => void;
    onDecreaseClick: () => void;
    handleClick: (type: any, { value, disabled }: {
        value: any;
        disabled: any;
    }) => void;
    secondsList: import("vue").ComputedRef<any[]>;
    timePartsMap: import("vue").ComputedRef<{
        hours: import("vue").ComputedRef<any>;
        minutes: import("vue").ComputedRef<any>;
        seconds: import("vue").ComputedRef<any>;
    }>;
    arrowListMap: import("vue").ComputedRef<{
        hours: import("vue").ComputedRef<any[]>;
        minutes: import("vue").ComputedRef<any[]>;
        seconds: import("vue").ComputedRef<any[]>;
    }>;
    listMap: import("vue").ComputedRef<{
        hours: import("vue").ComputedRef<any[]>;
        minutes: import("vue").ComputedRef<any[]>;
        seconds: import("vue").ComputedRef<any[]>;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "select-range" | "set-option")[], "change" | "select-range" | "set-option", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    role: unknown;
    spinnerDate: unknown;
    showSeconds: boolean;
    arrowControl: boolean;
    amPmMode: unknown;
} & {
    disabledHours?: unknown;
    disabledMinutes?: unknown;
    disabledSeconds?: unknown;
}>, {
    showSeconds: boolean;
    arrowControl: boolean;
    amPmMode: unknown;
}>;
export default _default;
