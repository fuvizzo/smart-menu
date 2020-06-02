import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  CardHeader,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  Grid,
  Button,
  Box,
  FormControlLabel,
  Switch,
  CardContent,
  FormControl,
  Typography,
  Collapse,
  CardActions,
} from '@material-ui/core';

import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';

import clsx from 'clsx';

import LocaleEditor from '../base-locale-editor';
import LanguageTabsPanel from './language-tabs-panel';
import { PopoverComponent as MenuInfoActionsPopover } from '../../Common';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { onChangeInputValueHandler } from '../handlers';
import constants from '../../../Constants/index';
import * as uiActions from '../../../Actions/ui-actions';
import * as menuActions from '../../../Actions/menu-actions';
import useDashboardStyles from '../../UserDashboard/styles';
import { Label, ButtonBar } from '../../Common/styles';
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
  const {
    menu,
    ui,
    createNewLocaleMenuInfo,
    deleteMenuInfoLocale,
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
  const { Locales, RegexExpressions } = constants;

  const {
    Labels: {
      Actions: ActionsLabels,
      Menu: MenuLabels,
      Common: CommonLabels,
      Warnings: WarningMessages,
      Errors: { FormValidation: FormValidationErrors },
    },
  } = Locales[defaultLanguage];

  const data = menu.info;
  const languageTabExpanded = ui.languageTabsPanel.expanded;

  const showMenuItemEditForm = ui.editMode.enabled && !ui.editMode.childItem;

  const createNewLocaleHandler = useCallback(async () => {
    const { value: newLocale } = ui.insertMode.data;
    await createNewLocaleMenuInfo(menuId, newLocale);
    disableInsertMode();
  }, [ui.insertMode.data]);

  const deleteLocaleHandler = useCallback(async lang => {
    await deleteMenuInfoLocale(menuId, lang);
  }, []);

  const languageTabsPanelClickHandler = () => {
    disableInsertMode();
    if (languageTabExpanded) {
      collapseLanguageTabsPanel();
    } else {
      expandLanguageTabsPanel();
    }
  };

  const updateMenuInfoHandler = useCallback(async () => {
    const body = ui.editMode.data.value;
    await updateMenuInfo(menuId, body);
    disableEditMode();
  }, [ui.editMode.data.value, ui.editMode.data.id]);

  const toggleSetMenuOptionHandler = useCallback(
    value => {
      const data = ui.editMode.data;
      data.setMenuEnabled = value;
      if (!value) data.value.setMenu = null;
      editData(data);
    },
    [ui.editMode.data.setMenuEnabled]
  );

  const menuInfoActionsClickHandler = useCallback(
    event => {
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
    [
      ui.editMode.enabled,
      ui.editMode.data.setMenuEnabled,
      ui.insertMode.enabled,
    ]
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
      <MenuInfoActionsPopover
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
              value: menu.info,
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
      </MenuInfoActionsPopover>

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
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={ui.editMode.data.setMenuEnabled}
                        onChange={() =>
                          toggleSetMenuOptionHandler(
                            !ui.editMode.data.setMenuEnabled
                          )
                        }
                        name="setMenuEnabled"
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2" color="textSecondary">
                        {MenuLabels.SET_MENU}
                      </Typography>
                    }
                  />
                </Box>
                {ui.editMode.data.setMenuEnabled && (
                  <FormControl>
                    <TextValidator
                      className={menuClasses.priceField}
                      label={MenuLabels.PRICE}
                      validators={[
                        'required',
                        `matchRegexp:${RegexExpressions.EURO}`,
                      ]}
                      errorMessages={[
                        FormValidationErrors.REQUIRED,
                        FormValidationErrors.CURRENCY,
                      ]}
                      name="setMenu"
                      onChange={onChangeValueHandler}
                      value={ui.editMode.data.value.setMenu}
                    />
                  </FormControl>
                )}
                <ButtonBar>
                  <Button variant="contained" onClick={disableEditMode}>
                    {ActionsLabels.CANCEL}
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    {ActionsLabels.APPLY_CHANGES}
                  </Button>
                </ButtonBar>
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
                title={
                  <>
                    <Box>
                      <Label color="textSecondary" variant="h3">
                        {MenuLabels.MENU_NAME}
                      </Label>
                    </Box>
                    <Box mt={0.5}>
                      <Typography
                        color={
                          data.locales[defaultLanguage].name ===
                          WarningMessages.MISSING_NAME
                            ? 'secondary'
                            : 'initial'
                        }
                      >
                        {data.locales[defaultLanguage].name}
                      </Typography>
                    </Box>
                  </>
                }
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
                    {MenuLabels.TYPE}
                  </Label>
                </Box>
                <Box mt={0.5}>
                  <Typography>
                    {menu.info.setMenu ? (
                      <div>
                        <span style={{ color: '#3f51b5' }}>
                          {MenuLabels.SET_MENU}:{' '}
                        </span>
                        <span>{menu.info.setMenu}€</span>
                      </div>
                    ) : (
                      MenuLabels.MENU
                    )}
                  </Typography>
                </Box>
                <CardActions disableSpacing>
                  <Button
                    color="secondary"
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
                  deleteLocale={deleteLocaleHandler}
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
