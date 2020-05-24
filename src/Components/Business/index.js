import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  LinearProgress,
  IconButton,
  ListItem,
  FormHelperText,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Toolbar,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';

import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { ColorBox, ColorEditor } from './color-palette';
import { PopoverComponent as Popover } from '../Common';
import * as uiActions from '../../Actions/ui-actions';
import * as businessActions from '../../Actions/business-actions';
import constants from '../../Constants/index';
import {
  PopoverHint,
  Header,
  ButtonBar,
  Label,
  HelpIcon,
} from '../Common/styles';
import useStyles from './styles';
import createBusinessSchema from '../../Schemas/business';

const { Locales } = constants;

const Business = props => {
  const {
    ui,
    businesses,
    hideActionsPopover,
    showActionsPopover,
    enableEditMode,
    disableEditMode,
    updateBusiness,
  } = props;

  const businessId = Object.keys(businesses)[0];
  const business = Object.values(businesses)[0];
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

  const classes = useStyles();

  const onEditClickHandler = useCallback(() => {
    hideActionsPopover();
    setPopoverAnchorEl(null);
    enableEditMode(business);
  }, [ui.editMode.data]);

  const onEditColorClickHandler = useCallback(() => {}, []);

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

  const onBusinessUpdateHandler = useCallback(
    async (data, { setSubmitting }) => {
      setSubmitting(false);
      await updateBusiness(businessId, data);
      if (!ui.error.type) disableEditMode();
    },
    [ui.error]
  );

  const editModeEnabled = ui.editMode.enabled && !ui.editMode.chilItem;

  useEffect(() => {
    disableEditMode();
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
        <PopoverHint p={2}>
          <Typography>{ui.actionsPopover.message}</Typography>
        </PopoverHint>
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
              onSubmit={(data, { setSubmitting }) => {
                onBusinessUpdateHandler(data, { setSubmitting });
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

                    <FormHelperText error>{ui.error.message}</FormHelperText>
                  </Box>
                  <ColorEditor locale={locale} data={ui.editMode.data} />

                  {isSubmitting && <LinearProgress />}
                  <ButtonBar>
                    <Button variant="contained" onClick={disableEditMode}>
                      {ActionsLabels.CANCEL}
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                      {ActionsLabels.APPLY_CHANGES}
                    </Button>
                  </ButtonBar>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <Box className={classes.wrapper}>
            <Toolbar disableGutters="true">
              <Header>
                <Label color="textSecondary" variant="h1">
                  {BusinessLabels.NAME}
                </Label>
                <Typography>{business.name}</Typography>
              </Header>
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
              <Label color="textSecondary" variant="h1">
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
              </Label>
              <Typography>
                {business.uniqueUrlPath || WarningMessages.MISSING_FIELD}
              </Typography>
            </Box>
            <ColorBox
              name="primary"
              locale={locale}
              value={business.colorPalette.primary}
            />
            <ColorBox
              name="secondary"
              locale={locale}
              value={business.colorPalette.secondary}
            />
            <ColorBox
              name="accent"
              locale={locale}
              value={business.colorPalette.accent}
            />
            <Box mb={2}>
              <Label color="textSecondary" variant="h1">
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
              </Label>

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
              <Label color="textSecondary" variant="h1">
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
              </Label>

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
          </Box>
        )}
      </Box>
    </>
  );
};

function mapStateToProps(state) {
  return {
    businesses: state.businesses,
    ui: state.ui,
  };
}

export default connect(mapStateToProps, { ...businessActions, ...uiActions })(
  Business
);
