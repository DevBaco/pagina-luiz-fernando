import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://luizzcreeiss.com.br',
  integrations: [sitemap({ filter: (page) => page !== 'https://luizzcreeiss.com.br/obrigado/' })],
});
