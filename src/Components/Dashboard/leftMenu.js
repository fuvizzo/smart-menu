import React, { useCallback } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { signOut } from '../../Actions/index';
import { connect, useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { useRouteMatch, useHistory } from 'react-router-dom';
const LeftMenu = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const signOutHandler = useCallback(() => {
    dispatch(signOut());
  }, []);
  const { url } = useRouteMatch();

  return (
    <div>
      <Divider />
      <List>
        <ListItem button onClick={() => history.push(url)}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Subscription status" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => history.push(`${url}/menu-editor`)}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Menu editor" />
        </ListItem>
        <ListItem button onClick={signOutHandler}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

export default connect(null, {
  signOut,
})(LeftMenu);
