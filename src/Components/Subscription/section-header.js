import React from 'react';
import { connect } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/index';
import useMenuStyles from '../MenuEditor/styles';
const { Locales } = constants;

const SectionHeader = props => {
  const { defaultLanguage } = props;
  const classes = useMenuStyles();

  const {
    Labels: { Sections: SectionLabels },
  } = Locales[defaultLanguage];

  return (
    <Toolbar className={classes.toolbar}>
      <Typography className={classes.header} component="h1">
        {SectionLabels.SUBSCRIPTION_STATUS}
      </Typography>
    </Toolbar>
  );
};

function mapStateToProps(state) {
  return {
    menus: state.menus,
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}
export default connect(mapStateToProps)(SectionHeader);
