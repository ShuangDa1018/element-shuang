export declare function useOption(props: any, states: any): {
    select: import("./token").SelectContext;
    currentLabel: import("vue").ComputedRef<any>;
    currentValue: import("vue").ComputedRef<any>;
    itemSelected: import("vue").ComputedRef<boolean>;
    isDisabled: import("vue").ComputedRef<any>;
    hoverItem: () => void;
};
