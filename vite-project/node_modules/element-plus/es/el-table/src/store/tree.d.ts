import { WatcherPropsData } from './index';
declare function useTree<T>(watcherData: WatcherPropsData<T>): {
    loadData: (row: T, key: string, treeNode: any) => void;
    loadOrToggle: (row: any) => void;
    toggleTreeExpansion: (row: T, expanded?: boolean) => void;
    updateTreeExpandKeys: (value: string[]) => void;
    updateTreeData: () => void;
    normalize: (data: any) => {};
    states: {
        expandRowKeys: import("vue").Ref<string[]>;
        treeData: import("vue").Ref<unknown>;
        indent: import("vue").Ref<number>;
        lazy: import("vue").Ref<boolean>;
        lazyTreeNodeMap: import("vue").Ref<{}>;
        lazyColumnIdentifier: import("vue").Ref<string>;
        childrenColumnName: import("vue").Ref<string>;
    };
};
export default useTree;
