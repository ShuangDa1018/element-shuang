import type { UploadFile, ElFile, ElUploadProgressEvent, IUseHandlersProps } from './upload.type';
declare const _default: (props: IUseHandlersProps) => {
    abort: (file: UploadFile) => void;
    clearFiles: () => void;
    handleError: (err: Error, rawFile: ElFile) => void;
    handleProgress: (ev: ElUploadProgressEvent, rawFile: ElFile) => void;
    handleStart: (rawFile: ElFile) => void;
    handleSuccess: (res: any, rawFile: ElFile) => void;
    handleRemove: (file: UploadFile, raw: ElFile) => void;
    submit: () => void;
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
        upload: (file: ElFile) => void;
    }>;
};
export default _default;
