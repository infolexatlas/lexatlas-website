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

export const kitsDetail: Partial<Record<PairSlug, KitDetail>> = {
  'fra-usa': {
    slug: 'fra-usa',
    lede:
      'Complete step-by-step guide for France – United States international marriage: requirements, documentation, and procedures.',
    priceEUR: 29,
    features: baseFeatures,
    about:
      `Getting married between <strong>France</strong> and the <strong>United States</strong> can feel overwhelming with different rules, <strong>documents</strong>, and <strong>recognition</strong> steps on both sides. This kit gives you a clear <strong>roadmap</strong>: from collecting the right <strong>certificates</strong>, to understanding US state requirements, to ensuring your marriage is valid in France. A complete, reliable guide designed to save you <strong>stress</strong>, <strong>time</strong>, and costly mistakes.`,
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
      `Cross-border marriages between <strong>France</strong> and the <strong>UK</strong> are common, yet the administrative <strong>procedures</strong> often create confusion. This kit simplifies everything: how to prepare your file in France, what UK authorities require, and how to secure <strong>recognition</strong> on both sides. Perfect for couples who want <strong>clarity</strong> and peace of mind during this life-changing step.`,
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
      `With different rules across <strong>Canadian provinces</strong> and strict French transcription procedures, marrying between <strong>France</strong> and <strong>Canada</strong> can quickly become complicated. This kit provides a <strong>step-by-step</strong> plan, tailored for both countries, so you know exactly what <strong>documents</strong>, <strong>translations</strong>, and <strong>certificates</strong> are needed. A must-have for couples who want to celebrate their love without bureaucratic headaches.`,
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
      `<strong>France</strong> and <strong>Morocco</strong> have strong ties, but marriages between citizens of both countries involve specific <strong>certificates</strong>, <strong>translations</strong>, and legal steps. This kit makes it simple: from Moroccan <strong>consular documents</strong> to French <strong>capacity‑to‑marry</strong> certificates, everything is explained clearly. The perfect guide to avoid <strong>delays</strong> and ensure your union is <strong>recognised</strong> in both countries.`,
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
      `Getting married between <strong>France</strong> and <strong>Germany</strong> means navigating two precise but different systems. This kit shows you exactly how to prepare your <strong>documents</strong>, manage the <strong>banns/publications</strong>, and handle <strong>recognition</strong> in each country. With <strong>EU rules</strong> in play, the guide helps you avoid unnecessary <strong>translations</strong> or legalisations and ensures a smooth process.`,
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
      `<strong>Switzerland</strong> has its own civil registry rules and <strong>procedures</strong> that differ from France, even as a neighbouring country. This kit walks you through both systems <strong>step by step</strong>, so you can prepare your <strong>documents</strong>, plan your <strong>timeline</strong>, and avoid administrative surprises. Clear, practical, and designed to give you confidence at every stage.`,
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
      `With strong cross-border ties, marriages between <strong>France</strong> and <strong>Belgium</strong> are frequent but not always straightforward administratively. This kit explains how to handle <strong>documents</strong>, <strong>banns</strong>, and <strong>recognition</strong> requirements in both countries. Ideal for couples looking for a simple, reliable guide to complete their union without stress.`,
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
      `<strong>Spain</strong> and <strong>France</strong> both have detailed marriage <strong>procedures</strong> that can be confusing if you don’t know where to start. This kit simplifies the entire process: what to provide in Spain, how to ensure <strong>recognition</strong> in France, and which <strong>documents</strong> must be translated or not. Designed for <strong>clarity</strong>, so you can focus on your wedding instead of the paperwork.`,
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
      `<strong>France</strong> and <strong>Italy</strong> require specific <strong>certificates</strong>, <strong>publications</strong>, and <strong>consular procedures</strong> for cross-border marriages. This kit brings everything together in one place: legal requirements, <strong>recognition</strong> steps, and practical <strong>checklists</strong>. Perfect for Franco‑Italian couples who want to save <strong>time</strong>, avoid mistakes, and ensure their marriage is legally recognised on both sides.`,
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
      `<strong>Portugal</strong> and <strong>France</strong> share <strong>EU rules</strong>, but the local <strong>procedures</strong> still differ and can cause confusion. This kit explains everything: from <strong>banns</strong> in France to the Portuguese <strong>“processo de casamento”</strong>, including how to get <strong>recognition</strong> in both countries. A clear, <strong>step‑by‑step</strong> guide that makes the entire process simpler and stress‑free.`,
    faqIds: ['what-is-kit', 'timeline', 'receive-kit', 'translations'],
    related: ['fra-esp', 'fra-mar', 'fra-ita'],
  },
};


