export default {
  SUPPORTED_LANGUAGES: ['en', 'es', 'cat', 'it', 'fr'],
  LOCALIZED_FIELDS: ['description', 'ingredients', 'name'],
  LOCALE: {
    en: {
      DISH_TYPES: [
        'Starters',
        'Main Courses',
        'Seconds',
        'Side Dishes',
        'Desserts',
        'Drinks',
      ],
      DEFAULT_LANGUAGE: 'Default language',
      LANGUAGES: {
        en: 'English',
        es: 'Spanish',
        cat: 'Catalan',
        it: 'Italian',
        fr: 'French',
      },
      CONFIRMATION_ACTIONS: {
        DELETE_MENU_ITEM: {
          getTitle: itemName => `Delete the menu item ${itemName}`,
          getContent: itemName =>
            `Click on proceed to delete the selected item ${itemName}`,
        },
      },
    },
  },
};
