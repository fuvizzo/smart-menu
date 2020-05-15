import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import ConfirmationDialog from '../../UserDashboard/confirmation-dialog';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import constants from '../../../Constants/index';
import { cloneDeep } from 'lodash';
import LocaleEditor from './locale-editor';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import LanguageTabsPanel from './language-tabs-panel';
import MenuItemActions from '../../UserDashboard/popover-actions';
import CardActions from '@material-ui/core/CardActions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import * as uiActions from '../../../Actions/ui-actions';
import * as menuActions from '../../../Actions/menu-actions';
import useDashboardStyles from '../../UserDashboard/styles';
import useCommonStyles from '../../Common/styles';
import useMenuStyles from '../styles';

const MenuItemsEditor = props => {
  const { menuId } = useParams();
  const [actionPopoverAnchorEl, setActionPopoverAnchorEl] = useState(null);
  const menuItemActionsPopoverOpen = Boolean(actionPopoverAnchorEl);
  const menuItemActionsPopoverId = menuItemActionsPopoverOpen
    ? 'menu-item-actions-popover'
    : undefined;

  const dashboardClasses = useDashboardStyles();
  const menuClasses = useMenuStyles();
  const commonClasses = useCommonStyles();
  const {
    menu,
    ui,
    sortMenu,
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
    disableInsertMode,
    expandLanguageTabsPanel,
    collapseLanguageTabsPanel,
  } = props;

  const defaultLanguage = ui.settings.defaultLanguage;
  const {
    LocalizedFields,
    SupportedLanguages,
    Locale,
    DishTypesColorMap,
    ConfirmationActions,
  } = constants;

  const {
    Labels: {
      Actions: ActionsLabels,
      Menu: MenuLabels,
      Common: CommonLabels,
      Warnings: WarningMessages,
      FormValidationErrors: FormValidationErrorsLabels,
    },
    DISH_TYPES: DishTypes,
  } = Locale[defaultLanguage];

  const handleExpandLanguageTabsPanelClick = (event, menuItemId) => {
    const expanded = ui.languageTabsPanel.expanded;
    disableInsertMode();
    if (!expanded || ui.languageTabsPanel.itemId !== menuItemId) {
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

  const deleteMenuItemHandler = useCallback(async menuItemId => {
    await deleteMenuItem(menuId, menuItemId);
  }, []);

  const updateMenuItemHandler = useCallback(async () => {
    const menuItemId = ui.editMode.data.id;
    const body = ui.editMode.data.value;
    await updateMenuItem(menuId, menuItemId, body);
    disableEditMode();
  }, [ui.editMode.data.value, ui.editMode.data.id]);

  const createNewLocaleCallback = useCallback(async () => {
    const { id: menuItemId, value: newLocale } = ui.insertMode.data;
    await createNewLocale(menuId, menuItemId, newLocale);
    disableInsertMode();
  }, [ui.insertMode.data]);

  const deleteLocaleHandler = useCallback(async (menuItemId, lang) => {
    await deleteLocale(menuId, menuItemId, lang);
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
    [ui.actionsPopover.menuItemId]
  );

  const onChangeValueHandler = useCallback(
    event => {
      const input = event.currentTarget;
      const currentValue =
        input.type !== '' ? input.value : input.dataset.value;

      if (ui.insertMode.enabled) {
        const lang = input.dataset.lang;
        const data = cloneDeep(ui.insertMode.data);

        data.value.lang = lang;
        data.value[input.name] = currentValue;
        insertData(data);
      } else {
        const data = cloneDeep(ui.editMode.data);

        if (LocalizedFields.some(field => field === input.name)) {
          const lang = input.dataset.lang;
          data.value.locales[lang][input.name] = currentValue;
        } else {
          data.value[input.name] = currentValue;
        }
        editData(data);
      }
    },
    [ui.editMode.data, ui.insertMode.data]
  );

  useEffect(() => {
    if (!ui.editMode.enabled) sortMenu(menuId);
  }, [Object.entries(menu.items).length, ui.editMode.enabled]);

  useEffect(() => {
    disableEditMode();
    disableInsertMode();
    collapseLanguageTabsPanel();
  }, []);

  return (
    <Grid
      container
      spacing={4}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      {ui.confirmationDialog.open && !ui.confirmationDialog.childItem && (
        <ConfirmationDialog
          open={ui.confirmationDialog.open}
          action={ConfirmationActions.DELETE_MENU_ITEM}
          data={ui.confirmationDialog.data.value.locales[defaultLanguage].name}
          handleClose={() => closeConfirmationDialog()}
          onConfirm={() => {
            deleteMenuItemHandler(ui.confirmationDialog.data.id);
            closeConfirmationDialog();
          }}
        />
      )}
      <MenuItemActions
        id={menuItemActionsPopoverId}
        open={menuItemActionsPopoverOpen}
        anchorEl={actionPopoverAnchorEl}
        handleClose={handleMenuItemActionsClick}
      >
        <List>
          <ListItem
            onClick={() => {
              const menuItemId = ui.actionsPopover.menuItemId;
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
              const menuItemId = ui.actionsPopover.menuItemId;
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
          ui.languageTabsPanel.expanded && ui.languageTabsPanel.itemId === key;
        const availableLanguages = getAvailableLanguage(
          Object.keys(data.locales)
        );
        const showMenuItemEditForm =
          ui.editMode.enabled &&
          ui.editMode.data.id === key &&
          !ui.editMode.childItem;
        return (
          <Grid item xs={12} key={key}>
            <Card width={1} elevation={2}>
              {showMenuItemEditForm ? (
                <ValidatorForm
                  onSubmit={updateMenuItemHandler}
                  onError={errors => console.log(errors)}
                >
                  <Box p={2}>
                    <FormControl className={commonClasses.formControl}>
                      <TextField
                        select
                        className={commonClasses.selectField}
                        label={MenuLabels.CATEGORY}
                        name="category"
                        onChange={event => {
                          event.currentTarget.name = event.target.name;
                          onChangeValueHandler(event);
                        }}
                        value={ui.editMode.data.value.category}
                      >
                        {DishTypes.map((dishType, index) => {
                          return (
                            <MenuItem key={index} value={index}>
                              {dishType}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </FormControl>
                    {!menu.info.setMenu && (
                      <FormControl className={commonClasses.formControl}>
                        <TextValidator
                          className={clsx(
                            commonClasses.textField,
                            menuClasses.priceField
                          )}
                          label={MenuLabels.PRICE}
                          validators={['required']}
                          errorMessages={FormValidationErrorsLabels.REQUIRED}
                          name="price"
                          onChange={onChangeValueHandler}
                          value={ui.editMode.data.value.price}
                        />
                      </FormControl>
                    )}
                    {Object.keys(ui.editMode.data.value.locales)
                      .filter(lang => lang === defaultLanguage)
                      .map((lang, index) => {
                        const locale = ui.editMode.data.value.locales[lang];
                        return (
                          <LocaleEditor
                            key={index}
                            lang={lang}
                            data={locale}
                            onChangeValue={onChangeValueHandler}
                          />
                        );
                      })}
                    <Box className={commonClasses.buttonBar}>
                      <Button variant="contained" onClick={disableEditMode}>
                        {ActionsLabels.CANCEL}
                      </Button>
                      <Button variant="contained" color="primary" type="submit">
                        {ActionsLabels.APPLY_CHANGES}
                      </Button>
                    </Box>
                  </Box>
                </ValidatorForm>
              ) : (
                <>
                  <CardHeader
                    className={dashboardClasses.header}
                    avatar={
                      <Avatar
                        aria-label="recipe"
                        style={{
                          backgroundColor: DishTypesColorMap[data.category],
                        }}
                      >
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
                    subheader={!menu.info.setMenu && data.price}
                  />
                  <CardContent>
                    <Box>
                      <Typography
                        className={commonClasses.label}
                        color="textSecondary"
                        variant="h3"
                      >
                        {MenuLabels.DESCRIPTION}
                      </Typography>
                    </Box>
                    <Box mt={0.5}>
                      <Typography>
                        {data.locales[defaultLanguage].description ||
                          WarningMessages.MISSING_FIELD}
                      </Typography>
                    </Box>
                    <Box mt={2}>
                      <Typography
                        className={commonClasses.label}
                        color="textSecondary"
                        variant="h3"
                      >
                        {MenuLabels.INGREDIENTS_LIST}
                      </Typography>
                    </Box>
                    <Box mt={0.5}>
                      <Typography>
                        {data.locales[defaultLanguage].ingredients ||
                          WarningMessages.MISSING_FIELD}
                      </Typography>
                    </Box>
                    <CardActions disableSpacing>
                      <Button
                        className={clsx(dashboardClasses.expand, {
                          [dashboardClasses.expandOpen]: languageTabExpanded,
                        })}
                        onClick={event =>
                          handleExpandLanguageTabsPanelClick(event, key)
                        }
                        aria-expanded={languageTabExpanded}
                        aria-label="show more"
                        endIcon={<ExpandMoreIcon />}
                      >
                        {!languageTabExpanded &&
                          CommonLabels.SHOW_OTHER_LANGUAGES.toUpperCase()}
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
                      onChangeValue={onChangeValueHandler}
                    />
                  </Collapse>
                </>
              )}
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

function mapStateToProps(state) {
  return {
    //menus: state.menus,
    ui: state.ui,
  };
}

export default connect(mapStateToProps, { ...uiActions, ...menuActions })(
  MenuItemsEditor
);