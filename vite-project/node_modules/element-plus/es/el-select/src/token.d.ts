import type { InjectionKey } from 'vue';
import type { Emitter } from 'mitt';
interface SelectGroupContext {
    disabled: boolean;
}
export interface SelectContext {
    props: {
        multiple?: boolean;
        multipleLimit?: number;
        valueKey?: string;
        modelValue?: string | number | unknown | unknown[];
        popperClass?: string;
        remote?: boolean;
    };
    selectWrapper: HTMLElement;
    cachedOptions: Map<any, any>;
    hoverIndex: number;
    optionsCount: number;
    filteredOptionsCount: number;
    options: Map<any, any>;
    optionsArray: any[];
    selected: any | any[];
    selectEmitter: Emitter;
    setSelected(): void;
    onOptionCreate(vm: SelectOptionProxy): void;
    onOptionDestroy(key: number | string | Record<string, any>): void;
    handleOptionSelect(vm: unknown, byClick: boolean): void;
}
export declare const selectGroupKey: InjectionKey<SelectGroupContext>;
export declare const selectKey: InjectionKey<SelectContext>;
export declare const selectEvents: {
    queryChange: string;
    groupQueryChange: string;
};
export interface SelectOptionProxy {
    value: string | number | Record<string, string>;
    label: string | number;
    created: boolean;
    disabled: boolean;
    currentLabel: string;
    itemSelected: boolean;
    isDisabled: boolean;
    select: SelectContext;
    hoverItem: () => void;
    visible: boolean;
    hover: boolean;
    selectOptionClick: () => void;
}
export {};
