export interface InstallOptions {
    size: ComponentSize;
    zIndex: number;
    locale?: any;
    i18n?: (...args: any[]) => string;
}
declare const setConfig: (option: InstallOptions) => void;
declare const getConfig: (key: keyof InstallOptions) => unknown;
export { getConfig, setConfig, };
