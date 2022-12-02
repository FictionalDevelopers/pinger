export const rejectAfter = (time: number, promise: Promise<any>) =>
  Promise.race([promise, new Promise((_, reject) => setTimeout(reject, time))]);
