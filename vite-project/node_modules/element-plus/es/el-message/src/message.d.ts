import type { IMessage, MessageVM } from './types';
declare const Message: IMessage;
export declare function close(id: string, userOnClose?: (vm: MessageVM) => void): void;
export declare function closeAll(): void;
export default Message;
