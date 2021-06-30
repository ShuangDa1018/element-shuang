import { ComponentInternalInstance } from 'vue';
export default function useMenu(instance: ComponentInternalInstance, currentIndex: string): {
    parentMenu: import("vue").ComputedRef<ComponentInternalInstance>;
    paddingStyle: import("vue").ComputedRef<{
        paddingLeft?: undefined;
    } | {
        paddingLeft: string;
    }>;
    indexPath: import("vue").ComputedRef<string[]>;
};
