import * as Yup from 'yup';

export const signUp = errorLables => {
  const firstName = Yup.string().required(errorLables.REQUIRED);
  const lastName = Yup.string().required(errorLables.REQUIRED);
  const email = Yup.string().email().required(errorLables.REQUIRED);
  const password = Yup.string().min(6).required(errorLables.REQUIRED);

  return Yup.object().shape({
    firstName,
    lastName,
    email,
    password,
  });
};

export const signIn = errorLables => {
  const email = Yup.string().email().required(errorLables.REQUIRED);
  const password = Yup.string().required(errorLables.REQUIRED);

  return Yup.object().shape({
    email,
    password,
  });
};
