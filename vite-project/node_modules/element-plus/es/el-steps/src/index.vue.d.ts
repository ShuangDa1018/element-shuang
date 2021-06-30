declare const _default: import("vue").DefineComponent<{
    space: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    active: {
        type: NumberConstructor;
        default: number;
    };
    direction: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    alignCenter: {
        type: BooleanConstructor;
        default: boolean;
    };
    simple: {
        type: BooleanConstructor;
        default: boolean;
    };
    finishStatus: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    processStatus: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
}, {
    steps: import("vue").Ref<any[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    space: unknown;
    active: unknown;
    direction: unknown;
    alignCenter: boolean;
    simple: boolean;
    finishStatus: unknown;
    processStatus: unknown;
} & {}>, {
    space: unknown;
    active: unknown;
    direction: unknown;
    alignCenter: boolean;
    simple: boolean;
    finishStatus: unknown;
    processStatus: unknown;
}>;
export default _default;
