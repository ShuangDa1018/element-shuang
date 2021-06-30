export declare const LEFT_CHECK_CHANGE_EVENT = "left-check-change";
export declare const RIGHT_CHECK_CHANGE_EVENT = "right-check-change";
import type { TransferCheckedState, Key } from './transfer';
export declare const useCheckedChange: (checkedState: TransferCheckedState, emit: any) => {
    onSourceCheckedChange: (val: Key[], movedKeys: Key[]) => void;
    onTargetCheckedChange: (val: Key[], movedKeys: Key[]) => void;
};
