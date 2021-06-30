import { IMenuGroupProps } from './menu';
declare const _default: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
    };
}, {
    data: {
        paddingLeft: number;
    };
    levelPadding: import("vue").ComputedRef<number>;
    props: IMenuGroupProps;
    slots: Readonly<{
        [name: string]: import("vue").Slot;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    title?: unknown;
}>, {}>;
export default _default;
