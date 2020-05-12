import React, { useCallback } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { signOut } from '../../Actions/index';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import constants from '../../Constants/index';
const { Locale } = constants;

const LeftMenu = props => {
  const { defaultLanguage } = props;

  const signOutHandler = useCallback(() => {
    props.signOut();
  }, []);
  const { url } = useRouteMatch();
  const {
    Labels: { Sections: SectionLabels, Actions: ActionsLabels },
  } = Locale[defaultLanguage];

  return (
    <div>
      <Divider />
      <List>
        <ListItem button to="./menu-list" component={RouterLink}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary={SectionLabels.MENU_LIST} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem to="./subscription-status" component={RouterLink} button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary={SectionLabels.SUBSCRIPTION_STATUS} />
        </ListItem>
        <ListItem button to="./account" component={RouterLink}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={SectionLabels.ACCOUNT} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={signOutHandler}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={ActionsLabels.SIGN_OUT} />
        </ListItem>
      </List>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, {
  signOut,
})(LeftMenu);
