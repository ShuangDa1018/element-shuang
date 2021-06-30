import { Ref } from 'vue';
import { WatcherPropsData } from './index';
declare function useCurrent<T>(watcherData: WatcherPropsData<T>): {
    setCurrentRowKey: (key: string) => void;
    restoreCurrentRowKey: () => void;
    setCurrentRowByKey: (key: string) => void;
    updateCurrentRow: (_currentRow: T) => void;
    updateCurrentRowData: () => void;
    states: {
        _currentRowKey: Ref<string>;
        currentRow: Ref<T>;
    };
};
export default useCurrent;
