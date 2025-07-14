import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#0ea5e9',
          secondary: '#d946ef',
          accent: '#38bdf8',
          error: '#ef4444',
          warning: '#f59e0b',
          info: '#3b82f6',
          success: '#10b981',
          surface: '#ffffff',
          background: '#f8fafc',
        },
      },
      dark: {
        colors: {
          primary: '#0ea5e9',
          secondary: '#d946ef',
          accent: '#38bdf8',
          error: '#ef4444',
          warning: '#f59e0b',
          info: '#3b82f6',
          success: '#10b981',
          surface: '#1e293b',
          background: '#0f172a',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  defaults: {
    VBtn: {
      style: 'text-transform: none;',
    },
    VCard: {
      elevation: 2,
    },
  },
})

export default vuetify

