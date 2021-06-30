declare const _default: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    percentage: {
        type: NumberConstructor;
        default: number;
        required: true;
        validator: (val: number) => boolean;
    };
    status: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    indeterminate: {
        type: BooleanConstructor;
        default: boolean;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    strokeWidth: {
        type: NumberConstructor;
        default: number;
    };
    strokeLinecap: {
        type: StringConstructor;
        default: string;
    };
    textInside: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    showText: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: (StringConstructor | ArrayConstructor | FunctionConstructor)[];
        default: string;
    };
    format: {
        type: FunctionConstructor;
        default: (percentage: number) => string;
    };
}, {
    barStyle: import("vue").ComputedRef<{
        width: string;
        animationDuration: string;
        backgroundColor: string;
    }>;
    relativeStrokeWidth: import("vue").ComputedRef<string>;
    radius: import("vue").ComputedRef<number>;
    trackPath: import("vue").ComputedRef<string>;
    perimeter: import("vue").ComputedRef<number>;
    rate: import("vue").ComputedRef<1 | 0.75>;
    strokeDashoffset: import("vue").ComputedRef<string>;
    trailPathStyle: import("vue").ComputedRef<{
        strokeDasharray: string;
        strokeDashoffset: string;
    }>;
    circlePathStyle: import("vue").ComputedRef<{
        strokeDasharray: string;
        strokeDashoffset: string;
        transition: string;
    }>;
    stroke: import("vue").ComputedRef<any>;
    iconClass: import("vue").ComputedRef<"el-icon-warning" | "el-icon-circle-check" | "el-icon-circle-close" | "el-icon-check" | "el-icon-close">;
    progressTextSize: import("vue").ComputedRef<number>;
    content: import("vue").ComputedRef<string>;
    getCurrentColor: (percentage: any) => string;
    slotData: import("vue").ComputedRef<{
        percentage: number;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type: unknown;
    percentage: unknown;
    status: unknown;
    indeterminate: boolean;
    duration: unknown;
    strokeWidth: unknown;
    strokeLinecap: unknown;
    textInside: boolean;
    width: unknown;
    showText: boolean;
    color: unknown;
    format: unknown;
} & {}>, {
    type: unknown;
    percentage: unknown;
    status: unknown;
    indeterminate: boolean;
    duration: unknown;
    strokeWidth: unknown;
    strokeLinecap: unknown;
    textInside: boolean;
    width: unknown;
    showText: boolean;
    color: unknown;
    format: unknown;
}>;
export default _default;
