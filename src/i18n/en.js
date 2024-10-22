export default {
  BUSINESS_TYPES: ['Restaurant', 'Bar', 'Cafeteria', 'Cafe', 'Pub'],
  MenuItemTypes: {
    FoodAndDrinks: {
      LABEL: 'Food and drinks',
      ITEM_LIST: [
        'Starters',
        'Main Courses',
        'Seconds',
        'Side Dishes',
        'Desserts',
        'Drinks',
      ],
    },
    Pizzas: {
      LABEL: 'Pizzas',
      ITEM_LIST: [
        'Tradicional pizzas',
        'Special flour pizzas',
        "Pizzas 'Calzone'",
        "Pizzas 'Covaccino'",
        'Fried pizzas',
        'Sweet pizzas',
        'Filled edge pizzas',
      ],
    },
    WineChart: {
      LABEL: 'Wine chart',
      ITEM_LIST: [
        'Bubbles/sparkling',
        'Red wines',
        'White wines',
        'Rosè wines',
        'Dessert wines',
        'Liqueurs and spirits',
      ],
    },
  },
  DEFAULT_LANGUAGE: 'Default language',
  Languages: {
    en: 'English',
    es: 'Spanish',
    cat: 'Catalan',
    it: 'Italian',
    fr: 'French',
    nl: 'Dutch',
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
      RESET_PASSWORD: 'Reset your password',
    },
    Menu: {
      INGREDIENTS_LIST: 'Ingredients list',
      MENU: 'Normal menu',
      TYPE: 'Menu type',
      SET_MENU: 'Set menu',
      NAME: 'Name',
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
      QR_CODE: 'QR code of the menu page',
      WEB_LINK: 'Web address of the menu page',
      NO_MENUS_AVAILABLE:
        'There are no menus available for the language you selected',
    },
    Business: {
      NAME: 'Business name',
      UNIQUE_URL_PATH: 'Unique URL path',
      LOGO: 'Business logo (reccomended image size: 200 x 100 px)',
      HEADER_BANNER: 'Header banner (reccomended image size: 1024 x 300 px)',
      ColorPalette: {
        PRIMARY: 'Primary color',
        SECONDARY: 'Secondary color',
        ACCENT: 'Accent',
      },
      TYPE: 'Type',
      INFO: 'Info',
      MEDIA_AND_THEME: 'Media and theme',
    },
    Account: {
      FIRST_NAME: 'First name',
      LAST_NAME: 'Last name',
      ACCOUNT_OWNER: 'Account owner',
      EMAIL_ADDRESS: 'Email address',
      PASSWORD: 'Password',
      CONFIRM_PASSWORD: 'Confirm password',
      NEWS_LETTER:
        'I want to receive news, marketing promotions and updates via email.',
    },
    Errors: {
      FormValidation: {
        REQUIRED: 'This field is required',
        CURRENCY: 'This field must be in the € format (ex: 10,50)',
        UNIQUE_URL_PATH_ALREADY_IN_USE:
          'The unique URL path you chose is already used. Please choose a different one',
        INVALID_EMAIL_ADDRESS: 'Invalid e-mail address',
        OPERATION_ERROR: 'An error occured during the delete operation',
        ALLOWED_CHARACTERS:
          'Only letter, digits,dash, underscore and space characters are allowed here',
        EMPTY_PROVIDED_LANGUAGES_NOT_ALLOWED:
          'Operation not allowed. The list must contain at least one default language',
        EMPTY_LOCALES_NOT_ALLOWED:
          'Operation not allowed. You have to ensure the name of this item is provided at least in one language',
      },
      GENERIC: 'An error occurred during this operation',
      Authentication: {
        WRONG_PASSWORD: 'Are you sure the password is the right one?',
        EMAIL_ALREADY_IN_USE:
          'This email address is already registered. Please use a different one',
        INVALID_ACTION_CODE:
          'The link is no longer valid. Retry the operation from scratch',
        USER_NOT_FOUND: 'Are you sure the email address is the right one?',
      },
    },
    Success: {
      CONTACT_REQUEST_SENT:
        'Thank you for contacting us. We will get back to you ASAP!',
    },
    Common: {
      SHOW_OTHER_LANGUAGES: 'Show Other languages',
      LANGUAGE: 'Lang',
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
      MAX_FILE_SIZE: 'Max file size: 1 MB',
      SUPPORTED_FILE_EXTENSIONS: 'supported file extensions: jpg/png',
      CHANGE_UNIQUE_URL_PATH:
        'Advice: you can change the bold part as you wish.',
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
      DOWNLOAD: 'Download',
      PRINT: 'Print',
      REPLACE: 'Replace',
      REMOVE: 'Remove',
      ADD: 'ADD',
      QR_CODE: 'QR code',
      BACK_TO_MENU_LIST: 'Back to menu list',
      CONTACT_US: 'Contact us',
      WRITE_SOMETHING_HERE: 'Write something here...',
      CLICK_HERE: 'Click here',
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
