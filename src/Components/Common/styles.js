import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import HelpIconMUI from '@material-ui/icons/Help';

const HelpIcon = styled(HelpIconMUI)`
  font-size: 1rem;
`;

export { HelpIcon };

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
  textField: {},
  buttonBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
