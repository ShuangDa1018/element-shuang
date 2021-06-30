import type { ComputedRef } from 'vue';
import type { LayoutDirection } from '../types';
interface IWheelState {
    atStartEdge: ComputedRef<boolean>;
    atEndEdge: ComputedRef<boolean>;
    layout: ComputedRef<LayoutDirection>;
}
declare type IWheelHandler = (offset: number) => void;
declare const useWheel: ({ atEndEdge, atStartEdge, layout, }: IWheelState, onWheelDelta: IWheelHandler) => {
    hasReachedEdge: (offset: number) => boolean;
    onWheel: (e: WheelEvent) => void;
};
export default useWheel;
