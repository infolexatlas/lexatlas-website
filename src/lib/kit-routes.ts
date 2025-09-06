/**
 * Centralized routes for Kits CTAs
 * Keeps links consistent across the catalogue and cards
 */
export const ROUTES = {
  getKit: (pair: string) => `/kits/${pair.toLowerCase()}`,
  browseAll: '/kits/all',
  freeSample: '/kits/sample',
}


