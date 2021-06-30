import { TableColumnCtx } from './defaults';
declare const _default: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        default: string;
    };
    label: StringConstructor;
    className: StringConstructor;
    labelClassName: StringConstructor;
    property: StringConstructor;
    prop: StringConstructor;
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    minWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    renderHeader: import("vue").PropType<(data: {
        column: TableColumnCtx<any>;
        $index: number;
    }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>>;
    sortable: {
        type: (BooleanConstructor | StringConstructor)[];
        default: boolean;
    };
    sortMethod: import("vue").PropType<(a: any, b: any) => number>;
    sortBy: import("vue").PropType<string | string[] | ((row: any, index: number) => string)>;
    resizable: {
        type: BooleanConstructor;
        default: boolean;
    };
    columnKey: StringConstructor;
    align: StringConstructor;
    headerAlign: StringConstructor;
    showTooltipWhenOverflow: BooleanConstructor;
    showOverflowTooltip: BooleanConstructor;
    fixed: (BooleanConstructor | StringConstructor)[];
    formatter: import("vue").PropType<(row: any, column: TableColumnCtx<any>, cellValue: any, index: number) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>>;
    selectable: import("vue").PropType<(row: any, index: number) => boolean>;
    reserveSelection: BooleanConstructor;
    filterMethod: import("vue").PropType<import("./defaults").FilterMethods<any>>;
    filteredValue: import("vue").PropType<string[]>;
    filters: import("vue").PropType<import("./defaults").Filters>;
    filterPlacement: StringConstructor;
    filterMultiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    index: import("vue").PropType<number | ((index: number) => number)>;
    sortOrders: {
        type: import("vue").PropType<("ascending" | "descending")[]>;
        default: () => string[];
        validator: (val: ("ascending" | "descending")[]) => boolean;
    };
}, void, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    sortOrders: unknown;
    type: unknown;
    width: unknown;
    minWidth: unknown;
    sortable: unknown;
    resizable: boolean;
    showTooltipWhenOverflow: boolean;
    showOverflowTooltip: boolean;
    reserveSelection: boolean;
    filterMultiple: boolean;
} & {
    renderHeader?: unknown;
    sortMethod?: unknown;
    sortBy?: unknown;
    formatter?: unknown;
    selectable?: unknown;
    filterMethod?: unknown;
    filteredValue?: unknown;
    filters?: unknown;
    index?: unknown;
    label?: unknown;
    className?: unknown;
    labelClassName?: unknown;
    property?: unknown;
    prop?: unknown;
    columnKey?: unknown;
    align?: unknown;
    headerAlign?: unknown;
    fixed?: unknown;
    filterPlacement?: unknown;
}>, {
    sortOrders: unknown;
    type: unknown;
    width: unknown;
    minWidth: unknown;
    sortable: unknown;
    resizable: boolean;
    showTooltipWhenOverflow: boolean;
    showOverflowTooltip: boolean;
    reserveSelection: boolean;
    filterMultiple: boolean;
}>;
export default _default;
