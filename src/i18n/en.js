export default {
  BUSINESS_TYPES: ['Restaurant', 'Bar', 'Cafeteria', 'Cafe', 'Pub'],
  MenuItemTypes: {
    FOOD_AND_DRINKS: [
      'Starters',
      'Main Courses',
      'Seconds',
      'Side Dishes',
      'Desserts',
      'Drinks',
    ],
    WINE_CHART: [],
  },
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
      PRICING: 'Pricing',
      HOME: 'Home',
    },
    Menu: {
      INGREDIENTS_LIST: 'Ingredients list',
      MENU: 'Normal menu',
      TYPE: 'Menu type',
      SET_MENU: 'Set menu',
      DISH_NAME: 'Dish name',
      MENU_NAME: 'Menu name',
      EMPTY_MENU: "The current menu doesn't have any items yet",
      EMPTY_MENU_LIST: 'There are no menus yet',
      CATEGORY: 'Category',
      DESCRIPTION: 'Description',
      PRICE: 'Price (€)',
      LANGUAGE: 'Language',
      UNPUBLISHED: 'Unpublished',
      PUBLISHED: 'Published',
      ITEMS: 'Items',
      INFO: 'Info',
      LANGUAGE_SETTINGS: 'Language settings',
      PROVIDED_LANGUAGES: 'Contents for the current menu will be provided in:',
    },
    Business: {
      NAME: 'Business name',
      UNIQUE_URL_PATH: 'Unique URL path',
      LOGO: 'Business logo',
      HEADER_BANNER: 'Header banner (reccomended size: 1024 x 300 px)',
      ColorPalette: {
        PRIMARY: 'Primary color',
        SECONDARY: 'Secondary color',
        ACCENT: 'Accent',
      },
      TYPE: 'Type',
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
    FormValidationErrors: {
      REQUIRED: 'This field is required',
      CURRENCY: 'This field must be in the € format (ex: 10,50)',
      UNIQUE_URL_PATH_ALREADY_IN_USE:
        'The unique URL path you chose is already used. Please choose a different one',
    },
    Common: {
      SHOW_OTHER_LANGUAGES: 'Show Other languages',
    },
    Warnings: {
      MISSING_NAME: 'MISSING_NAME',
      MISSING_FIELD: "This field hasn't been filled up",
      getMissingFieldDetailedMessage: fieldName =>
        `The field '${fieldName}' hasn't been filled up`,
    },
    Hints: {
      UNIQUE_URL_PATH:
        'This is a user friendly ID you will bind your business with and let the users navigate to your menus easier!',
      LOGO: 'Your business logo will be shown on the menu page',
      SIGN_IN: 'Already have an account? Sign in',
      SIGN_UP: "Don't have an account? Sign Up",
      PASSWORD_FORGOTTEN: 'Forgot password?',
      ADD_MENU:
        'Start creating a new menu by using the plus icon button in the upper right part of the screen',
      ADD_MENU_ITEM:
        'Start adding menu items by using the plus icon button in the upper right part of the screen',
    },
    Actions: {
      EDIT_COLOR: 'Edit color',
      APPLY_CHANGES: 'Apply changes',
      PROCEED: 'Proceed',
      CANCEL: 'Cancel',
      SAVE: 'Save',
      SELECT: 'Select',
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
      BACK_TO_DASHBOARD: 'Back to dashboard',
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
        `Click on proceed to delete the '${lang}' translation for the selected menu item`,
    },
  },
};
