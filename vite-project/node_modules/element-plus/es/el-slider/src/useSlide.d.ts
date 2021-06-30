import { ISliderInitData, ISliderProps } from './slider.type';
import type { ElFormItemContext } from '../../el-form';
export declare const useSlide: (props: ISliderProps, initData: ISliderInitData, emit: any) => {
    elFormItem: ElFormItemContext;
    slider: import("vue").Ref<HTMLElement>;
    firstButton: any;
    secondButton: any;
    sliderDisabled: import("vue").ComputedRef<boolean>;
    minValue: import("vue").ComputedRef<number>;
    maxValue: import("vue").ComputedRef<number>;
    runwayStyle: import("vue").ComputedRef<CSSStyleDeclaration>;
    barStyle: import("vue").ComputedRef<CSSStyleDeclaration>;
    resetSize: () => void;
    setPosition: (percent: number) => void;
    emitChange: () => Promise<void>;
    onSliderClick: (event: MouseEvent) => void;
};
