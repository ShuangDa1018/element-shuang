import { PopperInstance, IPopperOptions } from '../../el-popper';
import { TableColumnCtx } from './table-column/defaults';
export declare const getCell: (event: Event) => HTMLElement;
export declare const orderBy: <T>(array: T[], sortKey: string, reverse: string | number, sortMethod: any, sortBy: string | (string | ((a: T, b: T, array?: T[]) => number))[]) => T[];
export declare const getColumnById: <T>(table: {
    columns: TableColumnCtx<T>[];
}, columnId: string) => TableColumnCtx<T>;
export declare const getColumnByKey: <T>(table: {
    columns: TableColumnCtx<T>[];
}, columnKey: string) => TableColumnCtx<T>;
export declare const getColumnByCell: <T>(table: {
    columns: TableColumnCtx<T>[];
}, cell: HTMLElement) => TableColumnCtx<T>;
export declare const getRowIdentity: <T>(row: T, rowKey: string | ((row: T) => any)) => string;
export declare const getKeysMap: <T>(array: T[], rowKey: string) => Record<string, {
    row: T;
    index: number;
}>;
export declare function mergeOptions<T, K>(defaults: T, config: K): T & K;
export declare function parseWidth(width: number | string): number;
export declare function parseMinWidth(minWidth: any): number;
export declare function parseHeight(height: number | string): string | number;
export declare function compose(...funcs: any[]): any;
export declare function toggleRowStatus<T>(statusArr: T[], row: T, newVal: boolean): boolean;
export declare function walkTreeNode(root: any, cb: any, childrenKey?: string, lazyKey?: string): void;
export declare let removePopper: any;
export declare function createTablePopper(trigger: HTMLElement, popperContent: string, popperOptions: Partial<IPopperOptions>, tooltipEffect: string): PopperInstance;
