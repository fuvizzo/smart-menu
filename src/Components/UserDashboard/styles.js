import { red } from '@material-ui/core/colors';

import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { QRCodeIcon as QRCode } from '../SVGs';
import {
  ListItemIcon as MUI_ListItemIcon,
  Typography,
} from '@material-ui/core';

export const QRCodeIcon = styled(QRCode)`
  font-size: 1.51rem;
`;

export const ListItemIcon = styled(MUI_ListItemIcon)`
  min-width: 42px;
`;

export const MenuNameTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 140px;
  text-overflow: ellipsis;
`;

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
    backgroundSize: '99%',
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
    color: '#f50057',
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
