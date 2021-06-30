import type { App } from 'vue';
import type { SFCWithInstall } from '../utils/types';
declare const _default: SFCWithInstall<{
    new (...args: any[]): ({
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: (Partial<{
            [x: number]: unknown;
        }> & Pick<(Readonly<{
            [x: number]: unknown;
        } & {
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            concat?: unknown;
            join?: unknown;
            slice?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            find?: unknown;
            findIndex?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps) | (Readonly<{
            [x: number]: unknown;
        } & {
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            concat?: unknown;
            join?: unknown;
            slice?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            find?: unknown;
            findIndex?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<{} & {
            [x: string]: unknown;
        }>) | (Readonly<{} & {
            [x: string]: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<{
            [x: number]: unknown;
        } & {
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            concat?: unknown;
            join?: unknown;
            slice?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            find?: unknown;
            findIndex?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
        }>) | (Readonly<{} & {
            [x: string]: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps), "length" | "toString" | "toLocaleString" | "concat" | "join" | "slice" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "map" | "filter" | "reduce" | "reduceRight" | "find" | "findIndex" | "entries" | "keys" | "values" | "includes" | "flatMap" | "flat" | "key" | "ref" | "onVnodeBeforeMount" | "onVnodeMounted" | "onVnodeBeforeUpdate" | "onVnodeUpdated" | "onVnodeBeforeUnmount" | "onVnodeUnmounted" | "class" | "style" | ((() => string) & string) | ((() => string) & string) | ({
            (...items: ConcatArray<never>[]): never[];
            (...items: ConcatArray<never>[]): never[];
        } & string) | (((separator?: string) => string) & string) | (((start?: number, end?: number) => never[]) & string) | (((searchElement: never, fromIndex?: number) => number) & string) | (((searchElement: never, fromIndex?: number) => number) & string) | ({
            <S extends never>(predicate: (value: never, index: number, array: readonly never[]) => value is S, thisArg?: any): this is readonly S[];
            (predicate: (value: never, index: number, array: readonly never[]) => unknown, thisArg?: any): boolean;
        } & string) | (((predicate: (value: never, index: number, array: readonly never[]) => unknown, thisArg?: any) => boolean) & string) | (((callbackfn: (value: never, index: number, array: readonly never[]) => void, thisArg?: any) => void) & string) | ((<U>(callbackfn: (value: never, index: number, array: readonly never[]) => U, thisArg?: any) => U[]) & string) | ({
            <S_1 extends never>(predicate: (value: never, index: number, array: readonly never[]) => value is S_1, thisArg?: any): S_1[];
            (predicate: (value: never, index: number, array: readonly never[]) => unknown, thisArg?: any): never[];
        } & string) | ({
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never): never;
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never, initialValue: never): never;
            <U_1>(callbackfn: (previousValue: U_1, currentValue: never, currentIndex: number, array: readonly never[]) => U_1, initialValue: U_1): U_1;
        } & string) | ({
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never): never;
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never, initialValue: never): never;
            <U_2>(callbackfn: (previousValue: U_2, currentValue: never, currentIndex: number, array: readonly never[]) => U_2, initialValue: U_2): U_2;
        } & string) | ({
            <S_2 extends never>(predicate: (this: void, value: never, index: number, obj: readonly never[]) => value is S_2, thisArg?: any): S_2;
            (predicate: (value: never, index: number, obj: readonly never[]) => unknown, thisArg?: any): never;
        } & string) | (((predicate: (value: never, index: number, obj: readonly never[]) => unknown, thisArg?: any) => number) & string) | ((() => IterableIterator<[number, never]>) & string) | ((() => IterableIterator<number>) & string) | ((() => IterableIterator<never>) & string) | (((searchElement: never, fromIndex?: number) => boolean) & string) | ((<U_3, This = undefined>(callback: (this: This, value: never, index: number, array: never[]) => U_3 | readonly U_3[], thisArg?: This) => U_3[]) & string) | ((<A, D extends number = 1>(this: A, depth?: D) => FlatArray<A, D>[]) & string)>) | (Partial<{}> & Pick<(Readonly<{
            [x: number]: unknown;
        } & {
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            concat?: unknown;
            join?: unknown;
            slice?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            find?: unknown;
            findIndex?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps) | (Readonly<{
            [x: number]: unknown;
        } & {
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            concat?: unknown;
            join?: unknown;
            slice?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            find?: unknown;
            findIndex?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<{} & {
            [x: string]: unknown;
        }>) | (Readonly<{} & {
            [x: string]: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<{
            [x: number]: unknown;
        } & {
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            concat?: unknown;
            join?: unknown;
            slice?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            find?: unknown;
            findIndex?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
        }>) | (Readonly<{} & {
            [x: string]: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps), "length" | "toString" | "toLocaleString" | "concat" | "join" | "slice" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "map" | "filter" | "reduce" | "reduceRight" | "find" | "findIndex" | "entries" | "keys" | "values" | "includes" | "flatMap" | "flat" | "key" | "ref" | "onVnodeBeforeMount" | "onVnodeMounted" | "onVnodeBeforeUpdate" | "onVnodeUpdated" | "onVnodeBeforeUnmount" | "onVnodeUnmounted" | "class" | "style" | ((() => string) & string) | ((() => string) & string) | ({
            (...items: ConcatArray<never>[]): never[];
            (...items: ConcatArray<never>[]): never[];
        } & string) | (((separator?: string) => string) & string) | (((start?: number, end?: number) => never[]) & string) | (((searchElement: never, fromIndex?: number) => number) & string) | (((searchElement: never, fromIndex?: number) => number) & string) | ({
            <S extends never>(predicate: (value: never, index: number, array: readonly never[]) => value is S, thisArg?: any): this is readonly S[];
            (predicate: (value: never, index: number, array: readonly never[]) => unknown, thisArg?: any): boolean;
        } & string) | (((predicate: (value: never, index: number, array: readonly never[]) => unknown, thisArg?: any) => boolean) & string) | (((callbackfn: (value: never, index: number, array: readonly never[]) => void, thisArg?: any) => void) & string) | ((<U>(callbackfn: (value: never, index: number, array: readonly never[]) => U, thisArg?: any) => U[]) & string) | ({
            <S_1 extends never>(predicate: (value: never, index: number, array: readonly never[]) => value is S_1, thisArg?: any): S_1[];
            (predicate: (value: never, index: number, array: readonly never[]) => unknown, thisArg?: any): never[];
        } & string) | ({
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never): never;
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never, initialValue: never): never;
            <U_1>(callbackfn: (previousValue: U_1, currentValue: never, currentIndex: number, array: readonly never[]) => U_1, initialValue: U_1): U_1;
        } & string) | ({
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never): never;
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never, initialValue: never): never;
            <U_2>(callbackfn: (previousValue: U_2, currentValue: never, currentIndex: number, array: readonly never[]) => U_2, initialValue: U_2): U_2;
        } & string) | ({
            <S_2 extends never>(predicate: (this: void, value: never, index: number, obj: readonly never[]) => value is S_2, thisArg?: any): S_2;
            (predicate: (value: never, index: number, obj: readonly never[]) => unknown, thisArg?: any): never;
        } & string) | (((predicate: (value: never, index: number, obj: readonly never[]) => unknown, thisArg?: any) => number) & string) | ((() => IterableIterator<[number, never]>) & string) | ((() => IterableIterator<number>) & string) | ((() => IterableIterator<never>) & string) | (((searchElement: never, fromIndex?: number) => boolean) & string) | ((<U_3, This = undefined>(callback: (this: This, value: never, index: number, array: never[]) => U_3 | readonly U_3[], thisArg?: This) => U_3[]) & string) | ((<A, D extends number = 1>(this: A, depth?: D) => FlatArray<A, D>[]) & string)>);
        $attrs: Record<string, unknown>;
        $refs: Record<string, unknown>;
        $slots: Readonly<{
            [name: string]: import("vue").Slot;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
        $emit: ((event: string, ...args: any[]) => void) | ((event: string, ...args: any[]) => void);
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<{
            [x: number]: unknown;
        } & {
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            concat?: unknown;
            join?: unknown;
            slice?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            find?: unknown;
            findIndex?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
        }> | Readonly<{} & {
            [x: string]: unknown;
        }>, unknown, unknown, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, any>, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, any>, import("vue").EmitsOptions, string, {
            [x: number]: unknown;
        } | {}> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>, info: string) => boolean | void)[];
        };
        $forceUpdate: import("vue").ReactiveEffect<any>;
        $nextTick: typeof import("vue").nextTick;
        $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean>): import("vue").WatchStopHandle;
    } & Readonly<{
        [x: number]: unknown;
    } & {
        length?: unknown;
        toString?: unknown;
        toLocaleString?: unknown;
        concat?: unknown;
        join?: unknown;
        slice?: unknown;
        indexOf?: unknown;
        lastIndexOf?: unknown;
        every?: unknown;
        some?: unknown;
        forEach?: unknown;
        map?: unknown;
        filter?: unknown;
        reduce?: unknown;
        reduceRight?: unknown;
        find?: unknown;
        findIndex?: unknown;
        entries?: unknown;
        keys?: unknown;
        values?: unknown;
        includes?: unknown;
        flatMap?: unknown;
        flat?: unknown;
    }> & import("vue").ShallowUnwrapRef<{}> & {} & {
        [x: string]: never;
    } & import("vue").MethodOptions & import("vue").ComponentCustomProperties) | ({
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: (Partial<{
            [x: number]: unknown;
        }> & Pick<(Readonly<{
            [x: number]: unknown;
        } & {
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            concat?: unknown;
            join?: unknown;
            slice?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            find?: unknown;
            findIndex?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps) | (Readonly<{
            [x: number]: unknown;
        } & {
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            concat?: unknown;
            join?: unknown;
            slice?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            find?: unknown;
            findIndex?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<{} & {
            [x: string]: unknown;
        }>) | (Readonly<{} & {
            [x: string]: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<{
            [x: number]: unknown;
        } & {
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            concat?: unknown;
            join?: unknown;
            slice?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            find?: unknown;
            findIndex?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
        }>) | (Readonly<{} & {
            [x: string]: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps), "length" | "toString" | "toLocaleString" | "concat" | "join" | "slice" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "map" | "filter" | "reduce" | "reduceRight" | "find" | "findIndex" | "entries" | "keys" | "values" | "includes" | "flatMap" | "flat" | "key" | "ref" | "onVnodeBeforeMount" | "onVnodeMounted" | "onVnodeBeforeUpdate" | "onVnodeUpdated" | "onVnodeBeforeUnmount" | "onVnodeUnmounted" | "class" | "style" | ((() => string) & string) | ((() => string) & string) | ({
            (...items: ConcatArray<never>[]): never[];
            (...items: ConcatArray<never>[]): never[];
        } & string) | (((separator?: string) => string) & string) | (((start?: number, end?: number) => never[]) & string) | (((searchElement: never, fromIndex?: number) => number) & string) | (((searchElement: never, fromIndex?: number) => number) & string) | ({
            <S extends never>(predicate: (value: never, index: number, array: readonly never[]) => value is S, thisArg?: any): this is readonly S[];
            (predicate: (value: never, index: number, array: readonly never[]) => unknown, thisArg?: any): boolean;
        } & string) | (((predicate: (value: never, index: number, array: readonly never[]) => unknown, thisArg?: any) => boolean) & string) | (((callbackfn: (value: never, index: number, array: readonly never[]) => void, thisArg?: any) => void) & string) | ((<U>(callbackfn: (value: never, index: number, array: readonly never[]) => U, thisArg?: any) => U[]) & string) | ({
            <S_1 extends never>(predicate: (value: never, index: number, array: readonly never[]) => value is S_1, thisArg?: any): S_1[];
            (predicate: (value: never, index: number, array: readonly never[]) => unknown, thisArg?: any): never[];
        } & string) | ({
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never): never;
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never, initialValue: never): never;
            <U_1>(callbackfn: (previousValue: U_1, currentValue: never, currentIndex: number, array: readonly never[]) => U_1, initialValue: U_1): U_1;
        } & string) | ({
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never): never;
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never, initialValue: never): never;
            <U_2>(callbackfn: (previousValue: U_2, currentValue: never, currentIndex: number, array: readonly never[]) => U_2, initialValue: U_2): U_2;
        } & string) | ({
            <S_2 extends never>(predicate: (this: void, value: never, index: number, obj: readonly never[]) => value is S_2, thisArg?: any): S_2;
            (predicate: (value: never, index: number, obj: readonly never[]) => unknown, thisArg?: any): never;
        } & string) | (((predicate: (value: never, index: number, obj: readonly never[]) => unknown, thisArg?: any) => number) & string) | ((() => IterableIterator<[number, never]>) & string) | ((() => IterableIterator<number>) & string) | ((() => IterableIterator<never>) & string) | (((searchElement: never, fromIndex?: number) => boolean) & string) | ((<U_3, This = undefined>(callback: (this: This, value: never, index: number, array: never[]) => U_3 | readonly U_3[], thisArg?: This) => U_3[]) & string) | ((<A, D extends number = 1>(this: A, depth?: D) => FlatArray<A, D>[]) & string)>) | (Partial<{}> & Pick<(Readonly<{
            [x: number]: unknown;
        } & {
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            concat?: unknown;
            join?: unknown;
            slice?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            find?: unknown;
            findIndex?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps) | (Readonly<{
            [x: number]: unknown;
        } & {
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            concat?: unknown;
            join?: unknown;
            slice?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            find?: unknown;
            findIndex?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<{} & {
            [x: string]: unknown;
        }>) | (Readonly<{} & {
            [x: string]: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<{
            [x: number]: unknown;
        } & {
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            concat?: unknown;
            join?: unknown;
            slice?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            find?: unknown;
            findIndex?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
        }>) | (Readonly<{} & {
            [x: string]: unknown;
        }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps), "length" | "toString" | "toLocaleString" | "concat" | "join" | "slice" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "map" | "filter" | "reduce" | "reduceRight" | "find" | "findIndex" | "entries" | "keys" | "values" | "includes" | "flatMap" | "flat" | "key" | "ref" | "onVnodeBeforeMount" | "onVnodeMounted" | "onVnodeBeforeUpdate" | "onVnodeUpdated" | "onVnodeBeforeUnmount" | "onVnodeUnmounted" | "class" | "style" | ((() => string) & string) | ((() => string) & string) | ({
            (...items: ConcatArray<never>[]): never[];
            (...items: ConcatArray<never>[]): never[];
        } & string) | (((separator?: string) => string) & string) | (((start?: number, end?: number) => never[]) & string) | (((searchElement: never, fromIndex?: number) => number) & string) | (((searchElement: never, fromIndex?: number) => number) & string) | ({
            <S extends never>(predicate: (value: never, index: number, array: readonly never[]) => value is S, thisArg?: any): this is readonly S[];
            (predicate: (value: never, index: number, array: readonly never[]) => unknown, thisArg?: any): boolean;
        } & string) | (((predicate: (value: never, index: number, array: readonly never[]) => unknown, thisArg?: any) => boolean) & string) | (((callbackfn: (value: never, index: number, array: readonly never[]) => void, thisArg?: any) => void) & string) | ((<U>(callbackfn: (value: never, index: number, array: readonly never[]) => U, thisArg?: any) => U[]) & string) | ({
            <S_1 extends never>(predicate: (value: never, index: number, array: readonly never[]) => value is S_1, thisArg?: any): S_1[];
            (predicate: (value: never, index: number, array: readonly never[]) => unknown, thisArg?: any): never[];
        } & string) | ({
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never): never;
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never, initialValue: never): never;
            <U_1>(callbackfn: (previousValue: U_1, currentValue: never, currentIndex: number, array: readonly never[]) => U_1, initialValue: U_1): U_1;
        } & string) | ({
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never): never;
            (callbackfn: (previousValue: never, currentValue: never, currentIndex: number, array: readonly never[]) => never, initialValue: never): never;
            <U_2>(callbackfn: (previousValue: U_2, currentValue: never, currentIndex: number, array: readonly never[]) => U_2, initialValue: U_2): U_2;
        } & string) | ({
            <S_2 extends never>(predicate: (this: void, value: never, index: number, obj: readonly never[]) => value is S_2, thisArg?: any): S_2;
            (predicate: (value: never, index: number, obj: readonly never[]) => unknown, thisArg?: any): never;
        } & string) | (((predicate: (value: never, index: number, obj: readonly never[]) => unknown, thisArg?: any) => number) & string) | ((() => IterableIterator<[number, never]>) & string) | ((() => IterableIterator<number>) & string) | ((() => IterableIterator<never>) & string) | (((searchElement: never, fromIndex?: number) => boolean) & string) | ((<U_3, This = undefined>(callback: (this: This, value: never, index: number, array: never[]) => U_3 | readonly U_3[], thisArg?: This) => U_3[]) & string) | ((<A, D extends number = 1>(this: A, depth?: D) => FlatArray<A, D>[]) & string)>);
        $attrs: Record<string, unknown>;
        $refs: Record<string, unknown>;
        $slots: Readonly<{
            [name: string]: import("vue").Slot;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
        $emit: ((event: string, ...args: any[]) => void) | ((event: string, ...args: any[]) => void);
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<{
            [x: number]: unknown;
        } & {
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            concat?: unknown;
            join?: unknown;
            slice?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            find?: unknown;
            findIndex?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
        }> | Readonly<{} & {
            [x: string]: unknown;
        }>, unknown, unknown, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, any>, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, any>, import("vue").EmitsOptions, string, {
            [x: number]: unknown;
        } | {}> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>, info: string) => boolean | void)[];
        };
        $forceUpdate: import("vue").ReactiveEffect<any>;
        $nextTick: typeof import("vue").nextTick;
        $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean>): import("vue").WatchStopHandle;
    } & Readonly<{} & {
        [x: string]: unknown;
    }> & import("vue").ShallowUnwrapRef<{}> & {} & {
        [x: string]: never;
    } & import("vue").MethodOptions & import("vue").ComponentCustomProperties);
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<{
    [x: number]: unknown;
} & {
    length?: unknown;
    toString?: unknown;
    toLocaleString?: unknown;
    concat?: unknown;
    join?: unknown;
    slice?: unknown;
    indexOf?: unknown;
    lastIndexOf?: unknown;
    every?: unknown;
    some?: unknown;
    forEach?: unknown;
    map?: unknown;
    filter?: unknown;
    reduce?: unknown;
    reduceRight?: unknown;
    find?: unknown;
    findIndex?: unknown;
    entries?: unknown;
    keys?: unknown;
    values?: unknown;
    includes?: unknown;
    flatMap?: unknown;
    flat?: unknown;
}> | Readonly<{} & {
    [x: string]: unknown;
}>, unknown, unknown, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, any>, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, any>, import("vue").EmitsOptions, string, {
    [x: number]: unknown;
} | {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & {
    install(app: App<any>): void;
}>;
export default _default;
