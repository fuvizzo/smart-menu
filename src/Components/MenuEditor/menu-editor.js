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
import * as menuActions from '../../Actions/menu-actions';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import constants from '../../Constants/index';
import { cloneDeep } from 'lodash';
import LocaleEditor from './locale-editor';
import NewLocaleEditor from './new-locale';
import useStyles from '../UserDashboard/styles';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import LanguageTabsPanel from './language-tabs-panel';
import MenuItemActions from '../UserDashboard/popover-actions';
import CardActions from '@material-ui/core/CardActions';

const emptyLocaleData = {
  lang: '',
  name: '',
  description: '',
  ingredients: '',
};

const MenuEditor = props => {
  const { menuId } = useParams();
  const classes = useStyles();
  const {
    sortMenu,
    createNewMenuItem,
    deleteMenuItem,
    updateMenuItem,
    createNewLocale,
    deleteLocale,
    defaultLanguage,
    menus,
  } = props;

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

  const defaultEditModeState = {
    enabled: false,
    selectedItem: {},
  };

  const defaultInserLocaleModeState = {
    enabled: false,
    selectedItem: {},
  };

  const defaultConfirmationDialogState = {
    open: false,
    item: null,
  };

  const defaultLanguageTabsPanelState = {
    expanded: false,
    menuItemId: null,
  };

  const defaultMenuItemActionsPopoverState = {
    anchorEl: null,
    menuItemId: null,
  };

  const [
    menuItemActionsPopoverState,
    setMenuItemActionsPopoverState,
  ] = useState(defaultMenuItemActionsPopoverState);

  const menuItemActionsPopoverOpen = Boolean(
    menuItemActionsPopoverState.anchorEl
  );
  const menuItemActionsPopoverId = menuItemActionsPopoverOpen
    ? 'menu-item-actions-popover'
    : undefined;

  const [confirmationDialogState, setConfirmationDialogState] = useState(
    defaultConfirmationDialogState
  );

  const [editModeState, setEditModeState] = useState(defaultEditModeState);
  const [insertLocaleModeState, setInsertLocaleModeState] = useState(
    defaultInserLocaleModeState
  );
  const [languageTabsPanelState, setLanguageTabsPanelState] = useState(
    defaultLanguageTabsPanelState
  );

  const handleExpandLanguageTabsPanelClick = (event, menuItemId) => {
    const expanded = languageTabsPanelState.expanded;
    setLanguageTabsPanelState(
      !expanded || languageTabsPanelState.menuItemId !== menuItemId
        ? { expanded: true, menuItemId }
        : defaultLanguageTabsPanelState
    );
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
    const menuItemId = editModeState.selectedItem.id;
    const body = editModeState.selectedItem.value;
    updateMenuItem(menuId, menuItemId, body);
    setEditModeState({
      enabled: false,
      selectedItem: {},
    });
  }, [editModeState.selectedItem.value, editModeState.selectedItem.id]);

  const createNewLocaleCallback = useCallback(() => {
    const { menuItemId, newLocale } = insertLocaleModeState;
    createNewLocale(menuId, menuItemId, newLocale);
    toggleAddLocalMode({ cancel: true });
  }, [insertLocaleModeState]);

  const deleteLocaleHandler = useCallback((menuItemId, lang) => {
    deleteLocale(menuId, menuItemId, lang);
  }, []);

  const handleMenuItemActionsClick = useCallback(
    (event, key) => {
      setMenuItemActionsPopoverState(
        !menuItemActionsPopoverOpen
          ? { anchorEl: event.target, menuItemId: key }
          : defaultMenuItemActionsPopoverState
      );
    },
    [menuItemActionsPopoverState.menuItemId]
  );

  const onChangeValueHandler = useCallback(
    event => {
      const input = event.currentTarget;
      const currentValue = input.value;

      if (insertLocaleModeState.enabled) {
        const lang = input.dataset.lang;
        const newLocale = insertLocaleModeState.newLocale;
        newLocale.lang = lang;
        newLocale[input.name] = currentValue;

        setInsertLocaleModeState({
          ...insertLocaleModeState,
          newLocale,
        });
      } else {
        const selectedItem = editModeState.selectedItem;

        if (LocalizedFields.some(field => field === input.name)) {
          const lang = input.dataset.lang;
          selectedItem.value.locales[lang][input.name] = currentValue;
        } else {
          selectedItem.value[input.name] = currentValue;
        }

        setEditModeState({
          enabled: true,
          selectedItem: cloneDeep(selectedItem),
        });
      }
    },
    [editModeState.selectedItem, insertLocaleModeState]
  );

  const toggleAddLocalMode = useCallback(
    ({ menuItemId, cancel = false }) => {
      if (cancel) {
        setInsertLocaleModeState(defaultInserLocaleModeState);
      } else {
        setInsertLocaleModeState({
          enabled: true,
          menuItemId,
          newLocale: { ...emptyLocaleData },
        });
      }
    },
    [menu, insertLocaleModeState.menuItemId]
  );

  const toggleEditModeHandler = useCallback(
    ({ menuItemId, cancel = false }) => {
      if (cancel) {
        setEditModeState(defaultEditModeState);
      } else {
        setEditModeState({
          enabled: true,
          selectedItem: {
            id: menuItemId,
            value: cloneDeep(menu.items[menuItemId]),
          },
        });
      }
    },
    [menu, editModeState.selectedItem.id]
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
        open={confirmationDialogState.open}
        action={ConfirmationActions.DELETE_MENU_ITEM}
        data={
          confirmationDialogState.item &&
          confirmationDialogState.item.value.locales[defaultLanguage].name
        }
        handleClose={() =>
          setConfirmationDialogState(defaultConfirmationDialogState)
        }
        onConfirm={() => {
          deleteMenuItemHandler(confirmationDialogState.item.id);
          setConfirmationDialogState(defaultConfirmationDialogState);
        }}
      />
      <MenuItemActions
        id={menuItemActionsPopoverId}
        open={menuItemActionsPopoverOpen}
        anchorEl={menuItemActionsPopoverState.anchorEl}
        handleClose={handleMenuItemActionsClick}
      >
        <List>
          <ListItem
            onClick={() => {
              setMenuItemActionsPopoverState(
                defaultMenuItemActionsPopoverState
              );
              toggleEditModeHandler({
                menuItemId: menuItemActionsPopoverState.menuItemId,
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
              const menuItemId = menuItemActionsPopoverState.menuItemId;
              setMenuItemActionsPopoverState(
                defaultMenuItemActionsPopoverState
              );
              setConfirmationDialogState({
                open: true,
                item: {
                  id: menuItemId,
                  value: menu.items[menuItemId],
                },
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
          languageTabsPanelState.expanded &&
          languageTabsPanelState.menuItemId === key;
        const availableLanguages = getAvailableLanguage(
          Object.keys(data.locales)
        );
        return (
          <Grid item xs={12} key={key}>
            <Card width={1}>
              {editModeState.enabled &&
              editModeState.selectedItem.id === key ? (
                <div>
                  Edit mode
                  <div>
                    <div>
                      <select
                        name="category"
                        onChange={onChangeValueHandler}
                        type="text"
                        placeholder="Category"
                        value={editModeState.selectedItem.value.category}
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
                        value={editModeState.selectedItem.value.price}
                      />
                    </div>
                    {Object.keys(editModeState.selectedItem.value.locales)
                      .filter(lang => lang === defaultLanguage)
                      .map((lang, index) => {
                        const locale =
                          editModeState.selectedItem.value.locales[lang];
                        return (
                          <LocaleEditor
                            key={index}
                            lang={lang}
                            data={locale}
                            onChangeValue={onChangeValueHandler}
                          />
                        );
                      })}

                    <button onClick={() => updateMenuItemHandler()}>
                      Apply changes
                    </button>
                    <button
                      onClick={() => toggleEditModeHandler({ cancel: true })}
                    >
                      Cancel
                    </button>
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
                      menuItemId={key}
                      availableLanguages={availableLanguages}
                      toggleAddLocalMode={() =>
                        toggleAddLocalMode({ menuItemId: key })
                      }
                      onDeleteLocale={deleteLocaleHandler}
                      locales={data.locales}
                    >
                      {insertLocaleModeState.enabled &&
                      insertLocaleModeState.menuItemId === key ? (
                        <NewLocaleEditor
                          emptyLocaleData={insertLocaleModeState.newLocale}
                          toggleAddLocalMode={toggleAddLocalMode}
                          onChangeValue={onChangeValueHandler}
                          onCreateNewLocalInMenuItem={createNewLocaleCallback}
                          availableLanguages={availableLanguages}
                        />
                      ) : (
                        <></>
                      )}
                    </LanguageTabsPanel>
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
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, menuActions)(MenuEditor);
