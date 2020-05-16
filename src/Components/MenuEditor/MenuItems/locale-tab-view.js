import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import constants from '../../../Constants/index';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';
import useStyles from './../styles';
import useCommonStyles from '../../Common/styles';

const { Locale } = constants;

const LocaleTabView = props => {
  const {
    localeActionsPopoverId,
    handleLocaleActionsClick,
    ui,
    lang,
    locale,
  } = props;

  const defaultLanguage = ui.settings.defaultLanguage;
  const commonClasses = useCommonStyles();

  const classes = useStyles();
  const {
    Labels: { Menu: MenuLabels, Warnings: WarningMessages },
  } = Locale[defaultLanguage];

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Box mt={1} className={classes.header}>
          <Typography
            className={commonClasses.label}
            color="textSecondary"
            variant="h3"
          >
            {MenuLabels.DISH_NAME}
          </Typography>
          <Box mt={0.5}>
            <Typography component="h3">{locale.name}</Typography>
          </Box>
        </Box>

        <IconButton
          edge="end"
          aria-describedby={localeActionsPopoverId}
          onClick={event => handleLocaleActionsClick(event, lang)}
        >
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
      <Box mt={2}>
        <Typography
          className={commonClasses.label}
          color="textSecondary"
          variant="h3"
        >
          {MenuLabels.DESCRIPTION}
        </Typography>
      </Box>
      <Box mt={0.5}>
        <Typography variant="body2" color="textPrimary" component="p">
          {locale.description || WarningMessages.MISSING_FIELD}
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography
          className={commonClasses.label}
          color="textSecondary"
          variant="h3"
        >
          {MenuLabels.INGREDIENTS_LIST}
        </Typography>
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
