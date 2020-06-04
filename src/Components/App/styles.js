import styled from 'styled-components';
import {
  AppBar as MUI_AppBar,
  Toolbar as MUI_Toolbar,
  Typography as MUI_Typography,
  IconButton,
  List,
  ListItem as MUI_ListItem,
} from '@material-ui/core/';

import { Link as RouterDomLink } from 'react-router-dom';

const AppBar = styled(MUI_AppBar)`
  border-bottom: 1px solid #e6e6e6;
`;

const Toolbar = styled(MUI_Toolbar)`
  flex-wrap: wrap;
`;

const ToolbarTitle = styled(MUI_Typography)`
  flex-grow: 1;
`;

const RouterLink = styled(RouterDomLink)`
  text-decoration: none;
`;

const NavList = styled(List)`
  display: flex;
  flex-direction: column;
  @media (min-width: 650px) {
    flex-direction: row;
  }
`;

const ListItem = styled(MUI_ListItem)`
  justify-content: center;
  white-space: nowrap;
`;

const DesktopNav = styled.nav`
  display: none;

  @media (min-width: 650px) {
    display: flex;
  }
`;

const MenuButton = styled(IconButton)`
  @media (min-width: 650px) {
    display: none;
  }
`;

export {
  ListItem,
  NavList,
  DesktopNav,
  AppBar,
  Toolbar,
  ToolbarTitle,
  RouterLink,
  MenuButton,
};
