declare const _default: import("vue").DefineComponent<readonly string[] | Readonly<import("vue").ComponentObjectPropsOptions<Record<string, unknown>>>, {
    labelProp: import("vue").ComputedRef<string>;
    keyProp: import("vue").ComputedRef<string>;
    disabledProp: import("vue").ComputedRef<string>;
    filteredData: import("vue").ComputedRef<import("./transfer").DataItem[]>;
    checkedSummary: import("vue").ComputedRef<string>;
    isIndeterminate: import("vue").ComputedRef<boolean>;
    handleAllCheckedChange: (value: (string | number)[]) => void;
    checked: import("vue").Ref<any[]>;
    allChecked: import("vue").Ref<boolean>;
    query: import("vue").Ref<string>;
    inputHover: import("vue").Ref<boolean>;
    checkChangeByUser: import("vue").Ref<boolean>;
    hasNoMatch: import("vue").ComputedRef<boolean>;
    inputIcon: import("vue").ComputedRef<"circle-close" | "search">;
    hasFooter: import("vue").ComputedRef<boolean>;
    clearQuery: () => void;
    t: (...args: any[]) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "checked-change"[], "checked-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    [x: number]: unknown;
} & {
    length?: unknown;
    toString?: unknown;
    toLocaleString?: unknown;
    concat?: unknown;
    join?: unknown;
    slice?: unknown;
    indexOf?: unknown;
    lastIndexOf?: unknown;
    every?: unknown;
    some?: unknown;
    forEach?: unknown;
    map?: unknown;
    filter?: unknown;
    reduce?: unknown;
    reduceRight?: unknown;
    find?: unknown;
    findIndex?: unknown;
    entries?: unknown;
    keys?: unknown;
    values?: unknown;
    includes?: unknown;
    flatMap?: unknown;
    flat?: unknown;
}> | Readonly<{} & {
    [x: string]: unknown;
}>, {
    [x: number]: unknown;
} | {}>;
export default _default;
