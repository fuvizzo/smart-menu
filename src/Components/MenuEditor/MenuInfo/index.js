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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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
  const { menuId } = useParams();
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
    createNewLocaleMenuInfo,
    deleteLocale,
    showActionsPopover,
    hideActionsPopover,
    updateMenuInfo,
    editData,
    enableEditMode,
    disableEditMode,
    insertData,
    disableInsertMode,
    expandLanguageTabsPanel,
    collapseLanguageTabsPanel,
  } = props;

  const defaultLanguage = ui.settings.defaultLanguage;
  const { LocalizedFields, SupportedLanguages, Locale } = constants;

  const {
    Labels: {
      Actions: ActionsLabels,
      Menu: MenuLabels,
      Common: CommonLabels,
      Warnings: WarningMessages,
      FormValidationErrors: FormValidationErrorsLabels,
    },
  } = Locale[defaultLanguage];

  const data = menu.info;
  const languageTabExpanded = ui.languageTabsPanel.expanded;

  const showMenuItemEditForm = ui.editMode.enabled && !ui.editMode.childItem;

  const createNewLocaleHandler = useCallback(async () => {
    const { id: menuItemId, value: newLocale } = ui.insertMode.data;
    await createNewLocaleMenuInfo(menuId, menuItemId, newLocale);
    disableInsertMode();
  }, [ui.insertMode.data]);

  const languageTabsPanelClickHandler = (event, menuItemId) => {
    disableInsertMode();
    if (languageTabExpanded) {
      collapseLanguageTabsPanel();
    } else {
      expandLanguageTabsPanel();
    }
  };

  const updateMenuInfoHandler = useCallback(async () => {
    const menuItemId = ui.editMode.data.id;
    const body = ui.editMode.data.value;
    await updateMenuInfo(menuId, menuItemId, body);
    disableEditMode();
  }, [ui.editMode.data.value, ui.editMode.data.id]);

  const toggleSetMenuOptionHandler = useCallback(
    value => {
      const data = cloneDeep(ui.editMode.data);
      data.setMenuEnabled = value;
      if (!value) data.value.setMenu = null;
      editData(data);
    },
    [ui.editMode.data.setMenuEnabled]
  );

  const menuInfoActionsClickHandler = useCallback(
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

  useEffect(() => {
    disableEditMode();
    disableInsertMode();
  }, []);

  return (
    <Grid
      container
      spacing={4}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <MenuInfoActions
        id={menuInfoActionsPopoverId}
        open={menuInfoActionsPopoverOpen}
        anchorEl={actionPopoverAnchorEl}
        handleClose={menuInfoActionsClickHandler}
      >
        <ListItem
          onClick={() => {
            hideActionsPopover();
            setActionPopoverAnchorEl(null);
            enableEditMode({
              value: cloneDeep(menu.info),
              setMenuEnabled: !!menu.info.setMenu,
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
      </MenuInfoActions>

      <Grid item xs={12}>
        <Card width={1} elevation={2}>
          {showMenuItemEditForm ? (
            <ValidatorForm
              onSubmit={updateMenuInfoHandler}
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

                <FormControlLabel
                  control={
                    <Switch
                      checked={ui.editMode.data.setMenuEnabled}
                      onChange={() =>
                        toggleSetMenuOptionHandler(
                          !ui.editMode.data.setMenuEnabled
                        )
                      }
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2" color="textSecondary">
                      {menu.published ? MenuLabels.NORMAL : MenuLabels.SET_MENU}
                    </Typography>
                  }
                />
                {ui.editMode.data.setMenuEnabled && (
                  <FormControl className={commonClasses.formControl}>
                    <TextValidator
                      className={clsx(
                        commonClasses.textField,
                        menuClasses.priceField
                      )}
                      label={MenuLabels.PRICE}
                      validators={['required']}
                      errorMessages={FormValidationErrorsLabels.REQUIRED}
                      name="setMenu"
                      onChange={onChangeValueHandler}
                      value={ui.editMode.data.value.setMenu}
                    />
                  </FormControl>
                )}
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
                action={
                  <IconButton
                    aria-describedby={menuInfoActionsPopoverId}
                    onClick={event => menuInfoActionsClickHandler(event)}
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
                    onClick={event => languageTabsPanelClickHandler(event)}
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
                <LanguageTabsPanel
                  data={menu.info}
                  createNewLocale={createNewLocaleHandler}
                  updateData={updateMenuInfoHandler}
                  /*  deleteLocale={deleteLocaleHandler} */
                  onChangeValue={onChangeValueHandler}
                />
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
