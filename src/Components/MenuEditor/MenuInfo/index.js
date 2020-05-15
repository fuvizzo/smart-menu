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
import { cloneDeep } from 'lodash';
import LocaleEditor from '../base-locale-editor';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import LanguageTabsPanel from './language-tabs-panel';
import MenuInfoActions from '../../UserDashboard/popover-actions';
import CardActions from '@material-ui/core/CardActions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { onChangeInputValueHandler } from '../handlers';
import constants from '../../../Constants/index';
import * as uiActions from '../../../Actions/ui-actions';
import * as menuActions from '../../../Actions/menu-actions';
import useDashboardStyles from '../../UserDashboard/styles';
import useCommonStyles from '../../Common/styles';
import useMenuStyles from '../styles';

const MenuInfoEditor = props => {
  const [actionPopoverAnchorEl, setActionPopoverAnchorEl] = useState(null);
  const menuInfoActionsPopoverOpen = Boolean(actionPopoverAnchorEl);
  const menuInfoActionsPopoverId = menuInfoActionsPopoverOpen
    ? 'menu-info-actions-popover'
    : undefined;

  const dashboardClasses = useDashboardStyles();
  const menuClasses = useMenuStyles();
  const commonClasses = useCommonStyles();
  const {
    menu,
    ui,
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

  const data = menu.info;
  const languageTabExpanded = ui.languageTabsPanel.expanded;

  const showMenuItemEditForm = ui.editMode.enabled && !ui.editMode.childItem;

  const handleExpandLanguageTabsPanelClick = (event, menuItemId) => {
    disableInsertMode();
    if (languageTabExpanded) {
      collapseLanguageTabsPanel();
    } else {
      expandLanguageTabsPanel();
    }
  };

  const handleMenuInfoActionsClick = useCallback(
    (event, key) => {
      if (menuInfoActionsPopoverOpen) {
        setActionPopoverAnchorEl(null);
        hideActionsPopover();
      } else {
        setActionPopoverAnchorEl(event.currentTarget);
        showActionsPopover();
      }
    },
    [menuInfoActionsPopoverOpen]
  );

  const onChangeValueHandler = useCallback(
    event => onChangeInputValueHandler(event, ui, editData, insertData),
    [ui.editMode.enabled, ui.insertMode.enabled]
  );

  return (
    <Grid
      container
      spacing={4}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      {/*  {ui.confirmationDialog.open && !ui.confirmationDialog.childItem && (
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
    )}*/}
      <MenuInfoActions
        id={menuInfoActionsPopoverId}
        open={menuInfoActionsPopoverOpen}
        anchorEl={actionPopoverAnchorEl}
        handleClose={handleMenuInfoActionsClick}
      >
        <List>
          <ListItem
            onClick={() => {
              hideActionsPopover();
              setActionPopoverAnchorEl(null);
              enableEditMode({
                value: cloneDeep(menu.info),
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
        </List>
      </MenuInfoActions>

      <Grid item xs={12}>
        <Card width={1} elevation={2}>
          {showMenuItemEditForm ? (
            <ValidatorForm
              /*  onSubmit={updateMenuInfoHandler} */
              onError={errors => console.log(errors)}
            >
              <Box p={2}>
                {Object.keys(ui.editMode.data.value.locales)
                  .filter(lang => lang === defaultLanguage)
                  .map((lang, index) => {
                    const locale = ui.editMode.data.value.locales[lang];
                    return (
                      <LocaleEditor
                        {...props}
                        key={index}
                        lang={lang}
                        data={locale}
                        onChangeValue={onChangeValueHandler}
                        labels={{
                          name: MenuLabels.MENU_NAME,
                          description: MenuLabels.DESCRIPTION,
                        }}
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
                /*  avatar={
                  <Avatar
                    aria-label="recipe"
                    style={{
                      backgroundColor: DishTypesColorMap[data.category],
                    }}
                  >
                    {DishTypes[data.category].substr(0, 1)}
                  </Avatar>
                } */
                action={
                  <IconButton
                    aria-describedby={menuInfoActionsPopoverId}
                    onClick={event => handleMenuInfoActionsClick(event)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
                title={data.locales[defaultLanguage].name}
              />
              <CardContent className={menuClasses.cardContent}>
                <Box>
                  <Typography
                    className={commonClasses.label}
                    color="textSecondary"
                    variant="h3"
                  >
                    {MenuLabels.TYPE}
                  </Typography>
                </Box>
                <Box mt={0.5}>
                  <Typography>
                    {menu.info.setMenu ? (
                      <div>
                        <span style={{ color: '#3f51b5' }}>
                          {MenuLabels.SET_MENU}:{' '}
                        </span>
                        <span>{menu.info.setMenu}</span>
                      </div>
                    ) : (
                      MenuLabels.MENU
                    )}
                  </Typography>
                </Box>
                <Box mt={2}>
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

                <CardActions disableSpacing>
                  <Button
                    className={clsx(dashboardClasses.expand, {
                      [dashboardClasses.expandOpen]: languageTabExpanded,
                    })}
                    onClick={event => handleExpandLanguageTabsPanelClick(event)}
                    aria-expanded={languageTabExpanded}
                    aria-label="show more"
                    endIcon={<ExpandMoreIcon />}
                  >
                    {!languageTabExpanded &&
                      CommonLabels.SHOW_OTHER_LANGUAGES.toUpperCase()}
                  </Button>
                </CardActions>
              </CardContent>
              <Collapse in={languageTabExpanded} timeout="auto" unmountOnExit>
                {/*  <LanguageTabsPanel
                  menu={menu}
                  createNewLocale={createNewLocaleCallback}
                  menuItemId={key}
                  availableLanguages={availableLanguages}
                  updateMenuItem={updateMenuItemHandler}
                  deleteLocale={deleteLocaleHandler}
                  onChangeValue={onChangeValueHandler}
                /> */}
              </Collapse>
            </>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}

export default connect(mapStateToProps, { ...uiActions, ...menuActions })(
  MenuInfoEditor
);
