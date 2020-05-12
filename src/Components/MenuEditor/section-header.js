import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/index';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {
  DialogActions,
  DialogTitle,
  DialogContent,
} from '../Common/dialog-common';

import { createNewMenuItem } from '../../Actions/menu-actions';
import Toolbar from '@material-ui/core/Toolbar';
import useStyles from './styles';

const NewMenuItemDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Modal title
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const SectionHeader = props => {
  const { ui, menuId } = props;
  const classes = useStyles();
  const defaultLanguage = ui.settings.defaultLanguage;
  const { Locale } = constants;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const createNewMenuItemCallback = useCallback(data => {
    props.createNewMenuItem(menuId, {
      category: '4',
      locales: {
        en: {
          description: 'desc',
          ingredients: 'Ingredients list',
          name: 'Lemon cake',
        },
      },
      price: '6€',
    });
  }, []);

  const {
    Labels: { Sections: SectionLabels },
  } = Locale[defaultLanguage];
  return (
    <Toolbar className={classes.toolbar}>
      <Typography className={classes.header} component="h1">
        {SectionLabels.MENU_EDITOR}
      </Typography>
      <IconButton edge="end" aria-describedby="" onClick={handleClickOpen}>
        <AddCircleOutlineIcon />
      </IconButton>
      <NewMenuItemDialog handleClose={handleClose} open={open} />
    </Toolbar>
  );
};
function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}
export default connect(mapStateToProps, { createNewMenuItem })(SectionHeader);
