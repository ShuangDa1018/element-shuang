import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    files: {
        type: PropType<File[]>;
        default: () => File[];
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    handlePreview: {
        type: PropType<(file: File) => void>;
        default: () => () => void;
    };
    listType: {
        type: PropType<"picture" | "picture-card" | "text">;
        default: string;
    };
}, {
    focusing: import("vue").Ref<boolean>;
    parsePercentage: (val: string) => number;
    handleClick: (file: File) => void;
    handleRemove: (e: Event, file: File) => void;
    onFileClicked: (e: Event) => void;
    t: (...args: any[]) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "remove"[], "remove", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    files: unknown;
    disabled: boolean;
    handlePreview: unknown;
    listType: unknown;
} & {}>, {
    files: unknown;
    disabled: boolean;
    handlePreview: unknown;
    listType: unknown;
}>;
export default _default;
