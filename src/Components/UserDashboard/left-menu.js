import React, { useCallback, useState } from 'react';
import {
  Divider,
  List,
  Box,
  ListItemText,
  ListItemIcon,
  ListItem,
} from '@material-ui/core';
import {
  Assignment as AssignmentIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
  ShoppingCart as ShoppingCartIcon,
  Storefront as StorefrontIcon,
  Mail as MailIcon,
} from '@material-ui/icons';
import Cookies from 'js-cookie';
import { signOut } from '../../Actions/index';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import constants from '../../Constants/index';
import { QRCodeIcon } from './styles';
import QRCodeDialog from '../QRCode';
import ContactUsDialog from '../Contacts';
const { Locales } = constants;

const LeftMenu = props => {
  const { defaultLanguage, children } = props;
  const [contactUsDialogOpen, setContactUsDialogOpen] = useState(false);

  const [qRCodeDialogOpen, setQRCodeDialogOpen] = useState(false);
  const signOutHandler = useCallback(() => {
    props.signOut();
  }, []);

  const qRCodeButtonClickHandler = useCallback(() => {
    setQRCodeDialogOpen(true);
  }, [qRCodeDialogOpen]);

  const {
    Labels: { Sections: SectionLabels, Actions: ActionLabels },
  } = Locales[defaultLanguage];

  return (
    <>
      <QRCodeDialog
        open={qRCodeDialogOpen}
        onCloseHandler={() => setQRCodeDialogOpen(false)}
      />
      <ContactUsDialog
        defaultLanguage={defaultLanguage}
        open={contactUsDialogOpen}
        onCloseHandler={() => {
          setContactUsDialogOpen(false);
        }}
      />
      <Box>
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
            <ListItemText primary={ActionLabels.QR_CODE} />
          </ListItem>
        </List>
        <List component="div">
          <ListItem
            button
            onClick={() => {
              setContactUsDialogOpen(true);
            }}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={ActionLabels.CONTACT_US} />
          </ListItem>
        </List>

        <Divider />
        <List component="div">
          <ListItem button onClick={signOutHandler}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={ActionLabels.SIGN_OUT} />
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
