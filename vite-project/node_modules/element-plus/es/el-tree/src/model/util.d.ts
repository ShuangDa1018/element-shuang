import Node from './node';
import { TreeKey, TreeNodeData } from '../tree.type';
export declare const NODE_KEY = "$treeNodeId";
export declare const markNodeData: (node: Node, data: TreeNodeData) => void;
export declare const getNodeKey: (key: TreeKey, data: TreeNodeData) => any;
