import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import constants from '../../Constants/index';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ConfirmationDialog from '../UserDashboard/confirmation-dialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import EditIcon from '@material-ui/icons/Edit';
import LocaleActions from '../UserDashboard/popover-actions';
import { connect } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import useStyles from './styles';
import * as uiActions from '../../Actions/ui-actions';
import LocaleEditor from './locale-editor';
import { cloneDeep } from 'lodash';
import Button from '@material-ui/core/Button';
import useCommonStyles from '../Common/styles';

import NewLocaleEditor from './new-locale';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
const { ConfirmationActions, Locale } = constants;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box pt={0} p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const emptyLocaleData = {
  lang: '',
  name: '',
  description: '',
  ingredients: '',
};

const TabLocaleEditor = props => {
  const commonClasses = useCommonStyles();

  const {
    onChangeValue,
    updateMenuItem,
    locale,
    lang,
    index,
    actionsLabels,
    disableEditMode,
  } = props;
  return (
    <Box pt={3}>
      <LocaleEditor
        key={index}
        lang={lang}
        data={locale}
        onChangeValue={onChangeValue}
      />
      <Box className={commonClasses.buttonBar}>
        <Button variant="contained" onClick={disableEditMode}>
          {actionsLabels.CANCEL}
        </Button>
        <Button variant="contained" color="primary" onClick={updateMenuItem}>
          {actionsLabels.APPLY_CHANGES}
        </Button>
      </Box>
    </Box>
  );
};

const LanguageTabsPanel = props => {
  const {
    menu,
    menuItemId,
    locales,
    ui,
    updateMenuItem,
    onChangeValueHandler,
    availableLanguages,
    showActionsPopover,
    hideActionsPopover,
    openConfirmationDialog,
    closeConfirmationDialog,
    enableEditMode,
    disableEditMode,
    enableInsertMode,
    disableInsertMode,
    deleteLocale,
    createNewLocale,
    collapseLanguageTabsPanel,
  } = props;
  const [actionPopoverAnchorEl, setActionPopoverAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const defaultLanguage = ui.settings.defaultLanguage;
  const localeActionsPopoverOpen = Boolean(actionPopoverAnchorEl);

  const localeActionsPopoverId = localeActionsPopoverOpen
    ? 'locale-actions-popover'
    : undefined;
  const classes = useStyles();
  const {
    Languages,
    Labels: { Actions: ActionsLabels },
  } = Locale[defaultLanguage];

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleAddLocalMode = useCallback(
    ({ cancel = false }) => {
      if (cancel) {
        disableInsertMode();
      } else {
        enableInsertMode(
          {
            id: menuItemId,
            value: { ...emptyLocaleData, lang: availableLanguages[0] },
          },
          true
        );
      }
    },
    [ui.insertModeState.data]
  );

  const handleLocaleActionsClick = useCallback(
    (event, lang) => {
      if (localeActionsPopoverOpen) {
        setActionPopoverAnchorEl(null);
        hideActionsPopover();
      } else {
        setActionPopoverAnchorEl(event.currentTarget);
        showActionsPopover({ lang, menuItemId });
      }
    },
    [ui.actionsPopoverState.lang]
  );

  return (
    <div className={classes.root}>
      <ConfirmationDialog
        open={ui.confirmationDialogState.open}
        action={ConfirmationActions.DELETE_LOCALE}
        handleClose={closeConfirmationDialog}
        onConfirm={() => {
          deleteLocale(
            ui.confirmationDialogState.data.id,
            ui.confirmationDialogState.data.value
          );
          closeConfirmationDialog();
          const left = Object.keys(menu.items[menuItemId].locales).length - 1;
          if (left > 1) setTabValue(0);
          else collapseLanguageTabsPanel();
        }}
        data={
          ui.confirmationDialogState.data &&
          Languages[ui.confirmationDialogState.data.value]
        }
      />
      <LocaleActions
        id={localeActionsPopoverId}
        open={localeActionsPopoverOpen}
        anchorEl={actionPopoverAnchorEl}
        handleClose={handleLocaleActionsClick}
      >
        <List>
          <ListItem
            onClick={() => {
              hideActionsPopover();
              setActionPopoverAnchorEl(null);
              enableEditMode(
                {
                  id: menuItemId,
                  value: cloneDeep(menu.items[menuItemId]),
                },
                true
              );
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
              hideActionsPopover();
              setActionPopoverAnchorEl(null);
              openConfirmationDialog({
                id: menuItemId,
                value: ui.actionsPopoverState.lang,
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
      </LocaleActions>
      <AppBar position="static">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Box>
            {Object.keys(locales)
              .filter(locale => locale !== defaultLanguage)
              .map((lang, index) => {
                return (
                  <Tab
                    disabled={
                      index !== tabValue &&
                      (ui.editModeState.enabled || ui.insertModeState.enabled)
                    }
                    label={Languages[lang]}
                    key={index}
                    {...a11yProps(index)}
                  />
                );
              })}
          </Box>
          >
          {!(
            availableLanguages.length === 0 ||
            ui.insertModeState.enabled ||
            ui.editModeState.enabled
          ) && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="add new locale"
              onClick={toggleAddLocalMode}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          )}
        </Tabs>
      </AppBar>

      {ui.insertModeState.enabled &&
      ui.insertModeState.data.id === menuItemId ? (
        <NewLocaleEditor
          newLocale={ui.insertModeState.data.value}
          onChangeValue={onChangeValueHandler}
          onCreateNewLocalInMenuItem={createNewLocale}
          availableLanguages={availableLanguages}
        />
      ) : (
        Object.keys(locales)
          .filter(locale => locale !== defaultLanguage)
          .map((lang, index) => {
            const locale = locales[lang];
            const showEditForm =
              ui.editModeState.enabled &&
              ui.editModeState.data.id === menuItemId;
            return (
              <>
                <TabPanel value={tabValue} key={index} index={index}>
                  {showEditForm ? (
                    <TabLocaleEditor
                      disableEditMode={disableEditMode}
                      actionsLabels={ActionsLabels}
                      updateMenuItem={updateMenuItem}
                      onChangeValue={onChangeValueHandler}
                      locale={ui.editModeState.data.value.locales[lang]}
                      lang={lang}
                      index={index}
                    />
                  ) : (
                    <>
                      <Toolbar className={classes.toolbar}>
                        <Typography className={classes.header} component="h3">
                          {locale.name}
                        </Typography>
                        <IconButton
                          edge="end"
                          aria-describedby={localeActionsPopoverId}
                          onClick={event =>
                            handleLocaleActionsClick(event, lang)
                          }
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Toolbar>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        {locale.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {locale.ingredients}
                      </Typography>
                    </>
                  )}
                </TabPanel>
              </>
            );
          })
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}

export default connect(mapStateToProps, uiActions)(LanguageTabsPanel);
