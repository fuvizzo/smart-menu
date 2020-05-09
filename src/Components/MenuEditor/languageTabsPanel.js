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
import ConfirmationDialog from '../UserDashboard/confirmationDialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import EditIcon from '@material-ui/icons/Edit';
import LocaleActions from '../UserDashboard/popoverActions';
import { connect } from 'react-redux';
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
      {value === index && <Box p={3}>{children}</Box>}
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const LanguageTabsPanel = props => {
  const {
    menuItemId,
    locales,
    defaultLanguage,
    availableLanguages,
    toggleAddLocalMode,
    onDeleteLocale,
    children,
  } = props;

  const defaultLocaleActionsPopoverState = {
    anchorEl: null,
    menuItemId: null,
    lang: null,
  };
  const [localeActionsPopoverState, setLocaleActionsPopoverState] = useState(
    defaultLocaleActionsPopoverState
  );

  const localeActionsPopoverOpen = Boolean(localeActionsPopoverState.anchorEl);

  const localeActionsPopoverId = localeActionsPopoverOpen
    ? 'locale-actions-popover'
    : undefined;
  const classes = useStyles();

  const defaultConfirmationDialogState = {
    open: false,
    item: null,
  };

  const [confirmationDialogState, setConfirmationDialogState] = useState(
    defaultConfirmationDialogState
  );

  const [tabValue, setTabValue] = useState(0);

  const {
    Languages,
    Labels: { Actions: ActionsLabels },
  } = Locale[defaultLanguage];
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLocaleActionsClick = useCallback(
    (event, lang) => {
      setLocaleActionsPopoverState(
        !localeActionsPopoverOpen
          ? { anchorEl: event.target, lang, menuItemId }
          : defaultLocaleActionsPopoverState
      );
    },
    [localeActionsPopoverState.lang]
  );

  return (
    <div className={classes.root}>
      <ConfirmationDialog
        open={confirmationDialogState.open}
        action={ConfirmationActions.DELETE_LOCALE}
        handleClose={() =>
          setConfirmationDialogState(defaultConfirmationDialogState)
        }
        onConfirm={() => {
          onDeleteLocale(
            confirmationDialogState.item.id,
            confirmationDialogState.item.value
          );
          setConfirmationDialogState(defaultConfirmationDialogState);
        }}
        data={
          confirmationDialogState.item &&
          Languages[confirmationDialogState.item.value]
        }
      />
      <LocaleActions
        id={localeActionsPopoverId}
        open={localeActionsPopoverOpen}
        anchorEl={localeActionsPopoverState.anchorEl}
        handleClose={handleLocaleActionsClick}
      >
        <List>
          <ListItem
            onClick={() => {
              setLocaleActionsPopoverState(defaultLocaleActionsPopoverState);
              //toggleEditLocalMode();
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
              setLocaleActionsPopoverState(defaultLocaleActionsPopoverState);
              setConfirmationDialogState({
                open: true,
                item: {
                  id: menuItemId,
                  value: localeActionsPopoverState.lang,
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
          {availableLanguages.length !== 0 && (
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
      {Object.keys(locales)
        .filter(locale => locale !== defaultLanguage)
        .map((lang, index) => {
          const locale = locales[lang];
          return (
            <TabPanel value={tabValue} key={index} index={index}>
              <Typography
                component="h3"
                action={
                  <IconButton
                    aria-describedby={localeActionsPopoverId}
                    onClick={event => handleLocaleActionsClick(event, lang)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                {locale.name}
              </Typography>

              <Typography variant="body2" color="textPrimary" component="p">
                {locale.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {locale.ingredients}
              </Typography>
            </TabPanel>
          );
        })}
      {children}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps)(LanguageTabsPanel);
