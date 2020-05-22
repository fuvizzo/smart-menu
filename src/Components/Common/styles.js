import { makeStyles, styled } from '@material-ui/core/styles';
import HelpIconMUI from '@material-ui/icons/Help';
import { Typography } from '@material-ui/core';
const HelpIcon = styled(HelpIconMUI)({
  fontSize: '1rem',
});

const Label = styled(Typography)({
  fontSize: 12,
});

export { HelpIcon, Label };

export default makeStyles(theme => ({
  /* root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }, */
  formControl: {
    paddingTop: 5,
    paddingBottom: 15,

    minWidth: 320,
    flexGrow: 1,
    width: '100%',
  },
  selectField: {
    maxWidth: 250,
  },
  label: {
    fontSize: 12,
  },
  popoverHint: {
    maxWidth: 300,
  },
  header: {
    flexGrow: 1,
  },
  warning: {
    color: 'yellow',
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
