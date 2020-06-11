export default {
  BUSINESS_TYPES: ['Restaurant', 'Bar', 'Cafeteria', 'Café', 'Kroeg'],
  MenuItemTypes: {
    FoodAndDrinks: {
      LABEL: 'Eten en drinken',
      ITEM_LIST: [
        'Voorgerechten',
        'Hoofdgerechten',
        'Seconds',
        'Bijgerechten',
        'Nagerechten',
        'Dranken',
      ],
    },
    Pizzas: {
      LABEL: 'Pizzas',
      ITEM_LIST: [
        "Traditionele pizza's",
        "Speciale meelpizza's",
        "Pizza's 'Calzone'",
        "Pizza's 'Covaccino'",
        "Gebakken pizza's",
        "Zoete pizza's",
        "Gevulde rand pizza's",
      ],
    },
    WineChart: {
      LABEL: 'Wijnkaart',
      ITEM_LIST: [
        'Mousserend/bruisend',
        'Rode wijnen',
        'Witte wijnen',
        'Rosè wijnen',
        'Dessertwijn',
        'Likeur en sterke drank',
      ],
    },
  },
  DEFAULT_LANGUAGE: 'Standaardtaal',
  Languages: {
    en: 'Engels',
    es: 'Spaans',
    cat: 'Catalaans',
    it: 'Italiaans',
    fr: 'Frans',
    nl: 'Nederlandse',
  },
  Labels: {
    Sections: {
      DASHBOARD: 'Dashboard',
      MENU_LIST: 'Menukaart',
      MENU_EDITOR: 'Menu editor',
      ACCOUNT: 'Account',
      SUBSCRIPTION_STATUS: 'Abonnement Status',
      BUSINESS: 'Mijn business',
      SIGN_IN: 'Log in',
      SIGN_UP: 'Aanmelden',
      PRICING: 'Prijzen',
      HOME: 'Beginscherm',
      RESET_PASSWORD: 'Stel je wachtwoord opnieuw in',
    },
    Menu: {
      INGREDIENTS_LIST: 'Ingrediëntenlijst',
      MENU: 'Normaal menu',
      TYPE: 'Menu type',
      SET_MENU: 'Stel menu',
      NAME: 'Naam',
      MENU_NAME: 'Menu naam',
      EMPTY_MENU: 'Het huidige menu heeft nog items',
      EMPTY_MENU_LIST: "Er zijn nog geen menu's",
      CATEGORY: 'Categorie',
      DESCRIPTION: 'Beschrijving',
      PRICE: 'Prijs (€)',
      LANGUAGE: 'Taal',
      UNPUBLISHED: 'Niet gepubliceerd',
      PUBLISHED: 'Gepubliceerd',
      ITEMS: 'Items',
      INFO: 'Informatie',
      LANGUAGE_SETTINGS: 'Taalinstellingen',
      PROVIDED_LANGUAGES:
        'Inhoud voor het huidige menu zal worden verstrekt in:',
      QR_CODE: 'QR code van de menupagina',
      WEB_LINK: 'Webadres van de menupagina',
      NO_MENUS_AVAILABLE:
        "Er zijn geen menu's beschikbaar voor de taal die je hebt geselecteerd",
    },
    Business: {
      NAME: 'Bedrijfsnaam',
      UNIQUE_URL_PATH: 'Uniek URL-pad',
      LOGO: 'Bedrijfslogo (aanbevolen afbeeldingsformaat 200 x 100 px)',
      HEADER_BANNER:
        'Koptekst Banner (aanbevolen afbeeldingsformaat: 1024 x 300 px)',
      ColorPalette: {
        PRIMARY: 'Primaire kleur',
        SECONDARY: 'Secondaire kleur',
        ACCENT: 'Accent',
      },
      TYPE: 'Type',
      INFO: 'Informatie',
      MEDIA_AND_THEME: 'Media en thema',
    },
    Account: {
      FIRST_NAME: 'Voornaam',
      LAST_NAME: 'Achternaam',
      ACCOUNT_OWNER: 'Account Eigenaar',
      EMAIL_ADDRESS: 'Emailadres',
      PASSWORD: 'Wachtwoord',
      CONFIRM_PASSWORD: 'Bevestig wachtwoord',
      NEWS_LETTER:
        'Ik wil nieuws, marketingpromoties en updates via e-mail ontvangen.',
    },
    Errors: {
      FormValidation: {
        REQUIRED: 'Dit veld is verplicht',
        CURRENCY: 'Dit veld moet in de format € (ex: 10,50)',
        UNIQUE_URL_PATH_ALREADY_IN_USE:
          'Het unieke URL-pad dat je hebt gekozen, wordt al gebruikt. Kies een andere',
        INVALID_EMAIL_ADDRESS: 'Ongeldig e-mailadres',
        OPERATION_ERROR: 'Er is een fout opgetreden tijdens het verwijderen',
        ALLOWED_CHARACTERS:
          'Alleen letters, cijfers, streepjes, onderstrepingstekens en spaties zijn hier toegestaan',
        EMPTY_PROVIDED_LANGUAGES_NOT_ALLOWED:
          'Operatie niet toegestaan. De lijst moet ten minste één standaardtaal bevatten',
        EMPTY_LOCALES_NOT_ALLOWED:
          'Operatie niet toegestaan. U moet ervoor zorgen dat de naam van dit item in ten minste één taal wordt verstrekt',
      },
      GENERIC: 'Er is een fout opgetreden tijdens deze bewerking',
      Authentication: {
        WRONG_PASSWORD: 'Weet u zeker dat het wachtwoord het juiste is?',
        EMAIL_ALREADY_IN_USE:
          'Dit emailadres is al geregistreerd. Gebruik een andere',
        INVALID_ACTION_CODE:
          'De link is niet meer geldig. Probeer de bewerking helemaal opnieuw',
        USER_NOT_FOUND: 'Weet je zeker dat het e-mailadres het juiste is? ',
      },
    },
    Success: {
      CONTACT_REQUEST_SENT:
        'Hartelijk dank dat u contact met ons heeft opgenomen. We nemen zo snel mogelijk contact met u op! ',
    },
    Common: {
      SHOW_OTHER_LANGUAGES: 'Toon andere talen',
      LANGUAGE: 'Lang',
    },
    Warnings: {
      MISSING_NAME: 'ONTBREKENDE NAAM',
      MISSING_FIELD: 'Dit veld is niet ingevuld',
      getMissingFieldDetailedMessage: fieldName =>
        `Het veld '${fieldName}' is niet ingevuld`,
    },
    Hints: {
      UNIQUE_URL_PATH:
        "Dit is een gebruiksvriendelijke ID waarmee u uw bedrijf kunt binden en waarmee gebruikers gemakkelijker naar uw menu's kunnen navigeren!",
      LOGO: 'Uw bedrijfslogo wordt weergegeven op de menupagina',
      SIGN_IN: 'Heeft u al een account? Log in',
      SIGN_UP: 'Heb je geen account? Aanmelden',
      PASSWORD_FORGOTTEN: 'Wachtwoord vergeten?',
      ADD_MENU:
        'Begin met het maken van een nieuw menu met behulp van de pluspictogramknop in de rechterbovenhoek van het scherm',
      ADD_MENU_ITEM:
        'Begin met het toevoegen van menu-items met behulp van de pluspictogramknop in de rechterbovenhoek van het scherm',
      MAX_FILE_SIZE: 'Max. Bestandsgrootte: 1 MB',
      SUPPORTED_FILE_EXTENSIONS: 'ondersteunde bestandsextensies: jpg/png',
      CHANGE_UNIQUE_URL_PATH:
        'Advies: u kunt het vetgedrukte gedeelte naar wens wijzigen.',
    },
    Actions: {
      EDIT_COLOR: 'Kleur bewerken',
      APPLY_CHANGES: 'Pas wijzigingen toe',
      PROCEED: 'Doorgaan',
      CANCEL: 'Annuleren',
      SAVE: 'Opslaan',
      SELECT: 'Selecteren',
      PREVIEW: 'Voorbeeld',
      EDIT: 'Aanpassen',
      CREATE: 'Createeren',
      DELETE: 'Verwijderen',
      SIGN_IN: 'Inloggen',
      SIGN_UP: 'Registreren',
      SIGN_OUT: 'Uitloggen',
      ADD_NEW_MENU_ITEM: 'Voeg een nieuw menu-item toe',
      ADD_NEW_MENU: 'Voeg een nieuw menu toe',
      REMEMBER_ME: 'Onthoud mij',
      BACK_TO_DASHBOARD: 'Terug naar dashboard',
      DOWNLOAD: 'Downloaden',
      PRINT: 'Printen',
      REPLACE: 'Vervangen',
      REMOVE: 'Verwijderen',
      ADD: 'Toevoegen',
      QR_CODE: 'QR code',
      BACK_TO_MENU_LIST: 'Terug naar de menukaart',
      CONTACT_US: 'Neem contact met ons op',
      WRITE_SOMETHING_HERE: 'Schrijf hier iets ...',
      CLICK_HERE: 'Klik hier',
    },
  },
  ConfirmationActions: {
    DELETE_MENU: {
      getTitle: name => `Verwijder het menu '${name}'`,
      getContent: name =>
        `Klik op doorgaan om het geselecteerde menu te verwijderen '${name}'`,
    },
    DELETE_MENU_ITEM: {
      getTitle: itemName => `Verwijder menu items '${itemName}'`,
      getContent: itemName =>
        `Klik op doorgaan om het geselecteerde item te verwijderen '${itemName}'`,
    },
    DELETE_MENU_ITEM_LOCALE: {
      getTitle: lang => `Verwijder de '${lang}'vertaling`,
      getContent: lang =>
        `Klik op doorgaan om de te verwijderen '${lang}'vertaling voor het geselecteerde menu-item`,
    },
  },
};
