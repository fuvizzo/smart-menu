import * as Yup from 'yup';
import constants from '../Constants';

export default errorLables => {
  const uniqueUrlPath = Yup.string()
    .matches(constants.ALLOWED_CHARACTERS_REGEX, errorLables.ALLOWED_CHARACTERS)
    .required(errorLables.REQUIRED);
  const name = Yup.string().required(errorLables.REQUIRED);

  return Yup.object().shape({
    name,
    uniqueUrlPath,
  });
};
