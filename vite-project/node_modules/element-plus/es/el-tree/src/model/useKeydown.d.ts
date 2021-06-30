import { Ref } from 'vue';
import TreeStore from './tree-store';
interface UseKeydownOption {
    el$: Ref<HTMLElement>;
}
export declare function useKeydown({ el$ }: UseKeydownOption, store: Ref<TreeStore>): void;
export {};
