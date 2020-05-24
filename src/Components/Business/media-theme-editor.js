import React, { useState, useCallback } from 'react';

import { connect } from 'react-redux';
import { IconButton, Box, Grid, Card, Typography } from '@material-ui/core';
import { PopoverHint, Label, HelpIcon } from '../Common/styles';
import { ColorEditor } from './color-palette';
import ImageSelector from './image-selector';
import { PopoverComponent as Popover } from '../Common';
import useStyles from './styles';
import constants from '../../Constants/index';
import * as uiActions from '../../Actions/ui-actions';
import * as businessActions from '../../Actions/business-actions';

const BusinessMediaAndThemeEditor = props => {
  const {
    ui,
    businessData,
    hideActionsPopover,
    updateBusinessMedia,
    showActionsPopover,
  } = props;
  const {
    businessId,
    business: { media: businessMedia, theme: businessTheme },
  } = businessData;
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const popoverOpen = Boolean(popoverAnchorEl);
  const popoverId = popoverOpen
    ? 'business-media-and-theme-popover'
    : undefined;
  const defaultLanguage = ui.settings.defaultLanguage;
  const { Locales } = constants;
  const classes = useStyles();

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
  const locale = Locales[defaultLanguage];
  const {
    Labels: {
      Business: BusinessLabels,
      Warnings: WarningMessages,
      Hints: HintLabels,
    },
  } = locale;

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
      <Grid item xs={12}>
        <Card width={1} elevation={2}>
          <Box p={2}>
            <ColorEditor locale={locale} data={businessTheme} />
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

              {businessMedia.logo ? (
                <>
                  <img
                    className={classes.logo}
                    src={businessMedia.logo.url}
                    alt="business-logo"
                  />
                  <ImageSelector
                    onChange={file => {
                      console.log(file);
                      const newFilename = `logo.${file.name.split('.')[1]}`;
                      updateBusinessMedia(
                        businessId,
                        file,
                        'logo',
                        newFilename
                      );
                    }}
                  />
                </>
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

              {businessMedia.headerBanner ? (
                <img
                  className={classes.headerBanner}
                  src={businessMedia.headerBanner.url}
                  alt="business-header-banner"
                />
              ) : (
                <Typography> {WarningMessages.MISSING_FIELD} </Typography>
              )}
            </Box>
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

export default connect(mapStateToProps, { ...uiActions, ...businessActions })(
  BusinessMediaAndThemeEditor
);
