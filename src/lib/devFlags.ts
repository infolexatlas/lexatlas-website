export const isDev = process.env.NODE_ENV !== 'production';
export const disableExternal = process.env.NEXT_PUBLIC_DISABLE_EXTERNAL_SCRIPTS === '1';
export const isFakeCheckout = process.env.NEXT_PUBLIC_FAKE_CHECKOUT === '1';
