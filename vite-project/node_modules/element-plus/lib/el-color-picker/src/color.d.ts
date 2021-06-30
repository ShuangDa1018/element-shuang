export interface Options {
    enableAlpha: boolean;
    format: string;
    value?: string;
}
export default class Color {
    private _hue;
    private _saturation;
    private _value;
    private _alpha;
    enableAlpha: boolean;
    format: string;
    value: string;
    selected?: boolean;
    constructor(options?: Options);
    set(prop: {
        [key: string]: any;
    } | any, value?: number): void;
    get(prop: string): any;
    toRgb(): {
        r: number;
        g: number;
        b: number;
    };
    fromString(value: any): void;
    compare(color: any): boolean;
    doOnChange(): void;
}
