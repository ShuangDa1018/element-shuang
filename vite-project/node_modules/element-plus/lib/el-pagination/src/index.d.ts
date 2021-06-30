declare const _default: import("vue").DefineComponent<{
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    small: BooleanConstructor;
    total: {
        type: NumberConstructor;
    };
    pageCount: {
        type: NumberConstructor;
    };
    pagerCount: {
        type: NumberConstructor;
        validator: (value: number) => boolean;
        default: number;
    };
    currentPage: {
        type: NumberConstructor;
        default: number;
    };
    layout: {
        type: StringConstructor;
        default: string;
    };
    pageSizes: {
        type: ArrayConstructor;
        default: () => number[];
    };
    popperClass: {
        type: StringConstructor;
        default: string;
    };
    prevText: {
        type: StringConstructor;
        default: string;
    };
    nextText: {
        type: StringConstructor;
        default: string;
    };
    background: BooleanConstructor;
    disabled: BooleanConstructor;
    hideOnSinglePage: BooleanConstructor;
}, {
    internalCurrentPage: import("vue").Ref<number>;
    internalPageSize: import("vue").Ref<number>;
    lastEmittedPage: import("vue").Ref<number>;
    userChangePageSize: import("vue").Ref<boolean>;
    internalPageCount: import("vue").ComputedRef<number>;
    getValidCurrentPage: (value: number | string) => number;
    emitChange: () => void;
    handleCurrentChange: (val: number) => void;
    prev: () => void;
    next: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("size-change" | "current-change" | "prev-click" | "next-click" | "update:currentPage" | "update:pageSize")[], "size-change" | "current-change" | "prev-click" | "next-click" | "update:currentPage" | "update:pageSize", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    pageSize: unknown;
    small: boolean;
    pagerCount: unknown;
    currentPage: unknown;
    layout: unknown;
    pageSizes: unknown;
    popperClass: unknown;
    prevText: unknown;
    nextText: unknown;
    background: boolean;
    disabled: boolean;
    hideOnSinglePage: boolean;
} & {
    total?: unknown;
    pageCount?: unknown;
}>, {
    pageSize: unknown;
    small: boolean;
    pagerCount: unknown;
    currentPage: unknown;
    layout: unknown;
    pageSizes: unknown;
    popperClass: unknown;
    prevText: unknown;
    nextText: unknown;
    background: boolean;
    disabled: boolean;
    hideOnSinglePage: boolean;
}>;
export default _default;
