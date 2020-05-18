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
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Button from '@material-ui/core/Button';
import { PopoverComponent as Popover } from '../Common';
import * as uiActions from '../../Actions/ui-actions';
import constants from '../../Constants/index';
import useCommonStyles from '../Common/styles';
import useDashboardStyles from '../Dashboard/styles';
import useStyles from './styles';

const { Locales } = constants;
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

  const {
    Labels: {
      Business: BusinessLabels,
      Actions: ActionsLabels,
      Warnings: WarningMessages,
      Hints: HintLabels,
    },
    Languages,
    DEFAULT_LANGUAGE,
  } = Locales[defaultLanguage];

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
      {ui.editMode.enabled ? (
        <>
          {' '}
          <Box className={commonClasses.buttonBar}>
            <Button variant="contained" onClick={disableEditMode}>
              {ActionsLabels.CANCEL}
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {ActionsLabels.APPLY_CHANGES}
            </Button>
          </Box>
        </>
      ) : (
        <Box p={2}>
          <Toolbar disableGutters="true" className={commonClasses.toolbar}>
            <Box pb={2} className={commonClasses.header}>
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
              onClick={event => popoverClickHandler(event, { type: 'actions' })}
            >
              <MoreVertIcon />
            </IconButton>
          </Toolbar>
          <Box pb={2} p={0}>
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
          <Box pb={2} p={0}>
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
          <Box pb={2} p={0}>
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
          {/*  <FormControl component="fieldset" className={commonClasses.formControl}>
        <FormLabel
          className={commonClasses.label}
          component="legend"
          id="dish-select-label"
        >
          {DEFAULT_LANGUAGE}
        </FormLabel>

        <RadioGroup
          aria-label="dish-select-label"
          value={defaultLanguage}
          onChange={onChangeValueHandler}
        >
          {constants.SupportedLanguages.map((lang, index) => {
            return (
              <FormControlLabel
                disabled={!Locales[lang]}
                key={index}
                value={lang}
                control={<Radio />}
                label={
                  Locales[lang]
                    ? Languages[lang]
                    : `${Languages[lang]} (Translation is coming soon!)`
                }
              />
            );
          })}
        </RadioGroup>
      </FormControl>
   */}
        </Box>
      )}{' '}
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
