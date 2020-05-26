import { makeStyles, styled } from '@material-ui/core/styles';
import { Form } from 'formik';
import { Box } from '@material-ui/core';

const PasswordResetDialogContent = styled(Box)({
  minWidth: 400,
});

export { PasswordResetDialogContent };

export default makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  selectorWrapper: {
    display: 'flex',
    '&>div': {
      flexGrow: 1,
    },
  },
}));
