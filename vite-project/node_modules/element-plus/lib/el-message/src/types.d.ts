import type { VNode } from 'vue';
export interface IMessageHandle {
    close: () => void;
}
export declare type IMessageOptions = {
    customClass?: string;
    center?: boolean;
    dangerouslyUseHTMLString?: boolean;
    duration?: number;
    iconClass?: string;
    id?: string;
    message?: string | VNode;
    offset?: number;
    onClose?: () => void;
    showClose?: boolean;
    type?: 'success' | 'warning' | 'info' | 'error' | '';
    zIndex?: number;
};
export declare type MessageType = 'success' | 'warning' | 'info' | 'error' | '';
export declare type IMessageDispatcher = (options?: IMessageOptions | string) => IMessageHandle;
export declare type MessageParams = IMessageOptions | string;
export declare type TypedMessageParams<T extends MessageType> = {
    type: T;
} & Omit<IMessageOptions, 'type'> | string;
export interface IMessage {
    (options?: MessageParams): IMessageHandle;
    success: (options?: TypedMessageParams<'success'>) => IMessageHandle;
    warning: (options?: TypedMessageParams<'warning'>) => IMessageHandle;
    info: (options?: TypedMessageParams<'info'>) => IMessageHandle;
    error: (options?: TypedMessageParams<'error'>) => IMessageHandle;
    closeAll(): void;
}
export declare type MessageVM = VNode;
declare type MessageQueueItem = {
    vm: MessageVM;
};
export declare type MessageQueue = Array<MessageQueueItem>;
export {};
