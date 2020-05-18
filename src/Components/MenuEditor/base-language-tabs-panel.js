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
import EditIcon from '@material-ui/icons/Edit';
import LocaleActions from '../UserDashboard/popover-actions';
import { connect } from 'react-redux';
import useStyles from './styles';
import * as uiActions from '../../Actions/ui-actions';
import Button from '@material-ui/core/Button';
import useCommonStyles from '../Common/styles';
import { TabPanel } from '../Common';
import { ValidatorForm } from 'react-material-ui-form-validator';

import NewLocaleEditor from './new-locale';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
const { ConfirmationActions, Locales, SupportedLanguages } = constants;

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = index => ({
  id: `language-tab-${index}`,
  'aria-controls': `language-tabpanel-${index}`,
});

const TabLocaleEditor = props => {
  const commonClasses = useCommonStyles();

  const { updateData, actionsLabels, disableEditMode, children } = props;
  return (
    <ValidatorForm
      onSubmit={updateData}
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
    data,
    id,
    ui,
    updateData,
    onChangeValue,
    emptyLocaleData,
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
  } = Locales[defaultLanguage];

  const locales = data.locales;

  const availableLanguages = SupportedLanguages.filter(
    lang => !Object.keys(locales).some(l => l === lang)
  );

  const showEditForm = ui.editMode.enabled && ui.editMode.data.id === id;

  const showInsertForm = ui.insertMode.enabled && ui.insertMode.data.id === id;

  const onEditClickHandler = useCallback(() => {
    hideActionsPopover();
    setActionPopoverAnchorEl(null);
    enableEditMode(
      {
        id,
        value: data,
      },
      true
    );
  }, [ui.editMode.data]);

  const onDeleteClickHandler = useCallback(() => {
    hideActionsPopover();
    setActionPopoverAnchorEl(null);
    openConfirmationDialog(
      {
        id,
        value: ui.actionsPopover.lang,
      },
      true
    );
  }, [ui.actionsPopover.lang]);

  const handleLocaleActionsClick = useCallback(
    (event, lang) => {
      if (localeActionsPopoverOpen) {
        setActionPopoverAnchorEl(null);
        hideActionsPopover();
      } else {
        setActionPopoverAnchorEl(event.currentTarget);
        showActionsPopover({ lang, id });
      }
    },
    [ui.actionsPopover.lang]
  );

  const toggleAddLocalMode = useCallback(
    ({ cancel = false }) => {
      if (cancel) {
        disableInsertMode();
      } else {
        enableInsertMode(
          {
            id,
            value: { ...emptyLocaleData, lang: availableLanguages[0] },
          },
          true
        );
      }
    },
    [ui.insertMode.data]
  );

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.root}>
      {ui.confirmationDialog.open && ui.confirmationDialog.childItem && (
        <ConfirmationDialog
          open={ui.confirmationDialog.open}
          action={ConfirmationActions.DELETE_MENU_ITEM_LOCALE}
          handleClose={closeConfirmationDialog}
          onConfirm={() => {
            deleteLocale(
              ui.confirmationDialog.data.value,
              ui.confirmationDialog.data.id
            );
            closeConfirmationDialog();
            const left = Object.keys(locales).length - 1;
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
        <ListItem onClick={onEditClickHandler} aria-label="edit" button>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary={ActionsLabels.EDIT} />
        </ListItem>
        <ListItem onClick={onDeleteClickHandler} aria-label="delete" button>
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

      {showInsertForm ? (
        <NewLocaleEditor
          data={ui.insertMode.data.value}
          onChangeValue={onChangeValue}
          onCreateNewMenuItemLocale={createNewLocale}
          availableLanguages={availableLanguages}
        >
          {children}
        </NewLocaleEditor>
      ) : (
        Object.keys(locales)
          .filter(locale => locale !== defaultLanguage)
          .map((lang, index) => {
            const locale = locales[lang];

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
                    updateData={updateData}
                    onChangeValue={onChangeValue}
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
