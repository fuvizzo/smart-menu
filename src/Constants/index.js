import en from '../i18n/en';
import it from '../i18n/it';
import es from '../i18n/es';
export default {
  SupportedLanguages: ['en', 'es', 'cat', 'it', 'fr'],
  LocalizedFields: ['description', 'ingredients', 'name'],
  ErrorTypes: {
    SERVER_ERROR: 'SERVER_ERROR',
    AUTHENTICATION: 'AUTHENTICATION',
  },
  RegexExpressions: {
    EURO: new RegExp(/^\d+(?:,\d{1,2})?$/).source,
  },
  MenuTypes: ['FoodAndDrinks', 'WineChart'],
  MenuItemTypesColorMap: [
    '#36bff4',
    '#36f456',
    '#ffd96d',
    '#ff6dbe',
    '#ffa15f',
    '#f44336',
  ],
  ConfirmationActions: {
    DELETE_MENU_ITEM: 'DELETE_MENU_ITEM',
    DELETE_MENU: 'DELETE_MENU',
    DELETE_MENU_ITEM_LOCALE: 'DELETE_MENU_ITEM_LOCALE',
  },
  Locales: {
    en,
    it,
    es,
  },
};
