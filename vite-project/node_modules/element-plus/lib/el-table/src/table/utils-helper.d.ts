import { Store } from '../store/index';
declare function useUtils<T>(store: Store<T>): {
    setCurrentRow: (row: T) => void;
    toggleRowSelection: (row: T, selected: boolean) => void;
    clearSelection: () => void;
    clearFilter: (columnKeys: string[]) => void;
    toggleAllSelection: () => void;
    toggleRowExpansion: (row: T, expanded: boolean) => void;
    clearSort: () => void;
    sort: (prop: string, order: string) => void;
};
export default useUtils;
