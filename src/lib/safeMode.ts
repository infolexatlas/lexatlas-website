export const isSafeMode = process.env.NEXT_SAFE_MODE === '1';
export const isDev = process.env.NODE_ENV !== 'production';
export const disableExternal = process.env.NEXT_PUBLIC_DISABLE_EXTERNAL_SCRIPTS === '1';
