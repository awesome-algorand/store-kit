export async function retry(fn, props = [], retries = 4) {
    try {
        return await fn(...props);
    }
    catch (e) {
        if (retries > 0) {
            return retry(fn, props, retries - 1);
        }
    }
}
export async function rateLimit(lock, fn, props = []) {
    // Run the function without a limit
    if (!lock) {
        return fn(...props);
    }
    // Acquire a lock otherwise
    return await lock.runExclusive(() => {
        return fn(...props);
    });
}
//# sourceMappingURL=utils.js.map