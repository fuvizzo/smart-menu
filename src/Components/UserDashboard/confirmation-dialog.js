import React from 'react';

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/index';
import { DialogActions, DialogTitle, DialogContent } from '../Common';

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
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps)(ConfirmationDialog);
