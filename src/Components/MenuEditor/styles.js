import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  cardContent: {
    paddingTop: 0,
  },
  priceField: {
    maxWidth: 100,
  },
}));
