import React from 'react';
import { connect } from 'react-redux';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/index';
import IconButton from '@material-ui/core/IconButton';
import * as uiActions from '../../Actions/ui-actions';
import Toolbar from '@material-ui/core/Toolbar';
import useMenuStyles from './styles';
import NewMenuItemDialog from './MenuItems/new-item-dialog';
import { useParams } from 'react-router-dom';
const { Locale } = constants;

const emptyMenuItemData = defaultLanguage => ({
  price: '',
  category: '',
  locales: {
    [defaultLanguage]: {
      description: '',
      ingredients: '',
      name: '',
    },
  },
});

const SectionHeader = props => {
  const {
    defaultLanguage,
    menus,
    enableInsertMode,
    disableEditMode,
    collapseLanguageTabsPanel,
  } = props;
  const classes = useMenuStyles();
  const { menuId } = useParams();
  const menu = menus[menuId];
  const {
    Labels: { Sections: SectionLabels },
  } = Locale[defaultLanguage];
  const menuTitle = menu.info.locales[defaultLanguage].name;

  return (
    <Toolbar className={classes.toolbar}>
      <Typography className={classes.header} component="h1">
        {SectionLabels.MENU_EDITOR}: {menuTitle}{' '}
        {menu.info.setMenu && `(${menu.info.setMenu}€)`}
      </Typography>
      <IconButton
        edge="end"
        aria-describedby=""
        color="inherit"
        onClick={() => {
          collapseLanguageTabsPanel();
          disableEditMode();
          enableInsertMode({
            id: menuId,
            value: emptyMenuItemData(defaultLanguage),
            setMenu: menu.info.setMenu,
          });
        }}
      >
        <AddCircleOutlineIcon />
      </IconButton>
      <NewMenuItemDialog />
    </Toolbar>
  );
};

function mapStateToProps(state) {
  return {
    menus: state.menus,
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}
export default connect(mapStateToProps, uiActions)(SectionHeader);
