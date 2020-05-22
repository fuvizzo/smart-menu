import { styled, createMuiTheme, withStyles } from '@material-ui/core/styles';
import {
  Container,
  CardHeader as MUI_CardHeader,
  Box,
} from '@material-ui/core/';

const theme = createMuiTheme();

const HeroContent = withStyles(theme => ({
  root: { padding: theme.spacing(8, 0, 6) },
}))(Container);

const CardHeader = withStyles(theme => ({
  root: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
}))(MUI_CardHeader);

const PricingBox = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
})(Box);

export { HeroContent, CardHeader, PricingBox };
