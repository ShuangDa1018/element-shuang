import { TransferPanelProps, TransferPanelState, Key } from './transfer';
export declare const CHECKED_CHANGE_EVENT = "checked-change";
export declare const useCheck: (props: TransferPanelProps, panelState: TransferPanelState, emit: any) => {
    labelProp: import("vue").ComputedRef<string>;
    keyProp: import("vue").ComputedRef<string>;
    disabledProp: import("vue").ComputedRef<string>;
    filteredData: import("vue").ComputedRef<import("./transfer").DataItem[]>;
    checkableData: import("vue").ComputedRef<import("./transfer").DataItem[]>;
    checkedSummary: import("vue").ComputedRef<string>;
    isIndeterminate: import("vue").ComputedRef<boolean>;
    updateAllChecked: () => void;
    handleAllCheckedChange: (value: Key[]) => void;
};
