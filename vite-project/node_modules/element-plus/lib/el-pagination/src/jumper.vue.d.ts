declare const _default: import("vue").DefineComponent<{}, {
    t: (...args: any[]) => string;
    userInput: import("vue").Ref<number>;
    pageCount: import("vue").ComputedRef<number>;
    disabled: import("vue").ComputedRef<boolean>;
    handleInput: (val: number | string) => void;
    handleChange: (val: number | string) => void;
    innerValue: import("vue").ComputedRef<number>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {}>, {}>;
export default _default;
