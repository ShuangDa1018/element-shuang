import { IPagination } from './pagination';
export declare const usePagination: () => {
    pagination: IPagination;
    pageCount: import("vue").ComputedRef<number>;
    disabled: import("vue").ComputedRef<boolean>;
    currentPage: import("vue").ComputedRef<number>;
};
