export default {
  SupportedLanguages: ['en', 'es', 'cat', 'it', 'fr'],
  LocalizedFields: ['description', 'ingredients', 'name'],
  ConfirmationActions: {
    DELETE_MENU_ITEM: 'DELETE_MENU_ITEM',
    DELETE_MENU: 'DELETE_MENU',
    DELETE_LOCALE: 'DELETE_LOCALE',
  },
  Locale: {
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
      Languages: {
        en: 'English',
        es: 'Spanish',
        cat: 'Catalan',
        it: 'Italian',
        fr: 'French',
      },
      Labels: {
        Sections: {
          DASHBOARD: 'Dashboard',
          MENU_LIST: 'Menu list',
          MENU_EDITOR: 'Menu editor',
          ACCOUNT: 'Account',
          SUBSCRIPTION_STATUS: 'Subscription status',
        },
        Actions: {
          PROCEED: 'Proceed',
          CANCEL: 'Cancel',
          SAVE: 'Save',
          EDIT: 'Edit',
          CREATE: 'Create',
          DELETE: 'Delete',
          SIGN_IN: 'Login',
          SIGN_UP: 'Register',
          SIGN_OUT: 'Logout',
        },
      },
      ConfirmationActions: {
        DELETE_MENU: {
          getTitle: name => `Delete the menu '${name}'`,
          getContent: name =>
            `Click on proceed to delete the selected menu '${name}'`,
        },
        DELETE_MENU_ITEM: {
          getTitle: itemName => `Delete the menu item '${itemName}'`,
          getContent: itemName =>
            `Click on proceed to delete the selected item '${itemName}'`,
        },
        DELETE_LOCALE: {
          getTitle: lang => `Delete the '${lang}' translation`,
          getContent: lang =>
            `Click on proceed to delete  the '${lang}' translation for the selected menu item`,
        },
      },
    },
  },
};
