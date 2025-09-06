export const ALL_KITS = ['fra-usa','fra-can','gbr-can'] as const;
export function isValidKit(slug: string): boolean {
  return (ALL_KITS as readonly string[]).includes(slug);
}


