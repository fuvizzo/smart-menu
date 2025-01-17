import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  CardHeader,
  Select,
  IconButton,
  Button,
  Typography,
  ListItem,
  Box,
  InputLabel,
  CardContent,
  MenuItem,
  ListItemText,
  Card,
  CardActions,
  Grid,
  Avatar,
  Collapse,
  ListItemIcon,
} from '@material-ui/core/';

import {
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons/';

import clsx from 'clsx';
import ConfirmationDialog from '../../UserDashboard/confirmation-dialog';
import LocaleEditor from './locale-editor';
import LanguageTabsPanel from './language-tabs-panel';
import { PopoverComponent as MenuItemActionsPopover } from '../../Common';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { onChangeInputValueHandler } from '../handlers';
import constants from '../../../Constants/index';
import * as uiActions from '../../../Actions/ui-actions';
import * as menuActions from '../../../Actions/menu-actions';
import useDashboardStyles from '../../UserDashboard/styles';
import {
  Label,
  ShortFormFieldWrapper,
  ButtonBar,
  FormControl,
} from '../../Common/styles';
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
  const {
    menu,
    ui,
    sortMenu,
    deleteMenuItem,
    updateMenuItem,
    createNewMenuItemLocale,
    deleteMenuItemLocale,
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

  menu.items = menu.items || {};

  const defaultLanguage = ui.settings.defaultLanguage;
  const {
    RegexExpressions,
    Locales,
    MenuItemTypesColorMap,
    //ConfirmationActions,
    MenuTypes,
  } = constants;

  const MenuItemTypeCategory = MenuTypes[menu.info.type];

  const {
    Labels: {
      Actions: ActionsLabels,
      Menu: MenuLabels,
      Common: CommonLabels,
      Warnings: WarningMessages,
      Errors: { FormValidation: FormValidationErrors },
      Hints: HintLabels,
    },
    ConfirmationActions,
    MenuItemTypes: { [MenuItemTypeCategory]: MenuItemTypes },
  } = Locales[defaultLanguage];

  const languageTabsPanelClickHandler = (event, menuItemId) => {
    const expanded = ui.languageTabsPanel.expanded;
    disableInsertMode();
    if (expanded && ui.languageTabsPanel.itemId === menuItemId) {
      collapseLanguageTabsPanel();
    } else {
      expandLanguageTabsPanel(menuItemId);
    }
  };

  const deleteMenuItemHandler = useCallback(async menuItemId => {
    await deleteMenuItem(menuId, menuItemId);
    closeConfirmationDialog();
  }, []);

  const updateMenuItemHandler = useCallback(async () => {
    const menuItemId = ui.editMode.data.id;
    const body = ui.editMode.data.value;
    await updateMenuItem(menuId, menuItemId, body);
    disableEditMode();
  }, [ui.editMode.data.value, ui.editMode.data.id]);

  const createNewLocaleHandler = useCallback(async () => {
    const { id: menuItemId, value: newLocale } = ui.insertMode.data;
    await createNewMenuItemLocale(menuId, menuItemId, newLocale);
    disableInsertMode();
  }, [ui.insertMode.data]);

  const deleteLocaleHandler = useCallback(async (lang, menuItemId) => {
    return await deleteMenuItemLocale(menuId, menuItemId, lang);
  }, []);

  const menuItemActionsClickHandler = useCallback(
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
    [menuItemActionsPopoverOpen]
  );

  const onChangeValueHandler = useCallback(
    event => onChangeInputValueHandler(event, ui, editData, insertData),
    [ui.editMode.enabled, ui.insertMode.enabled]
  );

  useEffect(() => {
    if (!ui.editMode.enabled) sortMenu(menuId);
  }, [Object.entries(menu.items).length, ui.editMode.enabled]);

  useEffect(() => {
    disableEditMode();
    disableInsertMode();
  }, []);

  const menuItemKeys = Object.keys(menu.items);

  const ConfirmationModal = () => {
    const menuItemName =
      ui.confirmationDialog.data.value.locales[defaultLanguage].name;
    const action = ConfirmationActions.DELETE_MENU_ITEM;
    return (
      <ConfirmationDialog
        open={ui.confirmationDialog.open}
        title={action.getTitle(menuItemName)}
        content={action.getContent(menuItemName)}
        handleClose={closeConfirmationDialog}
        onConfirm={() => deleteMenuItemHandler(ui.confirmationDialog.data.id)}
      />
    );
  };

  return (
    <Grid
      container
      spacing={4}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      {ui.confirmationDialog.open && !ui.confirmationDialog.childItem && (
        <ConfirmationModal />
      )}
      <MenuItemActionsPopover
        id={menuItemActionsPopoverId}
        open={menuItemActionsPopoverOpen}
        anchorEl={actionPopoverAnchorEl}
        handleClose={menuItemActionsClickHandler}
      >
        <ListItem
          onClick={() => {
            const menuItemId = ui.actionsPopover.menuItemId;
            hideActionsPopover();
            setActionPopoverAnchorEl(null);
            enableEditMode({
              id: menuItemId,
              value: menu.items[menuItemId],
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
      </MenuItemActionsPopover>
      {menuItemKeys.length === 0 ? (
        <Grid item xs={12}>
          <Card width={1} elevation={2} className={menuClasses.emptyMenu}>
            <Box pt={2}>
              <Typography color="textPrimary" align="center">
                {MenuLabels.EMPTY_MENU}
              </Typography>

              <Typography color="textSecondary" align="center">
                {HintLabels.ADD_MENU_ITEM}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ) : (
        menuItemKeys.map(key => {
          const data = menu.items[key];
          const languageTabExpanded =
            ui.languageTabsPanel.expanded &&
            ui.languageTabsPanel.itemId === key;

          const showMenuItemEditForm =
            ui.editMode.enabled &&
            ui.editMode.data.id === key &&
            !ui.editMode.childItem;
          return (
            <Grid item xs={12} key={key}>
              <Card width={1} elevation={2}>
                {showMenuItemEditForm ? (
                  <ValidatorForm onSubmit={updateMenuItemHandler}>
                    <Box p={2}>
                      <FormControl>
                        <ShortFormFieldWrapper>
                          <InputLabel htmlFor="outlined-lang-selector">
                            {MenuLabels.CATEGORY}
                          </InputLabel>
                          <Select
                            label={MenuLabels.CATEGORY}
                            name="type"
                            onChange={event => {
                              event.currentTarget.name = event.target.name;
                              onChangeValueHandler(event);
                            }}
                            value={ui.editMode.data.value.type}
                          >
                            {MenuItemTypes.ITEM_LIST.map((itemType, index) => {
                              return (
                                <MenuItem key={index} value={index}>
                                  {itemType}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </ShortFormFieldWrapper>
                      </FormControl>
                      {!menu.info.setMenu && (
                        <FormControl>
                          <ShortFormFieldWrapper>
                            <TextValidator
                              label={MenuLabels.PRICE}
                              validators={[
                                'required',
                                `matchRegexp:${RegexExpressions.EURO}`,
                              ]}
                              errorMessages={[
                                FormValidationErrors.REQUIRED,
                                FormValidationErrors.CURRENCY,
                              ]}
                              name="price"
                              onChange={onChangeValueHandler}
                              value={ui.editMode.data.value.price}
                            />
                          </ShortFormFieldWrapper>
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
                      <ButtonBar>
                        <Button variant="contained" onClick={disableEditMode}>
                          {ActionsLabels.CANCEL}
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          {ActionsLabels.APPLY_CHANGES}
                        </Button>
                      </ButtonBar>
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
                            backgroundColor: MenuItemTypesColorMap[data.type],
                          }}
                        >
                          {MenuItemTypes.ITEM_LIST[data.type].substr(0, 1)}
                        </Avatar>
                      }
                      action={
                        <IconButton
                          aria-describedby={menuItemActionsPopoverId}
                          onClick={event =>
                            menuItemActionsClickHandler(event, key)
                          }
                        >
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={
                        <Typography
                          color={
                            data.locales[defaultLanguage].name
                              ? 'initial'
                              : 'secondary'
                          }
                        >
                          {data.locales[defaultLanguage].name ||
                            WarningMessages.MISSING_NAME}
                        </Typography>
                      }
                      subheader={!menu.info.setMenu && `${data.price}€`}
                    />
                    <CardContent className={menuClasses.cardContent}>
                      <Box>
                        <Label color="textSecondary" variant="h3">
                          {MenuLabels.DESCRIPTION}
                        </Label>
                      </Box>
                      <Box mt={0.5}>
                        <Typography>
                          {data.locales[defaultLanguage].description ||
                            WarningMessages.MISSING_FIELD}
                        </Typography>
                      </Box>
                      <Box mt={2}>
                        <Label color="textSecondary" variant="h3">
                          {MenuLabels.INGREDIENTS_LIST}
                        </Label>
                      </Box>
                      <Box mt={0.5}>
                        <Typography>
                          {data.locales[defaultLanguage].ingredients ||
                            WarningMessages.MISSING_FIELD}
                        </Typography>
                      </Box>
                      <CardActions disableSpacing>
                        <Button
                          color="secondary"
                          className={clsx(dashboardClasses.expand, {
                            [dashboardClasses.expandOpen]: languageTabExpanded,
                          })}
                          onClick={event =>
                            languageTabsPanelClickHandler(event, key)
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
                        id={key}
                        data={menu.items[key]}
                        createNewLocale={createNewLocaleHandler}
                        updateData={updateMenuItemHandler}
                        deleteLocale={deleteLocaleHandler}
                        onChangeValue={onChangeValueHandler}
                      />
                    </Collapse>
                  </>
                )}
              </Card>
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}

export default connect(mapStateToProps, { ...uiActions, ...menuActions })(
  MenuItemsEditor
);
