export const clamp = (v: number, min = 0, max = Number.POSITIVE_INFINITY) =>
    Math.min(Math.max(v, min), max);

export const randInt = (min: number, max: number) => {
    const lo = Math.ceil(min);
    const hi = Math.floor(max);
    return Math.floor(Math.random() * (hi - lo + 1)) + lo;
};
