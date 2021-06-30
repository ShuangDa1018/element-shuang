import { App } from 'vue';
declare const _default: {
    install(app: App): void;
    directive: {
        mounted(el: any, binding: any): void;
        updated(el: any, binding: any): void;
        unmounted(el: any): void;
    };
    service: (options?: import("./src/loading.type").ILoadingOptions) => import("./src/loading.type").ILoadingInstance;
};
export default _default;
