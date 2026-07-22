import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://luizreis.com.br',
  integrations: [sitemap({ filter: (page) => page !== 'https://luizreis.com.br/obrigado/' })],
});
