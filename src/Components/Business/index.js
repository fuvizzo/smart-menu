import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import HelpIcon from '@material-ui/icons/Help';

import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import { PopoverComponent as Popover } from '../Common';
import * as uiActions from '../../Actions/ui-actions';
import constants from '../../Constants/index';
import useCommonStyles from '../Common/styles';
import useDashboardStyles from '../Dashboard/styles';
import useStyles from './styles';
import createBusinessSchema from '../../Schemas/business';

const { Locales } = constants;

const ColorSelector = props => {
  const {
    value,
    onEditClickHandler,
    editModeEnabled = false,
    locale,
    label,
  } = props;
  const commonClasses = useCommonStyles();
  const {
    Labels: { Actions: ActionsLabels },
  } = locale;
  const classes = useStyles();
  return (
    <Box mb={2}>
      <Typography
        className={commonClasses.label}
        color="textSecondary"
        variant="h1"
      >
        {label}
      </Typography>
      <Box mt={0.5} className={classes.colorPicker}>
        <Box
          mt={2}
          style={{
            backgroundColor: value,
          }}
          className={classes.colorBox}
        />
        {editModeEnabled && (
          <Button
            color="secondary"
            onClick={onEditClickHandler}
            className={classes.colorPickerButton}
          >
            {ActionsLabels.EDIT}
          </Button>
        )}
      </Box>
    </Box>
  );
};

