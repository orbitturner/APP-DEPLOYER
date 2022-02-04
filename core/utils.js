export const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
export const isEmpty = (obj) => obj // 👈 null and undefined check
&& Object.keys(obj).length === 0
&& Object.getPrototypeOf(obj) === Object.prototype;