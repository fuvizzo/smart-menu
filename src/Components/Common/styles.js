import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  /* root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }, */
  formControl: {
    paddingTop: 5,
    paddingBottom: 25,

    minWidth: 320,
    flexGrow: 1,
    width: '100%',
  },
  selectField: {
    maxWidth: 250,
  },

  textField: {},
  buttonBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
