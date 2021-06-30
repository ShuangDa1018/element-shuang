import { PropType } from 'vue';
import { CascaderValue, CascaderOption, CascaderConfig, CascaderProps, ExpandTrigger } from './types';
export declare const CommonProps: {
    modelValue: PropType<CascaderValue>;
    options: {
        type: PropType<CascaderOption[]>;
        default: () => CascaderOption[];
    };
    props: {
        type: PropType<CascaderProps>;
        default: () => CascaderProps;
    };
};
export declare const DefaultProps: CascaderConfig;
export declare const useCascaderConfig: (props: {
    props: CascaderProps;
}) => import("vue").ComputedRef<{
    expandTrigger: ExpandTrigger;
    multiple: boolean;
    checkStrictly: boolean;
    emitPath: boolean;
    lazy: boolean;
    lazyLoad: import("./types").LazyLoad;
    value: string;
    label: string;
    children: string;
    disabled: string | import("./types").isDisabled;
    leaf: string | import("./types").isLeaf;
    hoverThreshold: number;
}>;
