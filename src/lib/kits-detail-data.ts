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
      `Getting married between France and the United States can feel overwhelming with different rules, documents, and recognition steps on both sides. This kit gives you a clear roadmap: from collecting the right certificates, to understanding US state requirements, to ensuring your marriage is valid in France. A complete, reliable guide designed to save you stress, time, and costly mistakes.`,
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
      `Cross-border marriages between France and the UK are common, yet the administrative procedures often create confusion. This kit simplifies everything: how to prepare your file in France, what UK authorities require, and how to secure recognition on both sides. Perfect for couples who want clarity and peace of mind during this life-changing step.`,
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
      `With different rules across Canadian provinces and strict French transcription procedures, marrying between France and Canada can quickly become complicated. This kit provides a step-by-step plan, tailored for both countries, so you know exactly what documents, translations, and certificates are needed. A must-have for couples who want to celebrate their love without bureaucratic headaches.`,
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
      `France and Morocco have strong ties, but marriages between citizens of both countries involve specific certificates, translations, and legal steps. This kit makes it simple: from Moroccan consular documents to French capacity-to-marry certificates, everything is explained clearly. The perfect guide to avoid delays and ensure your union is recognised in both countries.`,
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
      `Getting married between France and Germany means navigating two precise but different systems. This kit shows you exactly how to prepare your documents, manage the banns/publications, and handle recognition in each country. With EU rules in play, the guide helps you avoid unnecessary translations or legalisations and ensures a smooth process.`,
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
      `Switzerland has its own civil registry rules and procedures that differ from France, even as a neighbouring country. This kit walks you through both systems step by step, so you can prepare your documents, plan your timeline, and avoid administrative surprises. Clear, practical, and designed to give you confidence at every stage.`,
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
      `With strong cross-border ties, marriages between France and Belgium are frequent but not always straightforward administratively. This kit explains how to handle documents, banns, and recognition requirements in both countries. Ideal for couples looking for a simple, reliable guide to complete their union without stress.`,
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
      `Spain and France both have detailed marriage procedures that can be confusing if you don’t know where to start. This kit simplifies the entire process: what to provide in Spain, how to ensure recognition in France, and which documents must be translated or not. Designed for clarity, so you can focus on your wedding instead of the paperwork.`,
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
      `France and Italy require specific certificates, publications, and consular procedures for cross-border marriages. This kit brings everything together in one place: legal requirements, recognition steps, and practical checklists. Perfect for Franco-Italian couples who want to save time, avoid mistakes, and ensure their marriage is legally recognised on both sides.`,
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
      `Portugal and France share EU rules, but the local procedures still differ and can cause confusion. This kit explains everything: from banns in France to the Portuguese “processo de casamento,” including how to get recognition in both countries. A clear, step-by-step guide that makes the entire process simpler and stress-free.`,
    faqIds: ['what-is-kit', 'timeline', 'receive-kit', 'translations'],
    related: ['fra-esp', 'fra-mar', 'fra-ita'],
  },
};


