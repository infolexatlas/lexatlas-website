import type { PairSlug } from './kits-slug'

export type KitDetail = {
  slug: PairSlug;
  lede: string;
  priceEUR: number;
  features: string[];
  about: string;
  faqIds: string[]; // match your /faq ids if available
  related: PairSlug[];
};

// Base bullets used across kits
const baseFeatures = [
  'Complete step-by-step marriage procedure',
  'Comprehensive document checklist & requirements',
  'Legal requirements, timelines, and deadlines',
  'Expert guidance and practical tips',
  'Contact information for relevant authorities',
  'Instant download after secure payment',
];

export const kitsDetail: Record<PairSlug, KitDetail> = {
  'fra-usa': {
    slug: 'fra-usa',
    lede:
      'Complete step-by-step guide for France – United States international marriage: requirements, documentation, and procedures.',
    priceEUR: 29,
    features: baseFeatures,
    about:
      'Expert-built kit for France – United States. Up-to-date requirements and verified procedures to avoid mistakes and save time.',
    faqIds: ['what-is-kit', 'replace-lawyer', 'recognition-both', 'translations'],
    related: ['fra-can', 'fra-gbr', 'fra-deu'],
  },
  'fra-gbr': {
    slug: 'fra-gbr',
    lede:
      'Step-by-step guidance for France – United Kingdom marriages including documents, timelines, and official contacts.',
    priceEUR: 29,
    features: baseFeatures,
    about:
      'Tailored instructions for France – United Kingdom couples, reviewed by legal professionals for accuracy.',
    faqIds: ['cost', 'timeline', 'receive-kit', 'wrong-kit'],
    related: ['fra-usa', 'fra-ita', 'fra-esp'],
  },
  'fra-can': {
    slug: 'fra-can',
    lede:
      'Everything you need for France – Canada international marriage: requirements, procedures, and documentation.',
    priceEUR: 29,
    features: baseFeatures,
    about:
      'Built by experts with current cross-border rules for France – Canada. Confidently handle each step without surprises.',
    faqIds: ['recognition-both', 'need-translations', 'receive-kit', 'buy-multiple'],
    related: ['fra-usa', 'fra-gbr', 'fra-che'],
  },
  'fra-mar': {
    slug: 'fra-mar',
    lede:
      'Clear, verified steps for France – Morocco marriages, with document checklists and authority contacts.',
    priceEUR: 29,
    features: baseFeatures,
    about:
      'Expert-reviewed process for France – Morocco to prevent delays and ensure compliance with both jurisdictions.',
    faqIds: ['timeline', 'translations', 'recognition-both', 'receive-kit'],
    related: ['fra-esp', 'fra-prt', 'fra-ita'],
  },
  'fra-deu': {
    slug: 'fra-deu',
    lede:
      'A precise France – Germany guide with requirements, timelines, and practical tips to avoid common pitfalls.',
    priceEUR: 29,
    features: baseFeatures,
    about:
      'Legal-checked instructions for Franco–German marriages; streamline paperwork and keep timelines on track.',
    faqIds: ['cost', 'timeline', 'replace-lawyer', 'wrong-kit'],
    related: ['fra-che', 'fra-bel', 'fra-ita'],
  },
  'fra-che': {
    slug: 'fra-che',
    lede:
      'France – Switzerland international marriage kit covering documents, legalization, and step-by-step process.',
    priceEUR: 29,
    features: baseFeatures,
    about:
      'Comprehensive, verified guide for Franco–Swiss marriages; reduce friction with clear, ordered steps.',
    faqIds: ['what-is-kit', 'timeline', 'receive-kit', 'buy-multiple'],
    related: ['fra-deu', 'fra-ita', 'fra-bel'],
  },
  'fra-bel': {
    slug: 'fra-bel',
    lede:
      'France – Belgium marriage procedures made clear: requirements, checklists, and official contacts.',
    priceEUR: 29,
    features: baseFeatures,
    about:
      'Expert-built kit validated with official sources; minimize back-and-forth and proceed confidently.',
    faqIds: ['recognition-both', 'need-translations', 'receive-kit', 'wrong-kit'],
    related: ['fra-deu', 'fra-che', 'fra-n/a' as any], // adjust if needed
  },
  'fra-esp': {
    slug: 'fra-esp',
    lede:
      'Detailed steps for France – Spain international marriage, including timelines and authority contacts.',
    priceEUR: 29,
    features: baseFeatures,
    about:
      'Spain–France kit with current rules and verified procedures to avoid mistakes and delays.',
    faqIds: ['cost', 'timeline', 'translations', 'receive-kit'],
    related: ['fra-prt', 'fra-ita', 'fra-mar'],
  },
  'fra-ita': {
    slug: 'fra-ita',
    lede:
      'France – Italy kit: documents, legalization, and step-by-step workflow with practical guidance.',
    priceEUR: 29,
    features: baseFeatures,
    about:
      'Franco–Italian kit that turns complex rules into a clear checklist you can follow with confidence.',
    faqIds: ['replace-lawyer', 'timeline', 'recognition-both', 'buy-multiple'],
    related: ['fra-che', 'fra-deu', 'fra-esp'],
  },
  'fra-prt': {
    slug: 'fra-prt',
    lede:
      'France – Portugal marriage procedures with up-to-date requirements and practical tips.',
    priceEUR: 29,
    features: baseFeatures,
    about:
      'Expert-reviewed kit for France – Portugal; reduce risk of rejection and keep your process on schedule.',
    faqIds: ['what-is-kit', 'timeline', 'receive-kit', 'translations'],
    related: ['fra-esp', 'fra-mar', 'fra-ita'],
  },
};


