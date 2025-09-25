import { describe, it, expect } from 'vitest'
import { LEADMAGNET_TEMPLATE_VERSION, renderLeadMagnetEmailHTML } from '@/emails/leadmagnet'

describe('lead magnet email template', () => {
  it('has a version and expected content', () => {
    expect(LEADMAGNET_TEMPLATE_VERSION).toBeTypeOf('string')
    expect(LEADMAGNET_TEMPLATE_VERSION.length).toBeGreaterThan(0)
    const html = renderLeadMagnetEmailHTML()
    expect(html).toContain('Lex Atlas — Your free guide')
    expect(html).toContain('Download the guide')
    expect(html).not.toContain('If the button doesn\'t work')
  })
})
