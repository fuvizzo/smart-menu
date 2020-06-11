import en from '../i18n/en';
import it from '../i18n/it';
import es from '../i18n/es';
import nl from '../i18n/nl';
//import cat from '../i18n/cat';

export default {
  SupportedLanguages: ['en', 'es', 'cat', 'it', 'fr', 'nl'],
  LocalizedFields: ['description', 'ingredients', 'name'],
  RECAPTCHA_KEY: '6Lf-tf4UAAAAAOgaEvwH7lLLh7w7WB54OqGTHIjT',
  ALLOWED_CHARACTERS_REGEX: /^[a-zA-Z0-9 _-]+$/,
  ErrorTypes: {
    SERVER_ERROR: 'SERVER_ERROR',
    AUTHENTICATION: 'AUTHENTICATION',
  },
  RegexExpressions: {
    EURO: new RegExp(/^\d+(?:,\d{1,2})?$/).source,
  },
  MenuTypes: ['FoodAndDrinks', 'WineChart', 'Pizzas'],
  MenuItemTypesColorMap: [
    '#36bff4',
    '#36f456',
    '#ffd96d',
    '#ff6dbe',
    '#ffa15f',
    '#f44336',
  ],
  DEFAULT_THEME: {
    colorPalette: {
      primary: '#000000',
      secondary: '#4A4A4A',
      accent: '#9B9B9B',
    },
  },
  Locales: {
    en,
    it,
    es,
    nl,
    //cat,
  },
  APP_NAME: 'SmartMenoos',
};