const Business = props => {
  const {
    ui,
    business,
    hideActionsPopover,
    showActionsPopover,
    enableEditMode,
    disableEditMode,
  } = props;
  const defaultLanguage = ui.settings.defaultLanguage;
  const locale = Locales[defaultLanguage];
  const {
    Labels: {
      Business: BusinessLabels,
      Actions: ActionsLabels,
      Warnings: WarningMessages,
      Hints: HintLabels,
      FormValidationErrors,
    },
  } = locale;

  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

  const popoverOpen = Boolean(popoverAnchorEl);
  const popoverId = popoverOpen ? 'business-actions-popover' : undefined;
  const onChangeValueHandler = () => {};

  const commonClasses = useCommonStyles();
  const dashboardClasses = useDashboardStyles();
  const classes = useStyles();

  const onEditClickHandler = useCallback(() => {
    hideActionsPopover();
    setPopoverAnchorEl(null);
    enableEditMode(business);
  }, [ui.editMode.data]);

  const onEditColorClickHandler = useCallback(() => {
    enableEditMode(business, true);
  }, [ui.editMode.data]);

  const popoverClickHandler = useCallback(
    (event, data) => {
      if (popoverOpen) {
        setPopoverAnchorEl(null);
        hideActionsPopover();
      } else {
        setPopoverAnchorEl(event.currentTarget);
        showActionsPopover(data);
      }
    },
    [popoverOpen]
  );

  const editModeEnabled = ui.editMode.enabled && !ui.editMode.chilItem;

  useEffect(() => {
    //disableEditMode();
  }, []);
  return (
    <>
      <Popover
        id={popoverId}
        open={popoverOpen && ui.actionsPopover.type === 'hint'}
        anchorEl={popoverAnchorEl}
        handleClose={popoverClickHandler}
        leftOrigin={true}
      >
        <Box className={commonClasses.popoverHint} p={2}>
          <Typography>{ui.actionsPopover.message}</Typography>
        </Box>
      </Popover>
      <Popover
        id={popoverId}
        open={popoverOpen && ui.actionsPopover.type === 'actions'}
        anchorEl={popoverAnchorEl}
        handleClose={popoverClickHandler}
      >
        <ListItem onClick={onEditClickHandler} aria-label="edit" button>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary={ActionsLabels.EDIT} />
        </ListItem>
      </Popover>
      <Box p={2}>
        {editModeEnabled ? (
          <>
            <Formik
              initialValues={ui.editMode.data}
              validationSchema={createBusinessSchema(FormValidationErrors)}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
              }}
            >
              {({ submitForm, isSubmitting, values }) => (
                <Form>
                  <Box mt={1} mb={3}>
                    <Field
                      component={TextField}
                      name="name"
                      type="text"
                      label={BusinessLabels.NAME}
                      value={values.name}
                    />
                  </Box>
                  <Box mb={3}>
                    <Field
                      component={TextField}
                      name="uniqueUrlPath"
                      type="text"
                      label={BusinessLabels.UNIQUE_URL_PATH}
                      value={values.uniqueUrlPath}
                    />
                  </Box>

                  <ColorSelector
                    label={BusinessLabels.Customization.PRIMARY_COLOR}
                    locale={locale}
                    value={values.colorPalette.primary}
                    editModeEnabled={true}
                    onEditClickHandler={onEditColorClickHandler}
                  />
                  <ColorSelector
                    label={BusinessLabels.Customization.SECONDARY_COLOR}
                    locale={locale}
                    value={values.colorPalette.secondary}
                    editModeEnabled={true}
                  />

                  {isSubmitting && <LinearProgress />}
                  <Box className={commonClasses.buttonBar}>
                    <Button variant="contained" onClick={disableEditMode}>
                      {ActionsLabels.CANCEL}
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                      {ActionsLabels.APPLY_CHANGES}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <>
            <Toolbar disableGutters="true" className={commonClasses.toolbar}>
              <Box className={commonClasses.header}>
                <Typography
                  className={commonClasses.label}
                  color="textSecondary"
                  variant="h1"
                >
                  {BusinessLabels.NAME}
                </Typography>
                <Typography>{business.name}</Typography>
              </Box>
              <IconButton
                edge="end"
                aria-describedby={popoverId}
                onClick={event =>
                  popoverClickHandler(event, { type: 'actions' })
                }
              >
                <MoreVertIcon />
              </IconButton>
            </Toolbar>
            <Box mb={2}>
              <Typography
                className={commonClasses.label}
                color="textSecondary"
                variant="h1"
              >
                {BusinessLabels.UNIQUE_URL_PATH}
                <IconButton
                  size="small"
                  edge="end"
                  onClick={event =>
                    popoverClickHandler(event, {
                      type: 'hint',
                      message: HintLabels.UNIQUE_URL_PATH,
                    })
                  }
                >
                  <HelpIcon aria-describedby={popoverId} />
                </IconButton>
              </Typography>
              <Typography>
                {business.uniqueUrlPath || WarningMessages.MISSING_FIELD}
              </Typography>
            </Box>
            <ColorSelector
              label={BusinessLabels.Customization.PRIMARY_COLOR}
              locale={locale}
              value={business.colorPalette.primary}
            />
            <ColorSelector
              label={BusinessLabels.Customization.SECONDARY_COLOR}
              locale={locale}
              value={business.colorPalette.secondary}
            />
            <Box mb={2}>
              <Typography
                className={commonClasses.label}
                color="textSecondary"
                variant="h1"
              >
                {BusinessLabels.LOGO}
                <IconButton
                  size="small"
                  edge="end"
                  onClick={event =>
                    popoverClickHandler(event, {
                      type: 'hint',
                      message: HintLabels.LOGO,
                    })
                  }
                >
                  <HelpIcon aria-describedby={popoverId} />
                </IconButton>
              </Typography>

              {business.logo ? (
                <img
                  className={classes.logo}
                  src={business.logo}
                  alt="business-logo"
                />
              ) : (
                <Typography> {WarningMessages.MISSING_FIELD} </Typography>
              )}
            </Box>
            <Box mb={2} p={0}>
              <Typography
                className={commonClasses.label}
                color="textSecondary"
                variant="h1"
              >
                {BusinessLabels.HEADER_BANNER}
                <IconButton
                  size="small"
                  edge="end"
                  onClick={event =>
                    popoverClickHandler(event, {
                      type: 'hint',
                      message: HintLabels.HEADER_BANNER,
                    })
                  }
                >
                  <HelpIcon aria-describedby={popoverId} />
                </IconButton>
              </Typography>

              {business.headerBanner ? (
                <img
                  className={classes.headerBanner}
                  src={business.headerBanner}
                  alt="business-header-banner"
                />
              ) : (
                <Typography> {WarningMessages.MISSING_FIELD} </Typography>
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

function mapStateToProps(state) {
  return {
    business: state.business,
    ui: state.ui,
  };
}

export default connect(mapStateToProps, uiActions)(Business);
