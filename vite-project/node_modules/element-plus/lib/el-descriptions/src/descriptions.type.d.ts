import { InjectionKey, PropType } from 'vue';
interface IDescriptionsInject {
    border: boolean;
    column: number;
    direction: PropType<'horizontal' | 'vertical'>;
    size: PropType<ComponentSize>;
    title: string;
    extra: string;
}
declare const elDescriptionsKey: InjectionKey<IDescriptionsInject>;
export { IDescriptionsInject, elDescriptionsKey, };
