import type { SetupContext } from 'vue';
import type { IPopperOptions } from '../../el-popper';
export interface IUsePopover extends IPopperOptions {
    width: number | string;
}
export declare const SHOW_EVENT = "show";
export declare const HIDE_EVENT = "hide";
export default function usePopover(props: IUsePopover, ctx: SetupContext<string[]>): {
    popperStyle: import("vue").ComputedRef<{
        width: string;
        zIndex: number;
    }>;
    update: () => void;
    doDestroy: (forceDestroy?: boolean) => void;
    show: () => void;
    hide: () => void;
    onPopperMouseEnter: () => void;
    onPopperMouseLeave: () => void;
    onAfterEnter: () => void;
    onAfterLeave: () => void;
    onBeforeEnter: () => void;
    onBeforeLeave: () => void;
    initializePopper: () => void;
    isManualMode: () => boolean;
    arrowRef: import("vue").Ref<HTMLElement>;
    events: import("../../el-popper/src/use-popper").PopperEvents;
    popperId: string;
    popperInstance: import("../../el-popper").PopperInstance;
    popperRef: import("vue").Ref<HTMLElement>;
    triggerRef: import("vue").Ref<import("../../el-popper/src/use-popper").ElementType>;
    visibility: import("vue").WritableComputedRef<boolean>;
};
