export function track(event: string, props?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  // @ts-ignore
  if (typeof window.plausible === 'function') window.plausible(event, { props });
  else if (process.env.NODE_ENV !== 'production') console.info('[analytics]', event, props);
}


