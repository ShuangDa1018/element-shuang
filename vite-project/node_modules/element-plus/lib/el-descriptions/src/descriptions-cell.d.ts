import { IDescriptionsInject } from './descriptions.type';
declare const _default: import("vue").DefineComponent<{
    cell: {
        type: ObjectConstructor;
    };
    tag: {
        type: StringConstructor;
    };
    type: {
        type: StringConstructor;
    };
}, {
    descriptions: IDescriptionsInject;
    label: import("vue").ComputedRef<any>;
    content: import("vue").ComputedRef<any>;
    span: import("vue").ComputedRef<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    cell?: Record<string, any>;
    tag?: unknown;
    type?: unknown;
}>, {}>;
export default _default;
