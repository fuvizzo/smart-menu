import React from 'react';
import { connect, useDispatch } from 'react-redux';
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

import ConfirmationDialog from './confirmationDialog';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  sortMenu,
  createNewMenuItem,
  deleteMenuItem,
  updateMenuItem,
  createNewLocale,
  deleteLocale,
} from '../../Actions/menuActions';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import constants from '../../Constants/index';
import { cloneDeep } from 'lodash';
import LocaleEditor from './localeEditor';
import NewLocaleEditor from './newLocale';
import useStyles from './styles';
import Avatar from '@material-ui/core/Avatar';

import MenuItemActions from './popoverActions';
const {
  LocalizedFields,
  SupportedLanguages,
  Locale,
  ConfirmationActions,
} = constants;

const emptyLocaleData = {
  lang: '',
  name: '',
  description: '',
  ingredients: '',
};

const getAvailableLanguage = usedLanguages => {
  return SupportedLanguages.filter(
    lang => !usedLanguages.some(l => l === lang)
  );
};

const MenuEditor = props => {
  const dispatch = useDispatch();
  const { menuId } = useParams();
  const classes = useStyles();
  const { sortMenu, defaultLanguage, menus } = props;
  const dishMap = Locale[defaultLanguage].DISH_TYPES;
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

  const defaultMenuItemActionsState = { anchorEl: null, menuItemId: null };

  const [confirmationDialogState, setConfirmationDialogState] = useState(
    defaultConfirmationDialogState
  );

  const [editModeState, setEditModeState] = useState(defaultEditModeState);
  const [insertLocaleModeState, setInsertLocaleModeState] = useState(
    defaultInserLocaleModeState
  );

  /*useEffect(() => {
    if (!editModeState.enabled) sortMenu(menu);
    console.log('reorder!');
  }, [menu.size, editModeState.enabled]); */

  const createNewMenuItemCallback = useCallback(data => {
    dispatch(
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
      })
    );
  }, []);

  const deleteMenuItemHandler = useCallback(menuItemId => {
    dispatch(deleteMenuItem(menuId, menuItemId));
  }, []);

  const updateMenuItemHandler = useCallback(() => {
    const menuItemId = editModeState.selectedItem.id;
    const body = editModeState.selectedItem.value;
    dispatch(updateMenuItem(menuId, menuItemId, body));
    setEditModeState({
      enabled: false,
      selectedItem: {},
    });
  }, [editModeState.selectedItem.value, editModeState.selectedItem.id]);

  const createNewLocaleCallback = useCallback(() => {
    const { menuItemId, newLocale } = insertLocaleModeState;
    dispatch(createNewLocale(menuId, menuItemId, newLocale));
    toggleAddLocalMode({ cancel: true });
  }, [insertLocaleModeState]);

  const deleteLocaleHandler = useCallback((menuItemId, lang) => {
    dispatch(deleteLocale(menuId, menuItemId, lang));
  }, []);

  const [
    menuItemActionsPopoverState,
    setMenuItemActionsPopoverState,
  ] = useState(defaultMenuItemActionsState);
  const menuItemActionsPopoverOpen = Boolean(
    menuItemActionsPopoverState.anchorEl
  );
  const menuItemActionsPopoverId = menuItemActionsPopoverOpen
    ? 'menu-item-actions-popover'
    : undefined;

  const handleMenuItemActionsClick = useCallback(
    (event, key) => {
      setMenuItemActionsPopoverState(
        !menuItemActionsPopoverOpen
          ? { anchorEl: event.target, menuItemId: key }
          : defaultMenuItemActionsState
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

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      {}
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
        onConfirm={() => deleteMenuItemHandler(confirmationDialogState.item.id)}
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
              setMenuItemActionsPopoverState(defaultMenuItemActionsState);
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
            <ListItemText primary="TRANSLATION NEEDED -> Edit" />
          </ListItem>
          <ListItem
            onClick={() => {
              const menuItemId = menuItemActionsPopoverState.menuItemId;
              setMenuItemActionsPopoverState(defaultMenuItemActionsState);
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
            <ListItemText primary="TRANSLATION NEEDED -> Delete" />
          </ListItem>
        </List>
      </MenuItemActions>
      {Object.keys(menu.items).map(key => {
        const data = menu.items[key];
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
                        {dishMap.map((dishType, index) => {
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
                    {Object.keys(editModeState.selectedItem.value.locales).map(
                      (lang, index) => {
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
                      }
                    )}

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
                        {dishMap[data.category].substr(0, 1)}
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
                        color="textSecondary"
                        component="p"
                      >
                        {data.locales[defaultLanguage].description}
                      </Typography>
                    )}
                    {data.locales[defaultLanguage].ingredients && (
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        TRANSLATION NEEDED -> Ingredients:{' '}
                        {data.locales[defaultLanguage].ingredients}
                      </Typography>
                    )}
                  </CardContent>
                  <div>
                    {Object.keys(data.locales)
                      .filter(locale => locale !== defaultLanguage)
                      .map((lang, index) => {
                        const locale = data.locales[lang];
                        return (
                          <div key={index}>
                            <div>
                              Menu in{' '}
                              <b>{Locale[defaultLanguage].Languages[lang]}</b>
                            </div>
                            <div> {locale.name}</div>
                            <div> {locale.description}</div>
                            <div> {locale.ingredients}</div>

                            <div>
                              <button
                                onClick={() => deleteLocaleHandler(key, lang)}
                              >
                                Delete description in{' '}
                                {Locale[defaultLanguage].Languages[lang]}
                              </button>
                            </div>
                          </div>
                        );
                      })}

                    {insertLocaleModeState.enabled &&
                    insertLocaleModeState.menuItemId === key ? (
                      <NewLocaleEditor
                        emptyLocaleData={insertLocaleModeState.newLocale}
                        toggleAddLocalMode={toggleAddLocalMode}
                        onChangeValue={onChangeValueHandler}
                        onCreateNewLocalInMenuItem={createNewLocaleCallback}
                        availableLanguages={getAvailableLanguage(
                          Object.keys(data.locales)
                        )}
                      />
                    ) : (
                      <>
                        {getAvailableLanguage(Object.keys(data.locales))
                          .length !== 0 && (
                          <button
                            onClick={() =>
                              toggleAddLocalMode({ menuItemId: key })
                            }
                          >
                            Add description, name and ingrendients in another
                            lang
                          </button>
                        )}
                      </>
                    )}
                  </div>
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
    defaultLanguage: state.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, {
  sortMenu,
  createNewMenuItem,
  deleteMenuItem,
  updateMenuItem,
  createNewLocale,
  deleteLocale,
})(MenuEditor);
