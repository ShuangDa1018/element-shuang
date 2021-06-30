import { PropType, ComponentInternalInstance } from 'vue';
import Node from './model/node';
import { TreeOptionProps, TreeNodeData, RootTreeType } from './tree.type';
declare const _default: import("vue").DefineComponent<{
    node: {
        type: typeof Node;
        default: () => {};
    };
    props: {
        type: PropType<TreeOptionProps>;
        default: () => {};
    };
    renderContent: FunctionConstructor;
    renderAfterExpand: BooleanConstructor;
    showCheckbox: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    node$: import("vue").Ref<HTMLElement>;
    tree: RootTreeType;
    expanded: import("vue").Ref<boolean>;
    childNodeRendered: import("vue").Ref<boolean>;
    oldChecked: import("vue").Ref<boolean>;
    oldIndeterminate: import("vue").Ref<boolean>;
    emitter: import("mitt").Emitter;
    parent: Window;
    getNodeKey: (node: Node) => any;
    handleSelectChange: (checked: boolean, indeterminate: boolean) => void;
    handleClick: () => void;
    handleContextMenu: (event: Event) => void;
    handleExpandIconClick: () => void;
    handleCheckChange: (value: any, ev: any) => void;
    handleChildNodeExpand: (nodeData: TreeNodeData, node: Node, instance: ComponentInternalInstance) => void;
    handleDragStart: (event: DragEvent) => void;
    handleDragOver: (event: DragEvent) => void;
    handleDrop: (event: DragEvent) => void;
    handleDragEnd: (event: DragEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "node-expand"[], "node-expand", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    node: unknown;
    props: unknown;
    renderAfterExpand: boolean;
    showCheckbox: boolean;
} & {
    renderContent?: unknown;
}>, {
    node: unknown;
    props: unknown;
    renderAfterExpand: boolean;
    showCheckbox: boolean;
}>;
export default _default;
