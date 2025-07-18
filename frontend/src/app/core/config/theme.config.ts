import { PrimeNGConfigType } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const themeConfig: PrimeNGConfigType = {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false || 'none',
      cssLayer: {
        order: 'tailwind-base, primeng, tailwind-utilities',
      },
    },
  },
};
