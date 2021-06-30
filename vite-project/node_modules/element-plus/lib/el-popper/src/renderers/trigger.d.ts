import type { VNode, Ref, ComponentPublicInstance } from 'vue';
declare type EventHandler = (e: Event) => any;
interface IRenderTriggerProps extends Record<string, unknown> {
    ref: string | Ref<ComponentPublicInstance | HTMLElement>;
    onClick?: EventHandler;
    onMouseover?: EventHandler;
    onMouseleave?: EventHandler;
    onFocus?: EventHandler;
}
export default function renderTrigger(trigger: VNode[], extraProps: IRenderTriggerProps): VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
export {};
