import { TransferProps } from './transfer';
export declare const useComputedData: (props: TransferProps) => {
    propsKey: import("vue").ComputedRef<string>;
    sourceData: import("vue").ComputedRef<import("./transfer").DataItem[]>;
    targetData: import("vue").ComputedRef<any[]>;
};
