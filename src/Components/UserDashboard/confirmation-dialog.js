import React from 'react';

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/index';
import { DialogActions, DialogTitle, DialogContent } from '../Common';

const { Locales } = constants;
const ConfirmationDialog = props => {
  const {
    onConfirm,
    open,
    handleClose,
    defaultLanguage,
    title,
    content,
  } = props;
  const ActionLabels = Locales[defaultLanguage].Labels.Actions;
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography gutterBottom>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          {ActionLabels.CANCEL}
        </Button>
        <Button
          autoFocus
          onClick={async () => {
            await onConfirm();
            handleClose();
          }}
          color="primary"
        >
          {ActionLabels.PROCEED}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps)(ConfirmationDialog);
