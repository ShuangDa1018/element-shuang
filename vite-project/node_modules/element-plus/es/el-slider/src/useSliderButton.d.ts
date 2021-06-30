import { ComputedRef } from 'vue';
import { ISliderButtonInitData, ISliderButtonProps } from './slider.type';
export declare const useSliderButton: (props: ISliderButtonProps, initData: ISliderButtonInitData, emit: any) => {
    tooltip: any;
    tooltipVisible: import("vue").Ref<boolean>;
    showTooltip: ComputedRef<boolean>;
    wrapperStyle: ComputedRef<CSSStyleDeclaration>;
    formatValue: ComputedRef<string | number>;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    onButtonDown: (event: MouseEvent | TouchEvent) => void;
    onLeftKeyDown: () => void;
    onRightKeyDown: () => void;
    setPosition: (newPosition: number) => Promise<void>;
};
