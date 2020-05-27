import React, { useState, useCallback } from 'react';

import { connect } from 'react-redux';
import { IconButton, Box, Grid, Card, Typography } from '@material-ui/core';
import { PopoverHint, Label, HelpIcon } from '../Common/styles';
import { ColorEditor } from './color-palette';
import ImageSelector from './image-selector';
import { PopoverComponent as Popover } from '../Common';
import { MediaBox } from './styles';
import constants from '../../Constants/index';
import * as uiActions from '../../Actions/ui-actions';
import * as businessActions from '../../Actions/business-actions';
import { cloneDeep } from 'lodash';

const BusinessMediaAndThemeEditor = props => {
  const {
    ui,
    businessData,
    hideActionsPopover,
    uploadBusinessMedia,
    deleteBusinessMedia,
    updateBusinessTheme,
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
      Actions: ActionLabels,
    },
  } = locale;

  const ImagePicker = props => {
    const { mediaType } = props;
    return (
      <ImageSelector
        accept="image/png, image/jpeg"
        labels={{
          MISSING_FIELD: WarningMessages.MISSING_FIELD,
          ADD: ActionLabels.ADD,
          REMOVE: ActionLabels.REMOVE,
          REPLACE: ActionLabels.REPLACE,
        }}
        data={businessMedia[mediaType] || {}}
        alt={`business-${mediaType}`}
        onDelete={() => {
          deleteBusinessMedia(
            businessId,
            mediaType,
            businessMedia.logo.imageType
          );
        }}
        onChange={(file, setProgressValue) => {
          uploadBusinessMedia(businessId, file, mediaType, snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressValue(progress);
          });
        }}
      />
    );
  };

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
          <Box m={2}>
            <ColorEditor
              locale={locale}
              data={businessTheme}
              onSelectColorHandler={(name, hex) => {
                const theme = cloneDeep(businessTheme);
                theme.colorPalette[name] = hex;
                updateBusinessTheme(businessId, theme);
              }}
            />
            <MediaBox>
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
                <ImagePicker mediaType="logo" />
              </Box>
            </MediaBox>
            <MediaBox>
              <Box mb={2}>
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
                <ImagePicker mediaType="headerBanner" />
              </Box>
            </MediaBox>
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
