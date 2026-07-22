import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://luizzcreeiss.com.br',
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !['/404/', '/404.html', '/obrigado/'].includes(pathname);
      },
    }),
  ],
});
