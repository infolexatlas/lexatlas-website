type LogMethod = (...args: unknown[]) => void;

const isDevelopment = process.env.NODE_ENV !== "production";

const devMethod = (method: LogMethod): LogMethod => {
  return (...args: unknown[]) => {
    if (isDevelopment) {
      method(...args);
    }
  };
};

export const logger = {
  log: devMethod(console.log),
  info: devMethod(console.info),
  warn: devMethod(console.warn),
  error: devMethod(console.error),
};


