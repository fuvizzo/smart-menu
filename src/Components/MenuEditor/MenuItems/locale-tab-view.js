import React from 'react';
import { connect } from 'react-redux';
import { Typography, Box, Toolbar } from '@material-ui/core';
import constants from '../../../Constants/index';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './../styles';
import useCommonStyles, { Label } from '../../Common/styles';

const { Locales } = constants;

const LocaleTabView = props => {
  const {
    localeActionsPopoverId,
    localeActionsClickHandler,
    ui,
    lang,
    locale,
  } = props;

  const defaultLanguage = ui.settings.defaultLanguage;

  const classes = useStyles();
  const {
    Labels: { Menu: MenuLabels, Warnings: WarningMessages },
  } = Locales[defaultLanguage];

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Box mt={1} className={classes.header}>
          <Label color="textSecondary" variant="h3">
            {MenuLabels.NAME}
          </Label>
          <Box mt={0.5}>
            <Typography component="h3">{locale.name}</Typography>
          </Box>
        </Box>

        <IconButton
          edge="end"
          aria-describedby={localeActionsPopoverId}
          onClick={event => localeActionsClickHandler(event, lang)}
        >
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
      <Box mt={2}>
        <Label color="textSecondary" variant="h3">
          {MenuLabels.DESCRIPTION}
        </Label>
      </Box>
      <Box mt={0.5}>
        <Typography variant="body2" color="textPrimary" component="p">
          {locale.description || WarningMessages.MISSING_FIELD}
        </Typography>
      </Box>
      <Box mt={2}>
        <Label color="textSecondary" variant="h3">
          {MenuLabels.INGREDIENTS_LIST}
        </Label>
      </Box>
      <Box mt={0.5}>
        <Typography variant="body2" color="textPrimary" component="p">
          {locale.ingredients || WarningMessages.MISSING_FIELD}
        </Typography>
      </Box>
    </>
  );
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}
export default connect(mapStateToProps)(LocaleTabView);
