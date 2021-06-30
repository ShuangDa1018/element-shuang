import ajax from './ajax';
import type { PropType } from 'vue';
import type { ListType, UploadFile, FileHandler, FileResultHandler } from './upload.type';
declare const _default: import("vue").DefineComponent<{
    action: {
        type: StringConstructor;
        required: true;
    };
    headers: {
        type: PropType<Headers>;
        default: () => {};
    };
    data: {
        type: ObjectConstructor;
        default: () => {};
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    drag: {
        type: BooleanConstructor;
        default: boolean;
    };
    withCredentials: BooleanConstructor;
    showFileList: {
        type: BooleanConstructor;
        default: boolean;
    };
    accept: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    beforeUpload: {
        type: PropType<FileHandler<void>>;
        default: () => void;
    };
    beforeRemove: {
        type: PropType<FileHandler<boolean>>;
        default: () => void;
    };
    onRemove: {
        type: PropType<FileHandler<void>>;
        default: () => void;
    };
    onChange: {
        type: PropType<FileHandler<void>>;
        default: () => void;
    };
    onPreview: {
        type: PropType<() => void>;
        default: () => void;
    };
    onSuccess: {
        type: PropType<FileResultHandler<any>>;
        default: () => void;
    };
    onProgress: {
        type: PropType<FileResultHandler<ProgressEvent<EventTarget>>>;
        default: () => void;
    };
    onError: {
        type: PropType<FileResultHandler<Error>>;
        default: () => void;
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
        default: ListType;
    };
    httpRequest: {
        type: FunctionConstructor;
        default: typeof ajax;
    };
    disabled: BooleanConstructor;
    limit: {
        type: PropType<number>;
        default: any;
    };
    onExceed: {
        type: FunctionConstructor;
        default: () => () => void;
    };
}, {
    abort: (file: UploadFile) => void;
    dragOver: import("vue").Ref<boolean>;
    draging: import("vue").Ref<boolean>;
    handleError: (err: Error, rawFile: import("./upload.type").ElFile) => void;
    handleProgress: (ev: import("./upload.type").ElUploadProgressEvent, rawFile: import("./upload.type").ElFile) => void;
    handleRemove: (file: UploadFile, raw: import("./upload.type").ElFile) => void;
    handleStart: (rawFile: import("./upload.type").ElFile) => void;
    handleSuccess: (res: any, rawFile: import("./upload.type").ElFile) => void;
    uploadDisabled: import("vue").ComputedRef<boolean>;
    uploadFiles: import("vue").Ref<{
        name: string;
        percentage?: number;
        status: import("./upload.type").UploadStatus;
        size: number;
        response?: unknown;
        uid: number;
        url?: string;
        raw: {
            uid: number;
            readonly lastModified: number;
            readonly name: string;
            readonly size: number;
            readonly type: string;
            arrayBuffer: () => Promise<ArrayBuffer>;
            slice: (start?: number, end?: number, contentType?: string) => Blob;
            stream: () => ReadableStream<any>;
            text: () => Promise<string>;
        };
    }[]>;
    uploadRef: import("vue").Ref<{
        abort: (file: UploadFile) => void;
        upload: (file: import("./upload.type").ElFile) => void;
    }>;
    submit: () => void;
    clearFiles: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    action: unknown;
    headers: unknown;
    data: Record<string, any>;
    multiple: boolean;
    name: unknown;
    drag: boolean;
    withCredentials: boolean;
    showFileList: boolean;
    accept: unknown;
    type: unknown;
    beforeUpload: unknown;
    beforeRemove: unknown;
    onRemove: unknown;
    onChange: unknown;
    onPreview: unknown;
    onSuccess: unknown;
    onProgress: unknown;
    onError: unknown;
    fileList: unknown;
    autoUpload: boolean;
    listType: unknown;
    httpRequest: unknown;
    disabled: boolean;
    onExceed: unknown;
} & {
    limit?: unknown;
}>, {
    headers: unknown;
    data: Record<string, any>;
    multiple: boolean;
    name: unknown;
    drag: boolean;
    withCredentials: boolean;
    showFileList: boolean;
    accept: unknown;
    type: unknown;
    beforeUpload: unknown;
    beforeRemove: unknown;
    onRemove: unknown;
    onChange: unknown;
    onPreview: unknown;
    onSuccess: unknown;
    onProgress: unknown;
    onError: unknown;
    fileList: unknown;
    autoUpload: boolean;
    listType: unknown;
    httpRequest: unknown;
    disabled: boolean;
    limit: unknown;
    onExceed: unknown;
}>;
export default _default;
