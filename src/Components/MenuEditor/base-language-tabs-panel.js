import React, {
  useState,
  useCallback,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import constants from '../../Constants/index';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmationDialog from '../UserDashboard/confirmation-dialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import EditIcon from '@material-ui/icons/Edit';
import LocaleActions from '../UserDashboard/popover-actions';
import { connect } from 'react-redux';
import useStyles from './styles';
import * as uiActions from '../../Actions/ui-actions';
import { cloneDeep } from 'lodash';
import Button from '@material-ui/core/Button';
import useCommonStyles from '../Common/styles';
import { TabPanel } from '../Common';
import { ValidatorForm } from 'react-material-ui-form-validator';

import NewLocaleEditor from './new-locale';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
const { ConfirmationActions, Locale } = constants;

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = index => ({
  id: `language-tab-${index}`,
  'aria-controls': `language-tabpanel-${index}`,
});

const emptyLocaleData = {
  lang: '',
  name: '',
  description: '',
  ingredients: '',
};

const TabLocaleEditor = props => {
  const commonClasses = useCommonStyles();

  const { updateMenuItem, actionsLabels, disableEditMode, children } = props;
  return (
    <ValidatorForm
      onSubmit={updateMenuItem}
      onError={errors => console.log(errors)}
    >
      <Box pt={3}>
        {children}

        <Box className={commonClasses.buttonBar}>
          <Button variant="contained" onClick={disableEditMode}>
            {actionsLabels.CANCEL}
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {actionsLabels.APPLY_CHANGES}
          </Button>
        </Box>
      </Box>
    </ValidatorForm>
  );
};

const createChildrenWithProps = (children, props) =>
  Children.map(children, child => {
    if (isValidElement(child)) {
      return cloneElement(child, props);
    }

    return child;
  });

const LanguageTabsPanel = props => {
  const {
    menu,
    menuItemId,
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
    tabView,
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

  const locales = menu.items[menuItemId].locales;

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
    [ui.insertMode.data]
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
    [ui.actionsPopover.lang]
  );

  return (
    <div className={classes.root}>
      {ui.confirmationDialog.open && ui.confirmationDialog.childItem && (
        <ConfirmationDialog
          open={ui.confirmationDialog.open}
          action={ConfirmationActions.DELETE_LOCALE}
          handleClose={closeConfirmationDialog}
          onConfirm={() => {
            deleteLocale(
              ui.confirmationDialog.data.id,
              ui.confirmationDialog.data.value
            );
            closeConfirmationDialog();
            const left = Object.keys(menu.items[menuItemId].locales).length - 1;
            if (left > 1) setTabValue(0);
            else collapseLanguageTabsPanel();
          }}
          data={Languages[ui.confirmationDialog.data.value]}
        />
      )}
      <LocaleActions
        id={localeActionsPopoverId}
        open={localeActionsPopoverOpen}
        anchorEl={actionPopoverAnchorEl}
        handleClose={handleLocaleActionsClick}
      >
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
            openConfirmationDialog(
              {
                id: menuItemId,
                value: ui.actionsPopover.lang,
              },
              true
            );
          }}
          aria-label="delete"
          button
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary={ActionsLabels.DELETE} />
        </ListItem>
      </LocaleActions>
      <AppBar position="static">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="languages tab panel"
        >
          {Object.keys(locales)
            .filter(locale => locale !== defaultLanguage)
            .map((lang, index) => {
              return (
                <Tab
                  disabled={
                    index !== tabValue &&
                    (ui.editMode.enabled || ui.insertMode.enabled)
                  }
                  label={Languages[lang]}
                  key={index}
                  {...a11yProps(index)}
                />
              );
            })}
          >
          {!(
            availableLanguages.length === 0 ||
            ui.insertMode.enabled ||
            ui.editMode.enabled
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

      {ui.insertMode.enabled && ui.insertMode.data.id === menuItemId ? (
        <NewLocaleEditor
          data={ui.insertMode.data.value}
          onChangeValue={onChangeValueHandler}
          onCreateNewLocalInMenuItem={createNewLocale}
          availableLanguages={availableLanguages}
        >
          {createChildrenWithProps(children, {
            data: ui.insertMode.data.value,
          })}
        </NewLocaleEditor>
      ) : (
        Object.keys(locales)
          .filter(locale => locale !== defaultLanguage)
          .map((lang, index) => {
            const locale = locales[lang];
            const showEditForm =
              ui.editMode.enabled && ui.editMode.data.id === menuItemId;
            return (
              <TabPanel
                value={tabValue}
                key={index}
                index={index}
                ariaLabelledByPrefix="language-tab"
                idPrefix="language-tabpanel"
              >
                {showEditForm ? (
                  <TabLocaleEditor
                    disableEditMode={disableEditMode}
                    actionsLabels={ActionsLabels}
                    updateMenuItem={updateMenuItem}
                    onChangeValue={onChangeValueHandler}
                    lang={lang}
                    index={index}
                  >
                    {createChildrenWithProps(children, {
                      data: ui.editMode.data.value.locales[lang],
                      lang,
                    })}
                  </TabLocaleEditor>
                ) : (
                  createChildrenWithProps(tabView, {
                    localeActionsPopoverId,
                    handleLocaleActionsClick,
                    locale,
                    lang,
                  })
                )}
              </TabPanel>
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
