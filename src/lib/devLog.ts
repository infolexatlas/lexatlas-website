export const devLog = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const stamp = new Date().toISOString();
    console.log(`[DEV] ${stamp}`, ...args);
  }
};
