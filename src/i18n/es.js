export default {
  BUSINESS_TYPES: ['Restaurante', 'Bar', 'Cafetería', 'Café', 'Pub'],
  MenuItemTypes: {
    FoodAndDrinks: {
      LABEL: 'Comida y bebidas',
      ITEM_LIST: [
        'Entrantes',
        'Primeros',
        'Segundos',
        'Guarnición',
        'Postres',
        'Bebidas',
      ],
    },
    Pizzas: {
      LABEL: 'Pizzas',
      ITEM_LIST: [
        'Pizzas tradicionales',
        'Pizzas con harinas especiales',
        "'Calzone's'",
        "'Covaccinos's",
        'Pizzas fritas',
        'Pizzas dulces',
        'Pizzas con borde relleno',
      ],
    },
    WineChart: {
      LABEL: 'Carta de vinos',
      ITEM_LIST: [
        'Espumosos',
        'Vinos tintos',
        'Vinos blancos',
        'Vinos rosados',
        'Vinos de postre',
        'Licores y destilados',
      ],
    },
  },
  DEFAULT_LANGUAGE: 'Idioma predeterminado',
  Languages: {
    en: 'Inglés',
    es: 'Español',
    cat: 'Catalán',
    it: 'Italiano',
    fr: 'Francés',
    nl: 'Holandés',
  },
  Labels: {
    Sections: {
      DASHBOARD: 'Panel de control',
      MENU_LIST: 'Lista de menús',
      MENU_EDITOR: 'Editor de menús',
      ACCOUNT: 'Cuenta',
      SUBSCRIPTION_STATUS: 'Suscripción',
      BUSINESS: 'Mi negocio',
      SIGN_IN: 'Iniciar sesión',
      SIGN_UP: 'Registrarse',
      PRICING: 'Precio',
      HOME: 'Inicio',
    },
    Menu: {
      INGREDIENTS_LIST: 'Lista de ingredientes',
      MENU: 'Menú normal',
      TYPE: 'Tipo de menú',
      SET_MENU: 'Menú fijo',
      NAME: 'Nombre',
      MENU_NAME: 'Nombre del menú',
      EMPTY_MENU: 'El menú actual todavía no tiene ningún elemento',
      EMPTY_MENU_LIST: 'Todavía no hay menús',
      CATEGORY: 'Categoría',
      DESCRIPTION: 'Descripción',
      PRICE: 'Precio (€)',
      LANGUAGE: 'Idioma',
      UNPUBLISHED: 'No publicado',
      PUBLISHED: 'Publicado',
      ITEMS: 'Elementos',
      INFO: 'Info',
      LANGUAGE_SETTINGS: 'Configuración de idioma',
      PROVIDED_LANGUAGES: 'El contenido del menú actual se proporcionará en',
      QR_CODE: 'Código QR de la página de los menús',
      WEB_LINK: 'Dirección web de la página del menú',
      NO_MENUS_AVAILABLE: 'No hay cartas disponibles en el idioma que elegiste',
    },
    Business: {
      NAME: 'Nombre comercial',
      UNIQUE_URL_PATH: 'Ruta URL única',
      LOGO: 'Logotipo de empresa',
      HEADER_BANNER: 'Banner de encabezado (tamaño recomendado: 1024 x 300 px)',
      ColorPalette: {
        PRIMARY: 'Color primario',
        SECONDARY: 'Color secundario',
        ACCENT: 'Acento',
      },
      TYPE: 'Tipo',
      INFO: 'Info',
      MEDIA_AND_THEME: 'Media y tema',
    },
    Account: {
      FIRST_NAME: 'Nombre',
      LAST_NAME: 'Apellido',
      ACCOUNT_OWNER: 'Propietario de la cuenta',
      EMAIL_ADDRESS: 'Dirección de correo electrónico',
      PASSWORD: 'Contraseña',
      NEWS_LETTER:
        'Deseo recibir noticias, promociones de marketing y actualizaciones por correo electrónico.',
    },
    Errors: {
      FormValidation: {
        REQUIRED: 'Este campo es obligatorio',
        CURRENCY: 'Este campo debe estar en formato € (ej: 10,50)',
        UNIQUE_URL_PATH_ALREADY_IN_USE:
          'La ruta URL única que eligió ya está en uso. Por favor, elija una diferente',
        INVALID_EMAIL_ADDRESS: 'Dirección de correo electrónico no válida',
        ALLOWED_CHARACTERS:
          'Aquí solo se permiten letras, dígitos, guiones, guiones bajos y carácteres de espacio.',
        EMPTY_PROVIDED_LANGUAGES_NOT_ALLOWED:
          'Operación no permitida. La lista debe tener al menos un idioma por defecto',

        EMPTY_LOCALES_NOT_ALLOWED:
          'Operacion no permitida. Tienes que asegurarte que el nombre de este elemento sea traducido al menos en un idioma',
      },
      GENERIC: 'Se produjo un error durante la operación',
      Authentication: {
        WRONG_PASSWORD: '¿Estás segura/o de que la contraseña es la correcta?',
        EMAIL_ALREADY_IN_USE:
          'Esta dirección de correo electrónico ya está registrada. ¡Use uno diferente por favor!',
        INVALID_ACTION_CODE:
          'El enlace ya no es válido. ¡Vuelva a intentar la operación desde cero por favor!',
        USER_NOT_FOUND:
          '¿Estás segura/o de que la dirección de correo electrónico es la correcta?',
      },
      Success: {
        CONTACT_REQUEST_SENT:
          '¡Gracias para contactarnos. Te contestaremos tan pronto nos sea posible!',
      },
    },
    Common: {
      SHOW_OTHER_LANGUAGES: 'Mostrar otros idiomas',
      LANGUAGE: 'Idioma',
    },
    Warnings: {
      MISSING_NAME: 'Nombre no encontrado',
      MISSING_FIELD: 'Este campo no se ha completado',
      getMissingFieldDetailedMessage: fieldName =>
        `El campo '${fieldName}' no se ha completado `,
    },
    Hints: {
      UNIQUE_URL_PATH:
        '¡Esta es una identificación fácil de usar con la que vinculará su negocio y permitirá que los usuarios naveguen por sus menús más fácilmente!!',
      LOGO: 'El logotipo de su empresa se mostrará en la página del menú',
      SIGN_IN: '¿Ya tiene una cuenta? Inicie sesión',
      SIGN_UP: '¿No tiene una cuenta? Regístrese',
      PASSWORD_FORGOTTEN: '¿Olvidó su contraseña?',
      ADD_MENU:
        'Comience a crear un nuevo menú utilizando el botón con el icono más en la parte superior derecha de la pantalla',
      ADD_MENU_ITEM:
        'Comience a agregar elementos de menú utilizando el botón con el ícono más en la parte superior derecha de la pantalla',
      MAX_FILE_SIZE: 'Tamaño máximo del archivo: 1 MB',
      SUPPORTED_FILE_EXTENSIONS: 'Extensiones de archivo permitidas: jpg/png',
      CHANGE_UNIQUE_URL_PATH:
        'Consejo: puede cambiar la parte en negrita como desee.',
    },
    Actions: {
      EDIT_COLOR: 'Editar color',
      APPLY_CHANGES: 'Aplicar cambios',
      PROCEED: 'Continuar',
      CANCEL: 'Cancelar',
      SAVE: 'Guardar',
      SELECT: 'Seleccionar',
      PREVIEW: 'Vista previa',
      EDIT: 'Editar',
      CREATE: 'Crear',
      DELETE: 'Eliminar',
      SIGN_IN: 'Iniciar sesión',
      SIGN_UP: 'Registrarse',
      SIGN_OUT: 'Cerrar sesión',
      ADD_NEW_MENU_ITEM: 'Agregar un nuevo elemento de menú',
      ADD_NEW_MENU: 'Agregar un nuevo menú',
      REMEMBER_ME: 'Recordarme',
      BACK_TO_DASHBOARD: 'Volver al panel de control',
      DOWNLOAD: 'Descargar',
      PRINT: 'Imprimir',
      REPLACE: 'Reemplazar',
      REMOVE: 'Quitar',
      ADD: 'Añadir',
      QR_CODE: 'Código QR',
      BACK_TO_MENU_LIST: 'Volver al listado de menús',
      CONTACT_US: 'Contactar',
      WRITE_SOMETHING_HERE: 'Escribe algo aquí...',
    },
  },
  ConfirmationActions: {
    DELETE_MENU: {
      getTitle: name => `Eliminar el menú '${name}'`,
      getContent: name =>
        `Haga clic en continuar para eliminar el menú seleccionado '${name}'`,
    },
    DELETE_MENU_ITEM: {
      getTitle: itemName => `Eliminar el elemento de menú '${itemName}'`,
      getContent: itemName =>
        `Haga clic en continuar para eliminar el elemento seleccionado'${itemName}'`,
    },
    DELETE_MENU_ITEM_LOCALE: {
      getTitle: lang => `Eliminar la traducción '${lang}'`,
      getContent: lang =>
        `Haga clic en continuar para eliminar la traducción '${lang}' para el elemento del menú seleccionado`,
    },
  },
};
