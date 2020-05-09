import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/index';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const { Locale } = constants;
const ConfirmationDialog = props => {
  const { onConfirm, open, handleClose, defaultLanguage, data, action } = props;
  const dialogInfo = Locale[defaultLanguage].ConfirmationActions[action];
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {dialogInfo.getTitle(data)}
      </DialogTitle>
      <DialogContent>
        <Typography gutterBottom>{dialogInfo.getContent(data)}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          {Locale[defaultLanguage].Labels.Actions.CANCEL}
        </Button>
        <Button
          autoFocus
          onClick={async () => {
            await onConfirm();
            handleClose();
          }}
          color="primary"
        >
          {Locale[defaultLanguage].Labels.Actions.PROCEED}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps)(ConfirmationDialog);
