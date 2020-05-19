import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import constants from '../../../Constants/index';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import { DialogActions, DialogTitle, DialogContent } from '../../Common';

import { SketchPicker } from 'react-color';
import useCommonStyles from '../../Common/styles';
import useMenuStyles from '../styles';

const ColorPickerDialog = props => {
  const { ui, onChangeCompleteHandler, value } = props;
  const defaultLanguage = ui.settings.defaultLanguage;
  const { Locales, LocalizedFields } = constants;
  const {
    Labels: { Actions: ActionsLabels },
  } = Locales[defaultLanguage];

  return (
    ui.editMode.enabled &&
    !ui.editMode.childItem && (
      <Dialog
        onClose={props.disableInsertMode}
        aria-labelledby="new-menu-item-dialog-title"
        open={ui.insertMode.enabled}
      >
        <DialogTitle
          id="new-menu-item-dialog-title"
          onClose={props.disableInsertMode}
        >
          <Typography color="secondary">
            {ActionsLabels.ADD_NEW_MENU_ITEM}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <SketchPicker
            color={value}
            onChangeComplete={onChangeCompleteHandler}
          />
        </DialogContent>
      </Dialog>
    )
  );
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}
export default connect(mapStateToProps, {})(ColorPickerDialog);
