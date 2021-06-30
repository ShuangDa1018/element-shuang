import type { VNode } from 'vue';
export declare type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export interface INotificationHandle {
    close: () => void;
}
export declare type INotification = (options?: INotificationOptions) => INotificationHandle;
export declare type INotificationOptions = {
    customClass?: string;
    dangerouslyUseHTMLString?: boolean;
    duration?: number;
    iconClass?: string;
    id?: string;
    message?: string | VNode;
    zIndex?: number;
    onClose?: () => void;
    onClick?: () => void;
    offset?: number;
    position?: Position;
    showClose?: boolean;
    type?: 'success' | 'warning' | 'info' | 'error' | '';
    title?: string;
};
export declare type NotificationVM = VNode;
declare type NotificationQueueItem = {
    vm: NotificationVM;
};
export declare type NotificationQueue = Array<NotificationQueueItem>;
export {};
