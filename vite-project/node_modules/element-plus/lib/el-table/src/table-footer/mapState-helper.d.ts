declare function useMapState<T>(): {
    leftFixedLeafCount: import("vue").ComputedRef<number>;
    rightFixedLeafCount: import("vue").ComputedRef<number>;
    columnsCount: import("vue").ComputedRef<number>;
    leftFixedCount: import("vue").ComputedRef<number>;
    rightFixedCount: import("vue").ComputedRef<number>;
    columns: import("vue").Ref<import("../table-column/defaults").TableColumnCtx<T>[]>;
};
export default useMapState;
