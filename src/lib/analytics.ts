export type PlausibleEvents = {
  checkout_view: { kit?: string };
  checkout_start: { kit?: string };
  checkout_redirect: { kit?: string };
  checkout_error: { kit?: string; error?: string };
  checkout_success: { type: 'single'|'bundle3'|'bundle10'; items_count: number; session_id?: string; kit?: string };
  lead_magnet_submit: { source: 'kit_detail'|'banner'|'footer'|'preview'; pair?: string };
  preview_email_submit: { pair?: string; error?: string };
  kit_download_click: { kit?: string };
  '404_view': { path: string };
  '404_action_click': { action: 'browse_kits'|'pricing'|'faq'|'contact' };
};

export function track<K extends keyof PlausibleEvents>(event: K, props?: PlausibleEvents[K]) {
  if (typeof window === 'undefined') return;
  // @ts-expect-error Plausible is injected at runtime
  if (typeof window.plausible === 'function') window.plausible(event, { props });
  else if (process.env.NODE_ENV !== 'production') console.info('[analytics]', event, props);
}


