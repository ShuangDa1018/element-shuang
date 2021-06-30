import { TableColumnCtx } from '../table-column/defaults';
import { TableFooter } from './index';
declare function useStyle<T>(props: TableFooter<T>): {
    hasGutter: import("vue").ComputedRef<number>;
    getRowClasses: (column: TableColumnCtx<T>, cellIndex: number) => string[];
    columns: import("vue").Ref<TableColumnCtx<T>[]>;
};
export default useStyle;
