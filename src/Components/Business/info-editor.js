import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  LinearProgress,
  IconButton,
  ListItem,
  MenuItem,
  FormHelperText,
  ListItemIcon,
  ListItemText,
  Box,
  Grid,
  Card,
  Typography,
  Toolbar,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
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

const BusinessEditor = props => {
  const {
    ui,
    businessData,
    hideActionsPopover,
    showActionsPopover,
    enableEditMode,
    disableEditMode,
    updateBusinessInfo,
  } = props;

  const {
    businessId,
    business: { info: businessInfo },
  } = businessData;

  const defaultLanguage = ui.settings.defaultLanguage;
  const locale = Locales[defaultLanguage];
  const {
    Labels: {
      Business: BusinessLabels,
      Actions: ActionsLabels,
      Warnings: WarningMessages,
      Hints: HintLabels,
      Errors: { FormValidation: FormValidationErrors },
    },
    BUSINESS_TYPES: BusinessTypes,
  } = locale;

  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

  const popoverOpen = Boolean(popoverAnchorEl);
  const popoverId = popoverOpen ? 'business-info-popover' : undefined;

  const classes = useStyles();

  const onEditClickHandler = useCallback(() => {
    hideActionsPopover();
    setPopoverAnchorEl(null);
    enableEditMode(businessInfo);
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

  const onBusinessUpdateHandler = useCallback(
    async (data, { setSubmitting }) => {
      setSubmitting(false);
      const result = await updateBusinessInfo(businessId, data);
      if (result) disableEditMode();
    },
    [ui.error]
  );

  const editModeEnabled = ui.editMode.enabled && !ui.editMode.chilItem;

  useEffect(() => {
    disableEditMode();
  }, []);

  return (
    <Grid
      container
      spacing={4}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
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
      <Grid item xs={12}>
        <Card width={1} elevation={2}>
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
                      <Box mb={3}>
                        <Field
                          component={TextField}
                          select
                          label={BusinessLabels.TYPE}
                          name="type"
                          value={values.type}
                        >
                          {BusinessTypes.map((businessType, index) => {
                            return (
                              <MenuItem key={index} value={index}>
                                {businessType}
                              </MenuItem>
                            );
                          })}
                        </Field>
                      </Box>
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

                      {isSubmitting && <LinearProgress />}
                      <ButtonBar>
                        <Button variant="contained" onClick={disableEditMode}>
                          {ActionsLabels.CANCEL}
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
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
                      {BusinessLabels.TYPE}
                    </Label>
                    <Typography>{BusinessTypes[businessInfo.type]}</Typography>
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
                    {BusinessLabels.NAME}
                  </Label>
                  <Typography>{businessInfo.name}</Typography>
                </Box>
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
                    {businessInfo.uniqueUrlPath ||
                      WarningMessages.MISSING_FIELD}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
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

export default connect(mapStateToProps, { ...businessActions, ...uiActions })(
  BusinessEditor
);
