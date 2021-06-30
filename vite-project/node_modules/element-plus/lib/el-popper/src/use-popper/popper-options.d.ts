import type { Ref } from 'vue';
import type { Options, Placement } from '@popperjs/core';
interface IUsePopperProps {
    popperOptions: Options;
    arrowOffset: number;
    offset: number;
    placement: Placement;
    gpuAcceleration: boolean;
    fallbackPlacements: Array<Placement>;
}
interface IUsePopperState {
    arrow: Ref<HTMLElement>;
}
export default function usePopperOptions(props: IUsePopperProps, state: IUsePopperState): import("vue").ComputedRef<{
    modifiers: import("@popperjs/core").StrictModifiers[];
    placement: Placement;
    strategy: import("@popperjs/core").PositioningStrategy;
    onFirstUpdate?: (arg0: Partial<import("@popperjs/core").State>) => void;
}>;
export {};
