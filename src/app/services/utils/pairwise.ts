export function pairwise<T>(array: T[], callback: (current: T, next: T) => void) {
    for (let i = 0; i < array.length; i++) {
        if (i === array.length - 1) {
            callback(array[i], array[0]);
            return;
        }
        callback(array[i], array[i + 1]);
    }
}