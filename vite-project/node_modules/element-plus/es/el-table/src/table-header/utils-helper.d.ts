import { TableColumnCtx } from '../table-column/defaults';
import { TableHeaderProps } from './index';
declare function useUtils<T>(props: TableHeaderProps<T>): {
    isGroup: import("vue").ComputedRef<boolean>;
    toggleAllSelection: (event: Event) => void;
    columnRows: import("vue").ComputedRef<TableColumnCtx<T>[]>;
};
export default useUtils;
