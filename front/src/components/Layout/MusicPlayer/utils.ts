export function convertToDateTime(t: number) {
    const start = 15;
    return new Date(t * 1000).toISOString().substring(start, start + 4);
}