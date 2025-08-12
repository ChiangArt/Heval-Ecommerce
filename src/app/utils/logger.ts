// logger.ts

const isDev = process.env.NODE_ENV === "development";

export function logError(...args: unknown[]) {
  if (isDev) {
    console.error(...args);
  }
}

export function logInfo(...args: unknown[]) {
  if (isDev) {
    console.log(...args);
  }
}

export function logWarn(...args: unknown[]) {
  if (isDev) {
    console.warn(...args);
  }
}
