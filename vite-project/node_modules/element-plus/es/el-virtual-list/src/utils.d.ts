import type { RTLOffsetType, Direction, LayoutDirection } from './types';
import type { CSSProperties } from 'vue';
export declare const getScrollDir: (prev: number, cur: number) => "forward" | "backward";
export declare const isHorizontal: (dir: string) => boolean;
export declare const isRTL: (dir: Direction) => boolean;
export declare function getRTLOffsetType(recalculate?: boolean): RTLOffsetType;
export declare const getRelativePos: (e: TouchEvent | MouseEvent, layout: LayoutDirection) => any;
export declare function renderThumbStyle({ move, size, bar }: {
    move: any;
    size: any;
    bar: any;
}, layout: string): CSSProperties;
export declare const isFF: boolean;
