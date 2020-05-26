import React from 'react';
import { connect } from 'react-redux';
import constants from '../../Constants';
import { Dialog, Typography, Button } from '@material-ui/core';

import { DialogTitle, DialogContent, DialogActions } from '../Common';

import { SketchPicker } from 'react-color';

const ColorPickerDialog = props => {
  const {
    ui,
    onChangeCompleteHandler,
    state,
    onCloseHandler,
    onSelectColorHandler,
  } = props;
  const defaultLanguage = ui.settings.defaultLanguage;
  const { Locales } = constants;
  const {
    Labels: { Actions: ActionsLabels, Business: BusinessLabels },
  } = Locales[defaultLanguage];

  return (
    <Dialog
      onClose={onCloseHandler}
      aria-labelledby="color-picker-dialog-title"
      open={state.open}
    >
      <DialogTitle id="color-picker-dialog-title" onClose={onCloseHandler}>
        <Typography color="secondary">
          {BusinessLabels.ColorPalette[state.name.toUpperCase()]}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <SketchPicker
          color={state.color.hex}
          onChangeComplete={({ hex }) =>
            onChangeCompleteHandler(hex, state.name)
          }
        />
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          onClick={onSelectColorHandler}
          autoFocus
          color="primary"
          variant="contained"
        >
          {ActionsLabels.SELECT}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}
export default connect(mapStateToProps, {})(ColorPickerDialog);
