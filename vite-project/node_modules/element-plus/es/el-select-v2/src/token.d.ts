import { SelectProps } from './defaults';
import type { ExtractPropTypes, InjectionKey } from 'vue';
import type { Option } from './select.types';
export interface SelectGroupContext {
    options: [];
}
export interface SelectContext {
    props: ExtractPropTypes<typeof SelectProps>;
    expanded: boolean;
    onSelect: (option: Option<any>, index: number, byClick?: boolean) => void;
    onKeyboardNavigate: (direction: 'forward' | 'backward') => void;
    onKeyboardSelect: () => void;
}
export declare const selectGroupKey: InjectionKey<SelectGroupContext>;
export declare const selectKey: InjectionKey<SelectContext>;
