import React from 'react';
import { connect } from 'react-redux';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/index';
import IconButton from '@material-ui/core/IconButton';
import { enableInsertMode } from '../../Actions/ui-actions';
import Toolbar from '@material-ui/core/Toolbar';
import useMenuStyles from '../MenuEditor/styles';
const { Locale } = constants;

const emptyMenuData = defaultLanguage => ({
  published: false,
  info: {
    locales: {
      [defaultLanguage]: {
        description: '',
        name: '',
      },
    },
  },
});

const SectionHeader = props => {
  const { defaultLanguage } = props;
  const classes = useMenuStyles();

  const {
    Labels: { Sections: SectionLabels },
  } = Locale[defaultLanguage];

  return (
    <Toolbar className={classes.toolbar}>
      <Typography className={classes.header} component="h1">
        {SectionLabels.MENU_LIST}
      </Typography>
      <IconButton
        edge="end"
        aria-describedby=""
        color="inherit"
        onClick={() =>
          props.enableInsertMode({
            // id: userId,
            value: emptyMenuData(defaultLanguage),
          })
        }
      >
        <AddCircleOutlineIcon />
      </IconButton>
      {/*   <NewMenuDialog /> */}
    </Toolbar>
  );
};

function mapStateToProps(state) {
  return {
    menus: state.menus,
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}
export default connect(mapStateToProps, { enableInsertMode })(SectionHeader);
