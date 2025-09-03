import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  '/', '/pricing', '/about', '/faq', '/contact',
  '/kits/fra-usa','/kits/fra-gbr','/kits/fra-can','/kits/fra-mar','/kits/fra-deu',
  '/kits/fra-che','/kits/fra-bel','/kits/fra-esp','/kits/fra-ita','/kits/fra-prt',
  '/preview/fra-usa'
];

test.describe('Accessibility (axe)', () => {
  for (const route of routes) {
    test(`a11y: ${route}`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a','wcag2aa'])
        .analyze();

      const violations = results.violations || [];
      if (violations.length) {
        // Compact console summary
        // eslint-disable-next-line no-console
        console.log(`\n---- A11Y @ ${route} ----`);
        for (const v of violations) {
          console.log(`• ${v.id} [${v.impact}] — nodes: ${v.nodes.length} (e.g. ${v.nodes[0]?.target?.[0] ?? 'n/a'})`);
        }
      }

      // Only fail on serious/critical
      const blockers = violations.filter(v => ['serious','critical'].includes(v.impact || ''));
      expect(blockers, `Serious/critical a11y issues on ${route}`).toHaveLength(0);
    });
  }
});
