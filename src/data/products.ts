export type Product = {
  id: string
  slug: string
  title: string
  shortDescription?: string
  price: number
  originalPrice?: number
  features: string[]
  isBundle?: boolean
}

export function getAllProducts(): Product[] {
  return [
    {
      id: 'marriage-kit',
      slug: 'marriage-kit',
      title: 'Marriage Kit',
      shortDescription: 'Step-by-step guide for your specific country pair',
      price: 29,
      features: [
        'Country-specific documentation checklist',
        'Step-by-step process guidance',
        'Templates and examples',
        'Consulate and city hall tips',
        'Lifetime updates',
      ],
    },
    {
      id: 'bundle',
      slug: 'bundle',
      title: 'Bundle',
      shortDescription: 'Best value for couples with multiple needs',
      price: 59,
      originalPrice: 78,
      isBundle: true,
      features: [
        'Everything in the Marriage Kit',
        'Extra forms and affidavits',
        'Priority support',
        'Future add-ons included',
        'Lifetime updates',
      ],
    },
  ]
}


