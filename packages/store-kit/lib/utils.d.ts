import { Mutex, Semaphore } from "async-mutex";
export declare function retry<A extends any[], T>(fn: (...args: A) => T | Promise<T>, props?: A, retries?: number): Promise<T | undefined>;
export declare function rateLimit<A extends any[], T>(lock: Mutex | Semaphore | null, fn: (...args: A) => T | Promise<T>, props?: A): Promise<T>;
