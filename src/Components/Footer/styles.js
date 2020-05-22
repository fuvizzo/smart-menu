import { withStyles } from '@material-ui/core/styles';
import { Container as MUI_Container } from '@material-ui/core/';

const Container = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}))(MUI_Container);

export { Container };
