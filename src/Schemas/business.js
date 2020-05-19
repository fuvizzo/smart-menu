import * as Yup from 'yup';

export default errorLables => {
  const uniqueUrlPath = Yup.string().required(errorLables.REQUIRED);
  const name = Yup.string().required(errorLables.REQUIRED);

  return Yup.object().shape({
    name,
    uniqueUrlPath,
  });
};
