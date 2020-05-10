import React from 'react';
import { connect } from 'react-redux';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';

import ConfirmationDialog from '../UserDashboard/confirmation-dialog';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import constants from '../../Constants/index';
import { cloneDeep } from 'lodash';
import LocaleEditor from './locale-editor';
import useStyles from '../UserDashboard/styles';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import LanguageTabsPanel from './language-tabs-panel';
import MenuItemActions from '../UserDashboard/popover-actions';
import CardActions from '@material-ui/core/CardActions';
import * as uiActions from '../../Actions/ui-actions';
import * as menuActions from '../../Actions/menu-actions';

const MenuEditor = props => {
  const { menuId } = useParams();
  const [actionPopoverAnchorEl, setActionPopoverAnchorEl] = useState(null);
  const menuItemActionsPopoverOpen = Boolean(actionPopoverAnchorEl);
  const menuItemActionsPopoverId = menuItemActionsPopoverOpen
    ? 'menu-item-actions-popover'
    : undefined;

  const classes = useStyles();
  const {
    menus,
    ui,
    sortMenu,
    createNewMenuItem,
    deleteMenuItem,
    updateMenuItem,
    createNewLocale,
    deleteLocale,
    showActionsPopover,
    hideActionsPopover,
    openConfirmationDialog,
    closeConfirmationDialog,
    editData,
    enableEditMode,
    disableEditMode,
    insertData,
    enableInsertMode,
    disableInsertMode,
    expandLanguageTabsPanel,
    collapseLanguageTabsPanel,
  } = props;

  const defaultLanguage = ui.settings.defaultLanguage;
  const {
    LocalizedFields,
    SupportedLanguages,
    Locale,
    ConfirmationActions,
  } = constants;

  const {
    Labels: { Actions: ActionsLabels },
    Languages,
    DISH_TYPES: DishTypes,
  } = Locale[defaultLanguage];

  const menu = menus[menuId];

  const handleExpandLanguageTabsPanelClick = (event, menuItemId) => {
    const expanded = ui.languageTabsPanelState.expanded;
    disableInsertMode();
    if (!expanded || ui.languageTabsPanelState.itemId !== menuItemId) {
      expandLanguageTabsPanel(menuItemId);
    } else {
      collapseLanguageTabsPanel();
    }
  };

  const getAvailableLanguage = useCallback(usedLanguages => {
    return SupportedLanguages.filter(
      lang => !usedLanguages.some(l => l === lang)
    );
  }, []);

  const createNewMenuItemCallback = useCallback(data => {
    createNewMenuItem(menuId, {
      category: '4',
      locales: {
        en: {
          description: 'desc',
          ingredients: 'Ingredients list',
          name: 'Lemon cake',
        },
      },
      price: '6€',
    });
  }, []);

  const deleteMenuItemHandler = useCallback(menuItemId => {
    deleteMenuItem(menuId, menuItemId);
  }, []);

  const updateMenuItemHandler = useCallback(() => {
    const menuItemId = ui.editModeState.data.id;
    const body = ui.editModeState.data.value;
    updateMenuItem(menuId, menuItemId, body);
    disableEditMode();
  }, [ui.editModeState.data.value, ui.editModeState.data.id]);

  const createNewLocaleCallback = useCallback(() => {
    const { menuItemId, newLocale } = ui.insertModeState.data;
    createNewLocale(menuId, menuItemId, newLocale);
    disableInsertMode();
  }, [ui.insertModeState.data]);

  const deleteLocaleHandler = useCallback((menuItemId, lang) => {
    deleteLocale(menuId, menuItemId, lang);
  }, []);

  const handleMenuItemActionsClick = useCallback(
    (event, key) => {
      if (menuItemActionsPopoverOpen) {
        setActionPopoverAnchorEl(null);
        hideActionsPopover();
      } else {
        setActionPopoverAnchorEl(event.currentTarget);
        showActionsPopover({
          menuItemId: key,
        });
      }
    },
    [ui.actionsPopoverState.menuItemId]
  );

  const onChangeValueHandler = useCallback(
    event => {
      const input = event.currentTarget;
      const currentValue = input.value;

      if (ui.insertModeState.enabled) {
        const lang = input.dataset.lang;
        const newLocale = ui.insertModeState.data.newLocale;
        newLocale.lang = lang;
        newLocale[input.name] = currentValue;
        insertData({
          ...ui.insertModeState.data,
          newLocale,
        });
      } else {
        const selectedItem = ui.editModeState.data;

        if (LocalizedFields.some(field => field === input.name)) {
          const lang = input.dataset.lang;
          selectedItem.value.locales[lang][input.name] = currentValue;
        } else {
          selectedItem.value[input.name] = currentValue;
        }

        editData(cloneDeep(selectedItem));
      }
    },
    [ui.editModeState.data, ui.insertModeState.data]
  );

  /*useEffect(() => {
    if (!editModeState.enabled) sortMenu(menu);
    console.log('reorder!');
  }, [menu.size, editModeState.enabled]); */

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <ConfirmationDialog
        open={ui.confirmationDialogState.open}
        action={ConfirmationActions.DELETE_MENU_ITEM}
        data={
          ui.confirmationDialogState.item &&
          ui.confirmationDialogState.item.value.locales[defaultLanguage].name
        }
        handleClose={() => closeConfirmationDialog()}
        onConfirm={() => {
          deleteMenuItemHandler(ui.confirmationDialogState.item.id);
          closeConfirmationDialog();
        }}
      />
      <MenuItemActions
        id={menuItemActionsPopoverId}
        open={menuItemActionsPopoverOpen}
        anchorEl={actionPopoverAnchorEl}
        handleClose={handleMenuItemActionsClick}
      >
        <List>
          <ListItem
            onClick={() => {
              const menuItemId = ui.actionsPopoverState.menuItemId;
              hideActionsPopover();
              setActionPopoverAnchorEl(null);
              enableEditMode({
                id: menuItemId,
                value: cloneDeep(menu.items[menuItemId]),
              });
            }}
            aria-label="edit"
            button
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary={ActionsLabels.EDIT} />
          </ListItem>
          <ListItem
            onClick={() => {
              const menuItemId = ui.actionsPopoverState.menuItemId;
              hideActionsPopover();
              setActionPopoverAnchorEl(null);
              openConfirmationDialog({
                id: menuItemId,
                value: menu.items[menuItemId],
              });
            }}
            aria-label="delete"
            button
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary={ActionsLabels.DELETE} />
          </ListItem>
        </List>
      </MenuItemActions>
      {Object.keys(menu.items).map(key => {
        const data = menu.items[key];
        const languageTabExpanded =
          ui.languageTabsPanelState.expanded &&
          ui.languageTabsPanelState.itemId === key;
        const availableLanguages = getAvailableLanguage(
          Object.keys(data.locales)
        );
        const showMenuItemEditForm =
          ui.editModeState.enabled &&
          ui.editModeState.data.id === key &&
          !ui.editModeState.data.childItem;
        return (
          <Grid item xs={12} key={key}>
            <Card width={1}>
              {showMenuItemEditForm ? (
                <div>
                  Edit mode
                  <div>
                    <div>
                      <select
                        name="category"
                        onChange={onChangeValueHandler}
                        type="text"
                        placeholder="Category"
                        value={ui.editModeState.data.value.category}
                      >
                        {DishTypes.map((dishType, index) => {
                          return (
                            <option key={index} value={index}>
                              {dishType}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <input
                        name="price"
                        onChange={onChangeValueHandler}
                        type="text"
                        placeholder="Price"
                        value={ui.editModeState.data.value.price}
                      />
                    </div>
                    {Object.keys(ui.editModeState.data.value.locales)
                      .filter(lang => lang === defaultLanguage)
                      .map((lang, index) => {
                        const locale =
                          ui.editModeState.data.value.locales[lang];
                        return (
                          <LocaleEditor
                            key={index}
                            lang={lang}
                            data={locale}
                            onChangeValue={onChangeValueHandler}
                          />
                        );
                      })}

                    <button onClick={updateMenuItemHandler}>
                      Apply changes
                    </button>
                    <button onClick={disableEditMode}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <CardHeader
                    className={classes.header}
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {DishTypes[data.category].substr(0, 1)}
                      </Avatar>
                    }
                    action={
                      <IconButton
                        aria-describedby={menuItemActionsPopoverId}
                        onClick={event =>
                          handleMenuItemActionsClick(event, key)
                        }
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={data.locales[defaultLanguage].name}
                    subheader={
                      data.price
                    } /*  {data.locales[defaultLanguage].description} */
                  />
                  <CardContent>
                    {data.locales[defaultLanguage].description && (
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        {data.locales[defaultLanguage].description}
                      </Typography>
                    )}
                    {data.locales[defaultLanguage].ingredients && (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        TRANSLATION NEEDED -> Ingredients:{' '}
                        {data.locales[defaultLanguage].ingredients}
                      </Typography>
                    )}
                    <CardActions disableSpacing>
                      <Button
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: languageTabExpanded,
                        })}
                        onClick={event =>
                          handleExpandLanguageTabsPanelClick(event, key)
                        }
                        aria-expanded={languageTabExpanded}
                        aria-label="show more"
                        endIcon={<ExpandMoreIcon />}
                      >
                        {!languageTabExpanded && 'Show Other languages tab'}
                      </Button>
                    </CardActions>
                  </CardContent>
                  <Collapse
                    in={languageTabExpanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    <LanguageTabsPanel
                      menu={menu}
                      createNewLocale={createNewLocaleCallback}
                      menuItemId={key}
                      availableLanguages={availableLanguages}
                      updateMenuItem={updateMenuItemHandler}
                      deleteLocale={deleteLocaleHandler}
                      onChangeValueHandler={onChangeValueHandler}
                      locales={data.locales}
                    />
                  </Collapse>
                </>
              )}
            </Card>
          </Grid>
        );
      })}

      <button onClick={createNewMenuItemCallback}>Add</button>
    </Grid>
  );
};

function mapStateToProps(state) {
  return {
    menus: state.menus,
    ui: state.ui,
  };
}

export default connect(mapStateToProps, { ...uiActions, ...menuActions })(
  MenuEditor
);
