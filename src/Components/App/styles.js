import { styled, withStyles, createMuiTheme } from '@material-ui/core/styles';
import {
  AppBar as MUI_AppBar,
  Toolbar as MUI_Toolbar,
  Typography as MUI_Typography,
  Link as MUI_Link,
} from '@material-ui/core/';

import { Link as RouterDomLink } from 'react-router-dom';

const theme = createMuiTheme();

const AppBar = styled(MUI_AppBar)({
  borderBottom: `1px solid ${theme.palette.divider}`,
});

const Toolbar = styled(MUI_Toolbar)({
  flexWrap: 'wrap',
});

const ToolbarTitle = styled(MUI_Typography)({
  flexGrow: 1,
});

const Link = styled(MUI_Link)({
  margin: theme.spacing(1, 1.5),
});

const RouterLink = styled(RouterDomLink)({
  textDecoration: 'none',
});

export { AppBar, Toolbar, ToolbarTitle, Link, RouterLink };
