import type { PropType } from 'vue';
import type { Direction, LayoutDirection, StyleValue, ItemSize } from './types';
export declare const DEFAULT_DYNAMIC_LIST_ITEM_SIZE = 50;
export declare const ITEM_RENDER_EVT = "item-rendered";
export declare const SCROLL_EVT = "scroll";
export declare const FORWARD = "forward";
export declare const BACKWARD = "backward";
export declare const AUTO_ALIGNMENT = "auto";
export declare const SMART_ALIGNMENT = "smart";
export declare const START_ALIGNMENT = "start";
export declare const CENTERED_ALIGNMENT = "center";
export declare const END_ALIGNMENT = "end";
export declare const HORIZONTAL = "horizontal";
export declare const VERTICAL = "vertical";
export declare const LTR = "ltr";
export declare const RTL = "rtl";
export declare const RTL_OFFSET_NAG = "negative";
export declare const RTL_OFFSET_POS_ASC = "positive-ascending";
export declare const RTL_OFFSET_POS_DESC = "positive-descending";
export declare const DefaultListProps: {
    cache: {
        type: PropType<number>;
        default: number;
    };
    className: {
        type: PropType<string>;
        default: string;
    };
    containerElement: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    data: {
        type: PropType<any[]>;
        default: () => any[];
    };
    direction: {
        type: PropType<Direction>;
        default: string;
        validator: (val: Direction) => boolean;
    };
    estimatedItemSize: {
        type: PropType<number>;
    };
    height: {
        type: PropType<string | number>;
        required: boolean;
    };
    layout: {
        type: PropType<LayoutDirection>;
        default: string;
    };
    initScrollOffset: {
        type: NumberConstructor;
        default: number;
    };
    innerElement: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    total: {
        type: PropType<number>;
        required: boolean;
    };
    itemSize: {
        type: PropType<number | ItemSize>;
        required: boolean;
    };
    style: {
        type: PropType<StyleValue>;
        default: () => {};
    };
    useIsScrolling: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: PropType<string | number>;
        required: boolean;
    };
};
export declare const DefaultGridProps: {
    className: {
        type: PropType<string>;
        default: string;
    };
    columnCache: {
        type: PropType<number>;
        default: number;
    };
    columnWidth: {
        type: PropType<number | ItemSize>;
        required: boolean;
    };
    containerElement: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    data: {
        type: PropType<any[]>;
        default: () => any[];
    };
    direction: {
        type: PropType<Direction>;
        default: string;
        validator: (val: Direction) => boolean;
    };
    estimatedColumnWidth: {
        type: PropType<number>;
    };
    estimatedRowHeight: {
        type: PropType<number>;
    };
    height: {
        validator: (val: number) => boolean;
        type: PropType<string | number>;
        required: boolean;
    };
    initScrollLeft: {
        type: NumberConstructor;
        default: number;
    };
    initScrollTop: {
        type: NumberConstructor;
        default: number;
    };
    innerElement: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    rowCache: {
        type: PropType<number>;
        default: number;
    };
    rowHeight: {
        type: PropType<number | ItemSize>;
        required: boolean;
    };
    style: {
        type: PropType<StyleValue>;
        default: () => {};
    };
    useIsScrolling: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        validator: (val: number) => boolean;
        type: PropType<string | number>;
        required: boolean;
    };
    totalColumn: {
        type: PropType<number>;
        required: boolean;
    };
    totalRow: {
        type: PropType<number>;
        required: boolean;
    };
};
export declare const DefaultScrollBarProps: {
    layout: {
        type: PropType<LayoutDirection>;
        default: string;
    };
    total: NumberConstructor;
    ratio: NumberConstructor;
    clientSize: NumberConstructor;
    scrollFrom: NumberConstructor;
    visible: BooleanConstructor;
};
export declare const PageKey: {
    horizontal: string;
    vertical: string;
};
export declare const ScrollbarSizeKey: {
    horizontal: string;
    vertical: string;
};
export declare const ScrollbarDirKey: {
    horizontal: string;
    vertical: string;
};
export declare const SCROLLBAR_MIN_SIZE = 20;
