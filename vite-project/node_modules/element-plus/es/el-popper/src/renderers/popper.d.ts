import type { VNode, Ref } from 'vue';
import type { Effect } from '../use-popper/defaults';
interface IRenderPopperProps {
    effect: Effect;
    name: string;
    stopPopperMouseEvent: boolean;
    popperClass: string;
    popperStyle?: Partial<CSSStyleDeclaration>;
    popperId: string;
    popperRef?: Ref<HTMLElement>;
    pure?: boolean;
    visibility: boolean;
    onMouseenter: () => void;
    onMouseleave: () => void;
    onAfterEnter?: () => void;
    onAfterLeave?: () => void;
    onBeforeEnter?: () => void;
    onBeforeLeave?: () => void;
}
export default function renderPopper(props: IRenderPopperProps, children: VNode[]): VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
export {};
