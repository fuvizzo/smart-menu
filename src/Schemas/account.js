import * as Yup from 'yup';

const createEmailValidator = errorLables =>
  Yup.string()
    .email(errorLables.INVALID_EMAIL_ADDRESS)
    .required(errorLables.REQUIRED);

const createPasswrodValidator = errorLables =>
  Yup.string()
    .min(6, 'Must be at least 6 characters long...')
    .required(errorLables.REQUIRED);

export const signUp = errorLables => {
  const firstName = Yup.string().required(errorLables.REQUIRED);
  const lastName = Yup.string().required(errorLables.REQUIRED);
  const businessName = Yup.string().required(errorLables.REQUIRED);
  const email = createEmailValidator(errorLables);
  const password = createPasswrodValidator(errorLables);

  return Yup.object().shape({
    firstName,
    lastName,
    email,
    businessName,
    password,
  });
};

export const signIn = errorLables => {
  const email = createEmailValidator(errorLables);

  return Yup.object().shape({
    email,
    password: Yup.string().required(errorLables.REQUIRED),
  });
};

export const email = errorLables =>
  Yup.object().shape({
    email: createEmailValidator(errorLables),
  });

export const resetPassword = errorLables => {
  const password = createPasswrodValidator(errorLables);
  const confirmPassword = Yup.string()
    .required(errorLables.REQUIRED)
    .oneOf([Yup.ref('password'), null], 'Passwords must match');
  return Yup.object().shape({
    password,
    confirmPassword,
  });
};
