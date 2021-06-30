import { TableColumnCtx } from '../table-column/defaults';
import { TableHeaderProps } from './index';
declare function useStyle<T>(props: TableHeaderProps<T>): {
    getHeaderRowStyle: (rowIndex: number) => any;
    getHeaderRowClass: (rowIndex: number) => string;
    getHeaderCellStyle: (rowIndex: number, columnIndex: number, row: T, column: TableColumnCtx<T>) => any;
    getHeaderCellClass: (rowIndex: number, columnIndex: number, row: T, column: TableColumnCtx<T>) => string;
};
export default useStyle;
