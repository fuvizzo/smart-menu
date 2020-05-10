import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Card, CardHeader, CardContent } from '@material-ui/core';
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

const LanguageTabsPanel = props => {
  const {
    menu,
    menuItemId,
    locales,
    ui,
    availableLanguages,
    showActionsPopover,
    hideActionsPopover,
    openConfirmationDialog,
    closeConfirmationDialog,
    enableEditMode,
    enableInsertMode,
    disableInsertMode,
    onDeleteLocale,
    children,
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
        enableInsertMode({
          menuItemId,
          newLocale: { ...emptyLocaleData },
        });
      }
    },
    [ui.insertModeState.data]
  );

  const TabLocaleEditor = props => {
    const {
      onChangeValueHandler,
      updateMenuItemHandler,
      index,
      lang,
      locale,
    } = props;
    return (
      <>
        <LocaleEditor
          key={index}
          lang={lang}
          data={locale}
          onChangeValue={onChangeValueHandler}
        />
        );
        <button onClick={updateMenuItemHandler}>Apply changes</button>
      </>
    );
  };

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
          onDeleteLocale(
            ui.confirmationDialogState.data.id,
            ui.confirmationDialogState.data.value
          );
          closeConfirmationDialog();
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
          {Object.keys(locales)
            .filter(locale => locale !== defaultLanguage)
            .map((lang, index) => {
              return (
                <Tab
                  label={Languages[lang]}
                  key={index}
                  {...a11yProps(index)}
                />
              );
            })}
          >
          {availableLanguages.length !== 0 && !ui.insertModeState.enabled && (
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
      ui.insertModeState.data.menuItemId === menuItemId
        ? children
        : Object.keys(locales)
            .filter(locale => locale !== defaultLanguage)
            .map((lang, index) => {
              const locale = locales[lang];
              const showEditForm =
                ui.editModeState.enabled &&
                ui.editModeState.data.menuItemId === menuItemId;
              return (
                <>
                  {showEditForm ? (
                    <TabLocaleEditor />
                  ) : (
                    <TabPanel value={tabValue} key={index} index={index}>
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
                    </TabPanel>
                  )}
                </>
              );
            })}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}

export default connect(mapStateToProps, uiActions)(LanguageTabsPanel);
