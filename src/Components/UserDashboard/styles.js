import { red } from '@material-ui/core/colors';

import { makeStyles, styled } from '@material-ui/core/styles';
import { QRCodeIcon as QRCode } from '../SVGs';

export const QRCodeIcon = styled(QRCode)({
  fontSize: '1.51rem',
});

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
    backgroundSize: '80%',
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
  descriptionParagraph: {
    height: 70,
    paddingBottom: 10,
    fontSize: 12,
  },
  warning: {
    fontSize: '0.8rem',
    color: 'yellow',
  },
  emptyMenuList: {
    height: 250,
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      flex: 1,
    },
  },
}));
