import { Mutex, Semaphore } from "async-mutex";

export async function retry<A extends any[], T>(
  fn: (...args: A) => T | Promise<T>,
  props: A = [] as unknown as A,
  retries: number = 4,
) {
  try {
    return await fn(...props);
  } catch (e) {
    if (retries > 0) {
      return retry(fn, props, retries - 1);
    }
  }
}
export async function rateLimit<A extends any[], T>(
  lock: Mutex | Semaphore | null,
  fn: (...args: A) => T | Promise<T>,
  props: A = [] as unknown as A,
) {
  // Run the function without a limit
  if (!lock) {
    return fn(...props);
  }
  // Acquire a lock otherwise
  return await lock.runExclusive(() => {
    return fn(...props);
  });
}
