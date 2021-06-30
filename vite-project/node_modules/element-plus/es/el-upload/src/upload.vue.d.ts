import ajax from './ajax';
import type { PropType } from 'vue';
import type { ListType, UploadFile, ElFile } from './upload.type';
declare type IFileHanlder = (file: Nullable<ElFile[]>, fileList?: UploadFile[]) => unknown;
declare type AjaxEventListener = (e: ProgressEvent, file: ElFile) => unknown;
declare const _default: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        default: string;
    };
    action: {
        type: StringConstructor;
        required: true;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    data: {
        type: PropType<Record<string, any>>;
        default: () => any;
    };
    headers: {
        type: PropType<Partial<Headers>>;
        default: () => any;
    };
    withCredentials: {
        type: BooleanConstructor;
        default: boolean;
    };
    multiple: {
        type: PropType<boolean>;
        default: any;
    };
    accept: {
        type: StringConstructor;
        default: string;
    };
    onStart: {
        type: PropType<(file: File) => void>;
        default: (file: File) => void;
    };
    onProgress: {
        type: PropType<AjaxEventListener>;
        default: AjaxEventListener;
    };
    onSuccess: {
        type: PropType<AjaxEventListener>;
        default: AjaxEventListener;
    };
    onError: {
        type: PropType<AjaxEventListener>;
        default: AjaxEventListener;
    };
    beforeUpload: {
        type: PropType<(file: File) => Promise<File | Blob> | boolean | unknown>;
        default: (file: File) => void;
    };
    drag: {
        type: BooleanConstructor;
        default: boolean;
    };
    onPreview: {
        type: PropType<IFileHanlder>;
        default: IFileHanlder;
    };
    onRemove: {
        type: PropType<(file: Nullable<FileList>, rawFile: ElFile) => void>;
        default: (file: Nullable<FileList>, rawFile: ElFile) => void;
    };
    fileList: {
        type: PropType<UploadFile[]>;
        default: () => UploadFile[];
    };
    autoUpload: {
        type: BooleanConstructor;
        default: boolean;
    };
    listType: {
        type: PropType<ListType>;
        default: string;
    };
    httpRequest: {
        type: (new (...args: any[]) => typeof ajax) | (() => typeof ajax) | {
            (): typeof ajax;
            new (): any;
            readonly prototype: any;
        } | ((new (...args: any[]) => typeof ajax) | (() => typeof ajax) | {
            (): typeof ajax;
            new (): any;
            readonly prototype: any;
        })[] | (new (...args: any[]) => (...args: unknown[]) => Promise<unknown>) | (() => (...args: unknown[]) => Promise<unknown>) | {
            (): (...args: unknown[]) => Promise<unknown>;
            new (): any;
            readonly prototype: any;
        } | ((new (...args: any[]) => (...args: unknown[]) => Promise<unknown>) | (() => (...args: unknown[]) => Promise<unknown>) | {
            (): (...args: unknown[]) => Promise<unknown>;
            new (): any;
            readonly prototype: any;
        })[];
        default: () => typeof ajax;
    };
    disabled: BooleanConstructor;
    limit: {
        type: PropType<number>;
        default: any;
    };
    onExceed: {
        type: PropType<(files: FileList, fileList: UploadFile[]) => void>;
        default: () => void;
    };
}, {
    reqs: import("vue").Ref<{
        [x: string]: ({
            then: <TResult1 = any, TResult2 = never>(onfulfilled?: (value: any) => TResult1 | PromiseLike<TResult1>, onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>) => Promise<TResult1 | TResult2>;
            catch: <TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>) => Promise<any>;
            finally: (onfinally?: () => void) => Promise<any>;
        } & {
            [Symbol.toStringTag]: string;
        }) | {
            onreadystatechange: (this: XMLHttpRequest, ev: Event) => any;
            readonly readyState: number;
            readonly response: any;
            readonly responseText: string;
            responseType: XMLHttpRequestResponseType;
            readonly responseURL: string;
            readonly responseXML: Document;
            readonly status: number;
            readonly statusText: string;
            timeout: number;
            readonly upload: {
                addEventListener: {
                    <K extends "timeout" | "abort" | "error" | "load" | "loadend" | "loadstart" | "progress">(type: K, listener: (this: XMLHttpRequestUpload, ev: XMLHttpRequestEventTargetEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
                    (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
                };
                removeEventListener: {
                    <K_1 extends "timeout" | "abort" | "error" | "load" | "loadend" | "loadstart" | "progress">(type: K_1, listener: (this: XMLHttpRequestUpload, ev: XMLHttpRequestEventTargetEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
                    (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
                };
                onabort: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
                onerror: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
                onload: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
                onloadend: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
                onloadstart: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
                onprogress: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
                ontimeout: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
                dispatchEvent: (event: Event) => boolean;
            };
            withCredentials: boolean;
            abort: () => void;
            getAllResponseHeaders: () => string;
            getResponseHeader: (name: string) => string;
            open: {
                (method: string, url: string): void;
                (method: string, url: string, async: boolean, username?: string, password?: string): void;
            };
            overrideMimeType: (mime: string) => void;
            send: (body?: string | Blob | Document | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array>) => void;
            setRequestHeader: (name: string, value: string) => void;
            readonly DONE: number;
            readonly HEADERS_RECEIVED: number;
            readonly LOADING: number;
            readonly OPENED: number;
            readonly UNSENT: number;
            addEventListener: {
                <K_2 extends "timeout" | "abort" | "error" | "load" | "loadend" | "loadstart" | "progress" | "readystatechange">(type: K_2, listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K_2]) => any, options?: boolean | AddEventListenerOptions): void;
                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
            };
            removeEventListener: {
                <K_3 extends "timeout" | "abort" | "error" | "load" | "loadend" | "loadstart" | "progress" | "readystatechange">(type: K_3, listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K_3]) => any, options?: boolean | EventListenerOptions): void;
                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
            };
            onabort: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
            onerror: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
            onload: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
            onloadend: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
            onloadstart: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
            onprogress: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
            ontimeout: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
            dispatchEvent: (event: Event) => boolean;
        };
    }>;
    mouseover: import("vue").Ref<boolean>;
    inputRef: import("vue").Ref<HTMLInputElement>;
    abort: (file: any) => void;
    post: (rawFile: ElFile) => void;
    handleChange: (e: DragEvent) => void;
    handleClick: () => void;
    handleKeydown: () => void;
    upload: (rawFile: ElFile) => void;
    uploadFiles: (files: FileList) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type: unknown;
    action: unknown;
    name: unknown;
    withCredentials: boolean;
    accept: unknown;
    onStart: unknown;
    onProgress: unknown;
    onSuccess: unknown;
    onError: unknown;
    beforeUpload: unknown;
    drag: boolean;
    onPreview: unknown;
    onRemove: unknown;
    fileList: unknown;
    autoUpload: boolean;
    listType: unknown;
    httpRequest: unknown;
    disabled: boolean;
    onExceed: unknown;
} & {
    data?: unknown;
    headers?: unknown;
    multiple?: unknown;
    limit?: unknown;
}>, {
    type: unknown;
    name: unknown;
    data: unknown;
    headers: unknown;
    withCredentials: boolean;
    multiple: unknown;
    accept: unknown;
    onStart: unknown;
    onProgress: unknown;
    onSuccess: unknown;
    onError: unknown;
    beforeUpload: unknown;
    drag: boolean;
    onPreview: unknown;
    onRemove: unknown;
    fileList: unknown;
    autoUpload: boolean;
    listType: unknown;
    httpRequest: unknown;
    disabled: boolean;
    limit: unknown;
    onExceed: unknown;
}>;
export default _default;
