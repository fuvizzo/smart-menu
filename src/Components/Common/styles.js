import { makeStyles, styled } from '@material-ui/core/styles';
import {
  Help as MUI_HelpIcon,
  BrokenImage as MUI_BrokenImage,
} from '@material-ui/icons';
import {
  Box,
  Typography,
  Select,
  FormControl as MUI_FormControl,
  withStyles,
} from '@material-ui/core';

const HelpIcon = styled(MUI_HelpIcon)({
  fontSize: '1rem',
});

const BrokenImage = styled(MUI_BrokenImage)({
  fontSize: '6rem',
  fill: '#e6e6e6',
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
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(2),
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

const LangSelector = withStyles({
  root: {
    padding: '8.5px 24px 8.5px 10px',
  },
})(Select);

export {
  HelpIcon,
  BrokenImage,
  Label,
  FormControl,
  ButtonBar,
  ShortFormFieldWrapper,
  Header,
  PopoverHint,
  LangSelector,
};

export default makeStyles(theme => ({
  warning: {
    color: 'yellow',
  },
}));
