import { ComputedRef } from 'vue';
import { ISliderInitData, ISliderProps, Stops } from './slider.type';
export declare const useStops: (props: ISliderProps, initData: ISliderInitData, minValue: ComputedRef<number>, maxValue: ComputedRef<number>) => Stops;
