import { PrimeNGConfigType } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const themeConfig: PrimeNGConfigType = {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        order: 'tailwind-base, primeng, tailwind-utilities',
      },
    },
  },
};
