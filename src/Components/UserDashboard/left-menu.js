import React, { useCallback, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Box from '@material-ui/core/Box';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { signOut } from '../../Actions/index';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import constants from '../../Constants/index';
import { QRCodeIcon } from './styles';
import QRCodeDialog from '../QRCode';
const { Locales } = constants;

const LeftMenu = props => {
  const { defaultLanguage, children } = props;
  const [qRCodeDialogOpen, setQRCodeDialogOpen] = useState(false);
  const signOutHandler = useCallback(() => {
    props.signOut();
  }, []);

  const qRCodeButtonClickHandler = useCallback(() => {
    setQRCodeDialogOpen(true);
  }, [qRCodeDialogOpen]);

  const {
    Labels: { Sections: SectionLabels, Actions: ActionsLabels },
  } = Locales[defaultLanguage];

  return (
    <>
      {' '}
      <QRCodeDialog
        open={qRCodeDialogOpen}
        onCloseHandler={() => setQRCodeDialogOpen(false)}
      />
      <Box ml={1}>
        {children}

        <Divider />
        <List component="div">
          <ListItem button to="/dashboard/menu-list" component={RouterLink}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={SectionLabels.MENU_LIST} />
          </ListItem>
        </List>
        <Divider />
        <List component="div">
          <ListItem
            to="/dashboard/subscription-status"
            component={RouterLink}
            button
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary={SectionLabels.SUBSCRIPTION_STATUS} />
          </ListItem>
          <ListItem button to="/dashboard/business" component={RouterLink}>
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary={SectionLabels.BUSINESS} />
          </ListItem>
          <ListItem button to="/dashboard/account" component={RouterLink}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={SectionLabels.ACCOUNT} />
          </ListItem>
        </List>
        <Divider />
        <List component="div">
          <ListItem button onClick={qRCodeButtonClickHandler}>
            <ListItemIcon>
              <QRCodeIcon />
            </ListItemIcon>
            <ListItemText primary={ActionsLabels.SIGN_OUT} />
          </ListItem>
        </List>

        <Divider />
        <List component="div">
          <ListItem button onClick={signOutHandler}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={ActionsLabels.SIGN_OUT} />
          </ListItem>
        </List>
      </Box>
    </>
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
