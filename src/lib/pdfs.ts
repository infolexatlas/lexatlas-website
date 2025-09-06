// PDF file paths mapping for marriage kits
export const PDF_PATHS: Record<string, string> = {
  'fra-usa': '/kits/FRA-USA.pdf',
  'fra-gbr': '/kits/FRA-GBR.pdf',
  'fra-can': '/kits/FRA-CAN.pdf',
  'fra-mar': '/kits/FRA-MAR.pdf',
  'fra-deu': '/kits/FRA-DEU.pdf',
  'fra-che': '/kits/FRA-CHE.pdf',
  'fra-bel': '/kits/FRA-BEL.pdf',
  'fra-esp': '/kits/FRA-ESP.pdf',
  'fra-ita': '/kits/FRA-ITA.pdf',
  'fra-prt': '/kits/FRA-PRT.pdf',
} as const;

export type PdfSlug = keyof typeof PDF_PATHS;

/**
 * Get the PDF file path for a given slug
 */
export function pdfPathForSlug(slug: string): string | null {
  return PDF_PATHS[slug.toLowerCase() as PdfSlug] || null;
}

/**
 * Get the global sample PDF path
 */
export function getGlobalSamplePath(): string {
  return '/kits/samples/LEXATLAS-global-sample.pdf';
}

/**
 * Get all available PDF slugs
 */
export function getAllPdfSlugs(): PdfSlug[] {
  return Object.keys(PDF_PATHS) as PdfSlug[];
}

/**
 * Get PDF paths for bundle types
 */
export function getPdfPathsForBundle(kind: 'bundle3' | 'bundle10'): string[] {
  if (kind === 'bundle3') {
    // Default 3 kits for bundle 3
    return ['fra-usa', 'fra-gbr', 'fra-can'].map(slug => pdfPathForSlug(slug)).filter(Boolean) as string[];
  } else if (kind === 'bundle10') {
    // All 10 kits for bundle 10
    return getAllPdfSlugs().map(slug => pdfPathForSlug(slug)).filter(Boolean) as string[];
  }
  return [];
}
