import type { CSSProperties, ComponentInternalInstance, ExtractPropTypes } from 'vue';
export declare type Instance = ComponentInternalInstance;
export declare type StyleValue = string | CSSProperties | Array<StyleValue>;
export declare type ScrollEvent = WheelEvent | MouseEvent;
export declare type Alignment = 'auto' | 'smart' | 'center' | 'start' | 'end';
export declare type ItemSize = (idx: number) => number | number;
export declare type Direction = 'ltr' | 'rtl';
export declare type LayoutDirection = 'horizontal' | 'vertical';
export declare type RTLOffsetType = 'negative' | 'positive-descending' | 'positive-ascending';
export declare type ItemProps<T> = {
    data: T;
    style: CSSProperties;
    scrolling?: boolean;
    index: number;
};
export declare type ListItem = {
    offset: number;
    size: number;
};
export declare type ListCache = {
    items: Record<string, ListItem>;
    estimatedItemSize: number;
    lastVisitedIndex: number;
    clearCacheAfterIndex: (idx: number, forceUpdate?: boolean) => void;
};
export declare type GridCache = {
    column: Record<string, ListItem>;
    row: Record<string, ListItem>;
    estimatedColumnWidth: number;
    estimatedRowHeight: number;
    lastVisitedColumnIndex: number;
    lastVisitedRowIndex: number;
};
export declare type ScrollDir = 'forwards' | 'backwards';
export declare type ListItemSizer<T, P extends InitListCacheFunc<T>> = (props: ExtractPropTypes<T>, index: number, cache: ReturnType<P>) => number;
export declare type GetEstimatedTotalSize<T, P extends InitCacheFunc<T, GridCache | ListCache>> = (props: ExtractPropTypes<T>, cache: ReturnType<P>) => number;
export declare type GetOffset<T, P extends InitListCacheFunc<T>> = (props: ExtractPropTypes<T>, idx: number, alignment: Alignment, offset: number, cache: ReturnType<P>) => number;
export declare type GetStartIndexForOffset<T, P extends InitCacheFunc<T, GridCache | ListCache>> = (props: ExtractPropTypes<T>, offset: number, cache: ReturnType<P>) => number;
export declare type GetStopIndexForStartIndex<T, P extends InitCacheFunc<T, GridCache | ListCache>> = (props: ExtractPropTypes<T>, startIndex: number, scrollOffset: number, cache: ReturnType<P>) => number;
export declare type PropValidator<T> = (props: ExtractPropTypes<T>) => void;
export declare type InitCacheFunc<T, P> = (props: ExtractPropTypes<T>, cache: Instance) => P;
export declare type InitListCacheFunc<T> = InitCacheFunc<T, ListCache>;
export declare type InitGridCacheFunc<T> = InitCacheFunc<T, GridCache>;
export declare type ListConstructorProps<T, P extends InitListCacheFunc<T> = InitListCacheFunc<T>> = {
    name?: string;
    getItemOffset: ListItemSizer<T, P>;
    getEstimatedTotalSize: GetEstimatedTotalSize<T, P>;
    getItemSize: ListItemSizer<T, P>;
    getOffset: GetOffset<T, P>;
    getStartIndexForOffset: GetStartIndexForOffset<T, P>;
    getStopIndexForStartIndex: GetStopIndexForStartIndex<T, P>;
    initCache: P;
    clearCache: boolean;
    validateProps: PropValidator<T>;
};
export declare type ExposesStates = {
    isScrolling: boolean;
    updateRequested: boolean;
};
export declare type SharedExposes = {
    windowRef: HTMLElement;
    innerRef: HTMLElement;
    getItemStyleCache: (_: any, __: any, ___: any) => CSSProperties;
};
export declare type ListExposes = {
    scrollTo: (offset: number) => void;
    scrollToItem: (idx: number, alignment?: Alignment) => void;
    states: {
        scrollDir: Direction;
        scrollOffset: number;
    } & ExposesStates;
} & SharedExposes;
export declare type GridExposes = {
    states: {
        scrollLeft: number;
        scrollTop: number;
        xAxisScrollDir: Direction;
        yAxisScrollDir: Direction;
    } & ExposesStates;
    scrollTo: (props: {
        scrollLeft: number;
        scrollTop: number;
    }) => void;
    scrollToItem: (columnIndex?: number, rowIndex?: number, alignment?: Alignment) => void;
} & SharedExposes;
export declare type GetGridOffset<T, P extends InitGridCacheFunc<T>> = (props: ExtractPropTypes<T>, index: number, alignment: Alignment, offset: number, cache: ReturnType<P>, scrollbarWidth: number) => number;
export declare type GetPosition<T, P extends InitGridCacheFunc<T>> = (props: ExtractPropTypes<T>, index: number, cache: ReturnType<P>) => [number, number];
export declare type GridConstructorProps<T, P extends InitGridCacheFunc<T> = InitGridCacheFunc<T>> = {
    name?: string;
    getColumnOffset: GetGridOffset<T, P>;
    getColumnPosition: GetPosition<T, P>;
    getColumnStartIndexForOffset: GetStartIndexForOffset<T, P>;
    getColumnStopIndexForStartIndex: GetStopIndexForStartIndex<T, P>;
    getEstimatedTotalHeight: GetEstimatedTotalSize<T, P>;
    getEstimatedTotalWidth: GetEstimatedTotalSize<T, P>;
    getRowOffset: GetGridOffset<T, P>;
    getRowPosition: GetPosition<T, P>;
    getRowStartIndexForOffset: GetStartIndexForOffset<T, P>;
    getRowStopIndexForStartIndex: GetStopIndexForStartIndex<T, P>;
    initCache: P;
    clearCache: boolean;
    validateProps: PropValidator<T>;
};
