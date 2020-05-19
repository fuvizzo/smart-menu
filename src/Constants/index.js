export default {
  SupportedLanguages: ['en', 'es', 'cat', 'it', 'fr'],
  LocalizedFields: ['description', 'ingredients', 'name'],
  RegexExpressions: {
    EURO: new RegExp(/^\d+(?:,\d{1,2})?$/).source,
  },
  DishTypesColorMap: [
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
          BUSINESS: 'My business',
          SIGN_IN: 'Sign in',
          SIGN_UP: 'Sign up',
        },
        Menu: {
          INGREDIENTS_LIST: 'Ingredients list',
          MENU: 'Normal menu',
          TYPE: 'Menu type',
          SET_MENU: 'Set menu',
          DISH_NAME: 'Dish name',
          MENU_NAME: 'Menu name',
          EMPTY_MENU: "The current menu doesn't have any items yet",
          CATEGORY: 'Category',
          DESCRIPTION: 'Description',
          PRICE: 'Price (€)',
          LANGUAGE: 'Language',
          UNPUBLISHED: 'Unpublished',
          PUBLISHED: 'Published',
          ITEMS: 'Items',
          INFO: 'Info',
        },
        FormValidationErrors: {
          REQUIRED: 'This field is required',
          CURRENCY: 'This field must be in the € format (ex: 10,50)',
        },
        Common: {
          SHOW_OTHER_LANGUAGES: 'Show Other languages',
        },
        Warnings: {
          MISSING_FIELD: "This field hasn't been filled up",
          getMissingFieldDetailedMessage: fieldName =>
            `This field '${fieldName}' hasn't been filled up `,
        },
        Hints: {
          UNIQUE_URL_PATH:
            'This is a user friendly ID you will bind your business with and let the users navigate to your menus easier!',
          LOGO: 'Your business logo will be shown on the menu page',
          SIGN_IN: 'Already have an account? Sign in',
          SIGN_UP: "Don't have an account? Sign Up",
          PASSWORD_FORGOTTEN: 'Forgot password?',
          ADD_MENU_ITEM:
            'Start adding menu items by using the plus icon button in the upper right part of the screen',
        },
        Business: {
          NAME: 'Business name',
          UNIQUE_URL_PATH: 'Unique URL path',
          LOGO: 'Business logo',
          HEADER_BANNER: 'Header banner (reccomended size: 1024 x 300 px)',
          Customization: {
            PRIMARY_COLOR: 'Primary color',
            SECONDARY_COLOR: 'Secondary color',
            ACCENT: 'Accent',
          },
        },
        Account: {
          FIRST_NAME: 'First name',
          LAST_NAME: 'Last name',

          ACCOUNT_OWNER: 'Account owner',
          EMAIL_ADDRESS: 'Email address',
          PASSWORD: 'Password',
          NEWS_LETTER:
            'I want to receive news, marketing promotions and updates via email.',
        },
        Actions: {
          APPLY_CHANGES: 'Apply changes',
          PROCEED: 'Proceed',
          CANCEL: 'Cancel',
          SAVE: 'Save',
          PREVIEW: 'Preview',
          EDIT: 'Edit',
          CREATE: 'Create',
          DELETE: 'Delete',
          SIGN_IN: 'Login',
          SIGN_UP: 'Register',
          SIGN_OUT: 'Logout',
          ADD_NEW_MENU_ITEM: ' Add a new menu item',
          ADD_NEW_MENU: 'Add a new menu',
          REMEMBER_ME: 'Remember me',
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
        DELETE_MENU_ITEM_LOCALE: {
          getTitle: lang => `Delete the '${lang}' translation`,
          getContent: lang =>
            `Click on proceed to delete  the '${lang}' translation for the selected menu item`,
        },
      },
    },
  },
};
