import type { Ref } from 'vue';
interface IStepsProps {
    space: number | string;
    active: number;
    direction: string;
    alignCenter: boolean;
    simple: boolean;
    finishStatus: string;
    processStatus: string;
}
interface StepItemState {
    uid: number;
    currentStatus: string;
    setIndex: (val: number) => void;
    calcProgress: (status: string) => void;
}
interface IStepsInject {
    props: IStepsProps;
    steps: Ref<StepItemState[]>;
}
declare const _default: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
    description: {
        type: StringConstructor;
        default: string;
    };
    status: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
}, {
    index: Ref<number>;
    lineStyle: Ref<{}>;
    currentStatus: import("vue").ComputedRef<unknown>;
    isCenter: import("vue").ComputedRef<boolean>;
    isVertical: import("vue").ComputedRef<boolean>;
    isSimple: import("vue").ComputedRef<boolean>;
    isLast: import("vue").ComputedRef<boolean>;
    space: import("vue").ComputedRef<string | number>;
    style: import("vue").ComputedRef<Record<string, unknown>>;
    parent: IStepsInject;
    setIndex: (val: any) => void;
    calcProgress: (status: any) => void;
    updateStatus: (activeIndex: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    title: unknown;
    icon: unknown;
    description: unknown;
    status: unknown;
} & {}>, {
    title: unknown;
    icon: unknown;
    description: unknown;
    status: unknown;
}>;
export default _default;
