import type { Ref } from 'vue';
export declare type Event = {
    name: string;
    handler: (...args: any[]) => any;
};
declare const _default: (el: Ref<HTMLElement>, events: Event[]) => void;
export default _default;
