import type { INotification, NotificationVM, Position } from './notification.type';
declare const Notification: INotification;
export declare function close(id: string, position: Position, userOnClose?: (vm: NotificationVM) => void): void;
export declare function closeAll(): void;
export default Notification;
