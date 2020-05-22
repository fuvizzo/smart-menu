import { makeStyles, styled } from '@material-ui/core/styles';
import MUI_HelpIcon from '@material-ui/icons/Help';
import {
  Box,
  Typography,
  FormControl as MUI_FormControl,
  withStyles,
} from '@material-ui/core';

const HelpIcon = styled(MUI_HelpIcon)({
  fontSize: '1rem',
});

const Label = styled(Typography)({
  fontSize: 12,
});

const FormControl = styled(MUI_FormControl)({
  paddingTop: 5,
  paddingBottom: 15,
  minWidth: 320,
  flexGrow: 1,
  width: '100%',
});

const ButtonBar = withStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))(Box);

const ShortFormFieldWrapper = withStyles(theme => ({
  root: {
    width: 150,
    '&>div': {
      width: 150,
    },
  },
}))(Box);

const Header = withStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))(Box);

const PopoverHint = styled(Box)({
  maxWidth: 300,
});

export {
  HelpIcon,
  Label,
  FormControl,
  ButtonBar,
  ShortFormFieldWrapper,
  Header,
  PopoverHint,
};

export default makeStyles(theme => ({
  warning: {
    color: 'yellow',
  },
}));
