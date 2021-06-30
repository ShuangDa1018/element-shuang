export declare interface IOptions {
    drag?: (event: Event) => void;
    start?: (event: Event) => void;
    end?: (event: Event) => void;
}
export default function (element: HTMLElement, options: IOptions): void;
