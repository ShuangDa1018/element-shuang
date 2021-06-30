import { RootMenuProvider } from './menu';
declare const _default: import("vue").DefineComponent<{
    index: {
        default: any;
        validator: (val: unknown) => boolean;
    };
    route: (ObjectConstructor | StringConstructor)[];
    disabled: BooleanConstructor;
}, {
    parentMenu: import("vue").ComputedRef<import("vue").ComponentInternalInstance>;
    rootMenu: RootMenuProvider;
    slots: Readonly<{
        [name: string]: import("vue").Slot;
    }>;
    paddingStyle: import("vue").ComputedRef<{
        paddingLeft?: undefined;
    } | {
        paddingLeft: string;
    }>;
    itemStyle: import("vue").ComputedRef<{
        color: string;
        borderBottomColor: string;
    }>;
    backgroundColor: import("vue").ComputedRef<string>;
    active: import("vue").ComputedRef<boolean>;
    handleClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    disabled: boolean;
} & {
    index?: unknown;
    route?: unknown;
}>, {
    disabled: boolean;
    index: unknown;
}>;
export default _default;
