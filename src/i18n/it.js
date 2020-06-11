export default {
  BUSINESS_TYPES: ['Ristorante', 'Bar', 'Caffeteria', 'Cafe', 'Pub'],

  MenuItemTypes: {
    FoodAndDrinks: {
      LABEL: 'Cibi e bibite',
      ITEM_LIST: [
        'Antipasti',
        'Primi',
        'Secondi',
        'Contorni',
        'Desserts',
        'Bibite',
      ],
    },
    Pizzas: {
      LABEL: 'Pizze',
      ITEM_LIST: [
        'Pizze tradizionali',
        'Pizze con farine speciali',
        'Calzoni',
        'Covaccini',
        'Pizze fritte',
        'Pizze dolci',
        'Pizze con bordo ripieno',
      ],
    },
    WineChart: {
      LABEL: 'Carta dei vini',
      ITEM_LIST: [
        'Bollicine/spumanti',
        'Vini rossi',
        'Vini bianchi',
        'Vini rosè',
        'Vini da dessert',
        'Liquori e distillati',
      ],
    },
  },
  DEFAULT_LANGUAGE: 'Lingua stabilita',
  Languages: {
    en: 'Inglese',
    es: 'Spagnolo',
    cat: 'Catalano',
    it: 'Italiano',
    fr: 'Francese',
    nl: 'Olandese',
  },
  Labels: {
    Sections: {
      DASHBOARD: 'Dashboard',
      MENU_LIST: 'Lista menu',
      MENU_EDITOR: 'Menu editor',
      ACCOUNT: 'Account',
      SUBSCRIPTION_STATUS: "Stato dell'abbonamento",
      BUSINESS: 'La mia attività',
      SIGN_IN: 'Entra',
      SIGN_UP: 'Registrati',
      PRICING: 'Costo del servizio',
      HOME: 'Home',
    },
    Menu: {
      INGREDIENTS_LIST: 'Lista ingredienti',
      MENU: 'Menu normale',
      TYPE: 'Tipo di menù',
      SET_MENU: 'Menù a prezzo fisso',
      NAME: 'Nome',
      MENU_NAME: 'Nome del menù',
      EMPTY_MENU: 'Il menu corrente non contiene ancora nessun elemento',
      EMPTY_MENU_LIST: 'Non è stato creato ancora alcun menù',
      CATEGORY: 'Categoria',
      DESCRIPTION: 'Descrizione',
      PRICE: 'Prezzo (€)',
      LANGUAGE: 'Lingua',
      UNPUBLISHED: 'Non pubblicato',
      PUBLISHED: 'Pubblicato',
      ITEMS: 'Elementi',
      INFO: 'Info',
      LANGUAGE_SETTINGS: 'Impostazioni lingua',
      PROVIDED_LANGUAGES: 'Il menu corrente sarà consultabile in:',
      QR_CODE: 'QR code della pagina dei menù',
      WEB_LINK: 'Indirizzo web della pagina dei menù',
      NO_MENUS_AVAILABLE:
        'Non ci sono menù disponibili nella lingua che hai selezionato',
    },
    Business: {
      NAME: "Nome dell'attività",
      UNIQUE_URL_PATH: 'Percorso URL univoco',
      LOGO: 'Logo attività',
      HEADER_BANNER: 'Header banner (dimensioni suggerite: 1024 x 300 px)',
      ColorPalette: {
        PRIMARY: 'Colore primario',
        SECONDARY: 'Colore secondario',
        ACCENT: "Colore d'accento",
      },
      TYPE: 'Tipo',
      INFO: 'Info',
      MEDIA_AND_THEME: 'Media e tema',
    },
    Account: {
      FIRST_NAME: 'Nome',
      LAST_NAME: 'Cognome',
      ACCOUNT_OWNER: "Proprietario dell'account",
      EMAIL_ADDRESS: 'Indirizzo email',
      PASSWORD: 'Password',
      NEWS_LETTER:
        'Voglio ricevere news, promozioni commerciali ed aggiornamenti via email',
    },
    Errors: {
      FormValidation: {
        REQUIRED: 'Questo campo è richiesto',
        CURRENCY: 'Questo campo deve essere in formato € (es: 10,50)',
        UNIQUE_URL_PATH_ALREADY_IN_USE:
          'Il percorso URL univoco che hai scelto è già utilizzato. Scegliene uno differente, per favore',
        INVALID_EMAIL_ADDRESS: 'Invalid e-mail address',
        ALLOWED_CHARACTERS:
          'Qui sono ammessi solo lettere, cifre, trattini, trattini bassi e spazi',

        EMPTY_PROVIDED_LANGUAGES_NOT_ALLOWED:
          'Operazione non consentita. La lista deve contenere almento una lingua predefinita',
        EMPTY_LOCALES_NOT_ALLOWED:
          'Operazione non consentita. Assicurati che il nome di questo elemento sia tradotto al meno in una lingua',
      },
      GENERIC: "Si è verificato un errore durante l'operazione",
      Authentication: {
        WRONG_PASSWORD: 'Sei sicuro che la password sia quella giusta?',
        EMAIL_ALREADY_IN_USE:
          'Questo indirizzo email è già registrato. Usane uno differente, grazie!',
        INVALID_ACTION_CODE:
          "Il link non è più valido. Riprova l'operazione di nuovo!",
        USER_NOT_FOUND: "Sei sicuro che l'indirizzo email sia quello giusto?",
      },
    },
    Success: {
      CONTACT_REQUEST_SENT:
        'Grazie per averci contattato. Ti risponderemo al più presto possibile!',
    },
    Common: {
      SHOW_OTHER_LANGUAGES: 'Mostra altre lingue',
      LANGUAGE: 'Lingua',
    },
    Warnings: {
      MISSING_NAME: 'Nome mancante',
      MISSING_FIELD: 'Questo campo non è stato ancora riempito',
      getMissingFieldDetailedMessage: fieldName =>
        `Il campo '${fieldName}' non è stato ancora riempito`,
    },
    Hints: {
      UNIQUE_URL_PATH:
        'Questo parametro è un ID di facile utilizzo a cui verrà connessa la tua attività in modo che i tui clienti podranno accedere ai tuoi menù in modo semplice',
      LOGO: 'Il logo della tua attivtà cerrà mostrato nella pagina del menù',
      SIGN_IN: 'Possiedi già un account? Entra',
      SIGN_UP: 'Non possiedi ancora un account? Registrati',
      PASSWORD_FORGOTTEN: 'Password dimenticata?',
      ADD_MENU:
        "Inizia a creare un nuovo menù cliccando sul bottono col simbolo 'più' in alto a destra dello schermo",
      ADD_MENU_ITEM:
        "Inizia ad aggiungere elementi al menù cliccando sul bottono col simbolo 'più' in alto a destra dello schermo",
      MAX_FILE_SIZE: 'Dimensione massima del file: 1 MB',
      SUPPORTED_FILE_EXTENSIONS: 'Estensioni del file supportate: jpg/png',
      CHANGE_UNIQUE_URL_PATH:
        'Consiglio: puoi cambiare la parte in grassetto come preferisci.',
    },
    Actions: {
      EDIT_COLOR: 'Cambia colore',
      APPLY_CHANGES: 'Conferma le modifiche',
      PROCEED: 'Procedi',
      CANCEL: 'Annulla',
      SAVE: 'Salva',
      SELECT: 'Seleziona',
      PREVIEW: 'Preview',
      EDIT: 'Modifica',
      CREATE: 'Crea',
      DELETE: 'Elimina',
      SIGN_IN: 'Entra',
      SIGN_UP: 'Registrati',
      SIGN_OUT: 'Esci',
      ADD_NEW_MENU_ITEM: 'Aggiungi un nuovo elemento',
      ADD_NEW_MENU: 'Aggiungi un nuovo menù',
      REMEMBER_ME: 'Ricordami',
      BACK_TO_DASHBOARD: 'Torna alla dashboard',
      DOWNLOAD: 'Scarica',
      PRINT: 'Stampa',
      REPLACE: 'Cambia',
      REMOVE: 'Rimuovi',
      ADD: 'Carica',
      QR_CODE: 'QR code',
      BACK_TO_MENU_LIST: 'Torna alla lista dei menù',
      CONTACT_US: 'Contattaci',
      WRITE_SOMETHING_HERE: 'Scrivi qualcosa qui...',
    },
  },
  ConfirmationActions: {
    DELETE_MENU: {
      getTitle: name => `Elimina il menù '${name}'`,
      getContent: name => `Clicca su procedi per eliminare il menù '${name}'`,
    },
    DELETE_MENU_ITEM: {
      getTitle: itemName => `Elimina l'elemento del menù '${itemName}'`,
      getContent: itemName =>
        `Clicca su procedi per eliminare l'elemento selezionato '${itemName}'`,
    },
    DELETE_MENU_ITEM_LOCALE: {
      getTitle: lang => `Elimina la traduzione in '${lang}'`,
      getContent: lang =>
        `Clicca su procedi per eliminare la traduzione in '${lang}' per l'elemento selezionato`,
    },
  },
};
