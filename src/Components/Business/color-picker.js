import React from 'react';
import { connect } from 'react-redux';
import constants from '../../Constants';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import { DialogTitle, DialogContent } from '../Common';

import { SketchPicker } from 'react-color';

const ColorPickerDialog = props => {
  const { ui, onChangeCompleteHandler, state, onCloseHandler } = props;
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
          {ActionsLabels.EDIT_COLOR}{' '}
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
    </Dialog>
  );
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}
export default connect(mapStateToProps, {})(ColorPickerDialog);
