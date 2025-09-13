export type FAQ = {
  id: string; // slug for deep link
  question: string;
  answer: string; // rich text allowed (render with MD)
  tags?: string[]; // eg: recognition, translations, pricing
};

export const faqs: FAQ[] = [
  {
    id: 'what-is-lexatlas-kit',
    question: 'What is a LexAtlas Marriage Kit?',
    answer: 'A complete legal guide that explains step by step how to celebrate and legally recognize your marriage between two countries. It covers required documents, fees, timelines, translations, and recognition in both countries. Each kit is based on current national laws and international regulations.',
    tags: ['basics', 'legal-guide']
  },
  {
    id: 'replace-lawyer',
    question: 'Does the kit replace a lawyer?',
    answer: 'No. It is not a substitute for personalized legal advice. It provides reliable, practical, and clear information so most couples can complete the process themselves without expensive legal fees. For complex cases or specific legal questions, we recommend consulting a qualified attorney.',
    tags: ['legal-advice', 'lawyer']
  },
  {
    id: 'are-guides-up-to-date',
    question: 'Are the guides up to date and verified?',
    answer: 'Yes. Each kit is based on national laws, EU and international regulations, and current consular/administrative practices. We review and update regularly to ensure accuracy. Our legal experts verify all information against official sources and recent legal developments.',
    tags: ['accuracy', 'verification', 'updates']
  },
  {
    id: 'how-long-international-marriage',
    question: 'How long does an international marriage usually take?',
    answer: 'It depends on the countries involved. Within the EU: typically 1–3 months. With the US, Asia, or the Middle East: usually 3–6 months. Some jurisdictions require publication of banns, investigations, or legalization/apostille, which can extend timelines. Each kit provides specific timelines for your country pair.',
    tags: ['timeline', 'duration', 'process']
  },
  {
    id: 'how-much-cost',
    question: 'How much does the procedure cost?',
    answer: 'We provide detailed cost estimates for sworn translations, legalization/apostille, consular fees, and civil registry certificates. Typical ranges: €100–€600 depending on the countries. Costs vary based on document requirements, translation needs, and administrative fees. Each kit includes a comprehensive cost breakdown.',
    tags: ['pricing', 'cost', 'fees']
  },
  {
    id: 'recognition-both-countries',
    question: 'Will our marriage be recognized in both countries?',
    answer: 'Yes—if you follow the steps outlined in the kit. We explain how to register the marriage where it is celebrated and how to have it recognized in the other country (consulate/civil registry steps if needed). The kit covers all necessary procedures to ensure full legal recognition in both jurisdictions.',
    tags: ['recognition', 'legal-validity', 'registration']
  },
  {
    id: 'marry-in-country-of-residence',
    question: 'Do we need to marry in our country of residence?',
    answer: 'Not always. Some countries require residence; others allow non-resident marriages. Each kit clarifies where you can legally marry and the specific conditions. We provide options for both scenarios and guide you through the requirements for each approach.',
    tags: ['residence', 'location', 'requirements']
  },
  {
    id: 'need-official-translations',
    question: 'Do we need official translations?',
    answer: 'In most cases, yes. Civil status documents often require sworn translations; many jurisdictions also require an apostille or legalization. The kit specifies exactly what to translate, into which language, and by whom. We provide guidance on finding qualified translators and the certification process.',
    tags: ['translations', 'documents', 'certification']
  },
  {
    id: 'how-receive-kit',
    question: 'How do we receive the kit?',
    answer: 'Immediately after purchase you get a secure download link (interactive PDF). You have lifetime access and can view it on desktop, tablet, or mobile. The kit is optimized for all devices and includes printable checklists and forms for your convenience.',
    tags: ['delivery', 'access', 'download']
  },
  {
    id: 'buy-multiple-kits',
    question: 'Can we buy multiple kits?',
    answer: 'Yes. We offer flexible packages: Single Kit (€29) and Bundle of 3 (€75, save 14%). Perfect for comparing different country pairs or if you\'re considering multiple options. Contact support for custom pricing on larger orders.',
    tags: ['pricing', 'bundles', 'multiple']
  },
  {
    id: 'wrong-kit',
    question: 'What if we buy the wrong kit?',
    answer: 'Contact support and we\'ll provide access to the correct kit. Our goal is 100% customer satisfaction. We understand that country requirements can be complex, and we\'re here to help you get the right information for your specific situation.',
    tags: ['support', 'refund', 'customer-service']
  },
  {
    id: 'who-is-behind',
    question: 'Who is behind LexAtlas?',
    answer: 'International jurists specialized in cross-border marriages and private international law. Our mission is to make legal access simple, clear, and affordable for international couples. We combine legal expertise with user experience design to create accessible, reliable legal resources.',
    tags: ['team', 'expertise', 'mission']
  }
];
