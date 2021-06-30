import { ComputedRef } from 'vue';
import { TableColumnCtx } from './defaults';
declare function useWatcher<T>(owner: ComputedRef<any>, props_: Partial<TableColumnCtx<T>>): {
    registerComplexWatchers: () => void;
    registerNormalWatchers: () => void;
};
export default useWatcher;
