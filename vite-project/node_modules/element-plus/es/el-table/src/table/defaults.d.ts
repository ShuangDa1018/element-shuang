import { ComponentInternalInstance, CSSProperties, Ref, VNode, PropType } from 'vue';
import { Store } from '../store/index';
import { TableColumnCtx } from '../table-column/defaults';
import type TableLayout from '../table-layout';
export declare type DefaultRow = any;
interface TableRefs {
    headerWrapper: HTMLElement;
    footerWrapper: HTMLElement;
    fixedBodyWrapper: HTMLElement;
    rightFixedBodyWrapper: HTMLElement;
    bodyWrapper: HTMLElement;
    [key: string]: any;
}
interface TableState {
    isGroup: Ref<boolean>;
    resizeState: Ref<{
        width: any;
        height: any;
    }>;
    doLayout: () => void;
    debouncedUpdateLayout: () => void;
}
declare type HoverState<T> = Nullable<{
    cell: HTMLElement;
    column: TableColumnCtx<T>;
    row: T;
}>;
declare type RIS<T> = {
    row: T;
    $index: number;
    store: Store<T>;
};
declare type RenderExpanded<T> = ({ row, $index, store }: RIS<T>) => VNode;
declare type SummaryMethod<T> = (data: {
    columns: TableColumnCtx<T>;
    data: T[];
}) => string[];
interface Table<T> extends ComponentInternalInstance {
    $ready: boolean;
    hoverState?: HoverState<T>;
    renderExpanded: RenderExpanded<T>;
    store: Store<T>;
    layout: TableLayout<T>;
    refs: TableRefs;
    tableId: string;
    state: TableState;
}
declare type ColumnCls<T> = string | ((data: {
    row: T;
    rowIndex: number;
}) => string);
declare type ColumnStyle<T> = CSSProperties | ((data: {
    row: T;
    rowIndex: number;
}) => CSSProperties);
declare type CellCls<T> = string | ((data: {
    row: T;
    rowIndex: number;
    column: TableColumnCtx<T>;
    columnIndex: number;
}) => string);
declare type CellStyle<T> = CSSProperties | ((data: {
    row: T;
    rowIndex: number;
    column: TableColumnCtx<T>;
    columnIndex: number;
}) => CSSProperties);
interface TableProps<T> {
    data: T[];
    size?: string;
    width?: string | number;
    height?: string | number;
    maxHeight?: string | number;
    fit?: boolean;
    stripe?: boolean;
    border?: boolean;
    rowKey?: string | ((row: T) => string);
    context?: Table<T>;
    showHeader?: boolean;
    showSummary?: boolean;
    sumText?: string;
    summaryMethod?: SummaryMethod<T>;
    rowClassName?: ColumnCls<T>;
    rowStyle?: ColumnStyle<T>;
    cellClassName?: CellCls<T>;
    cellStyle?: CellStyle<T>;
    headerRowClassName?: ColumnCls<T>;
    headerRowStyle?: ColumnStyle<T>;
    headerCellClassName?: CellCls<T>;
    headerCellStyle?: CellStyle<T>;
    highlightCurrentRow?: boolean;
    currentRowKey?: string | number;
    emptyText?: string;
    expandRowKeys?: any[];
    defaultExpandAll?: boolean;
    defaultSort?: Sort;
    tooltipEffect?: string;
    spanMethod?: (data: {
        row: T;
        rowIndex: number;
        column: TableColumnCtx<T>;
        columnIndex: number;
    }) => number[] | {
        rowspan: number;
        colspan: number;
    };
    selectOnIndeterminate?: boolean;
    indent?: number;
    treeProps?: {
        hasChildren?: string;
        children?: string;
    };
    lazy?: boolean;
    load?: (row: T, treeNode: TreeNode, resolve: (data: T[]) => void) => void;
    className?: string;
    style?: CSSProperties;
}
interface Sort {
    prop: string;
    order: 'ascending' | 'descending';
    init?: any;
    silent?: any;
}
interface Filter<T> {
    column: TableColumnCtx<T>;
    values: string[];
    silent: any;
}
interface TreeNode {
    expanded?: boolean;
    loading?: boolean;
    noLazyChildren?: boolean;
    indent?: number;
    level?: number;
    display?: boolean;
}
interface RenderRowData<T> {
    store: Store<T>;
    _self: Table<T>;
    column: TableColumnCtx<T>;
    row: T;
    $index: number;
    treeNode?: TreeNode;
}
declare const _default: {
    data: {
        type: PropType<any[]>;
        default: () => any[];
    };
    size: StringConstructor;
    width: (StringConstructor | NumberConstructor)[];
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    fit: {
        type: BooleanConstructor;
        default: boolean;
    };
    stripe: BooleanConstructor;
    border: BooleanConstructor;
    rowKey: PropType<string | ((row: any) => string)>;
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    showSummary: BooleanConstructor;
    sumText: StringConstructor;
    summaryMethod: PropType<SummaryMethod<any>>;
    rowClassName: PropType<ColumnCls<any>>;
    rowStyle: PropType<ColumnStyle<any>>;
    cellClassName: PropType<CellCls<any>>;
    cellStyle: PropType<CellStyle<any>>;
    headerRowClassName: PropType<ColumnCls<any>>;
    headerRowStyle: PropType<ColumnStyle<any>>;
    headerCellClassName: PropType<CellCls<any>>;
    headerCellStyle: PropType<CellStyle<any>>;
    highlightCurrentRow: BooleanConstructor;
    currentRowKey: (StringConstructor | NumberConstructor)[];
    emptyText: StringConstructor;
    expandRowKeys: PropType<any[]>;
    defaultExpandAll: BooleanConstructor;
    defaultSort: PropType<Sort>;
    tooltipEffect: StringConstructor;
    spanMethod: PropType<(data: {
        row: any;
        rowIndex: number;
        column: TableColumnCtx<any>;
        columnIndex: number;
    }) => {
        rowspan: number;
        colspan: number;
    } | number[]>;
    selectOnIndeterminate: {
        type: BooleanConstructor;
        default: boolean;
    };
    indent: {
        type: NumberConstructor;
        default: number;
    };
    treeProps: {
        type: PropType<{
            hasChildren?: string;
            children?: string;
        }>;
        default: () => {
            hasChildren: string;
            children: string;
        };
    };
    lazy: BooleanConstructor;
    load: PropType<(row: any, treeNode: TreeNode, resolve: (data: any[]) => void) => void>;
    style: {
        type: PropType<CSSProperties>;
        default: () => {};
    };
    className: {
        type: StringConstructor;
        default: string;
    };
};
export default _default;
export type { SummaryMethod, Table, TableProps, TableRefs, ColumnCls, ColumnStyle, TreeNode, RenderRowData, Sort, Filter };
