import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
export default makeStyles(theme => ({
  cardGrid: {
    minWidth: 300,
  },
  root: {
    maxWidth: 345,
    maxHeight: 450,
  },
  toolbar: {
    flexGrow: 1,
  },
  header: {
    height: 80,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));