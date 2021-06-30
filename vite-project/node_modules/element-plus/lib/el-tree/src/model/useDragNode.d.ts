import { Emitter } from 'mitt';
export declare function useDragNodeHandler({ props, ctx, el$, dropIndicator$, store }: {
    props: any;
    ctx: any;
    el$: any;
    dropIndicator$: any;
    store: any;
}): {
    dragState: import("vue").Ref<{
        showDropIndicator: boolean;
        draggingNode: any;
        dropNode: any;
        allowDrop: boolean;
        dropType: any;
    }>;
};
interface DragNodeEmitter {
    emitter: Emitter;
}
export declare function useDragNodeEmitter(): DragNodeEmitter;
export {};
