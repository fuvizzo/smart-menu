/*import * as Yup from 'yup';
 const price = Yup.string().required();
const type = Yup.string().required();
const name = Yup.string().required();

export const createMenuItemSchema = defaultLanguage =>
  Yup.object().shape({
    type,
    price,
    locales: Yup.object().shape({
      [defaultLanguage]: Yup.object().shape({
        name,
      }),
    }),
  });

export const createSetMenuItemSchema = defaultLanguage =>
  Yup.object().shape({
    type,
    locales: Yup.object().shape({
      [defaultLanguage]: Yup.object().shape({
        name,
      }),
    }),
  });
 */
