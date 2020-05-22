import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, Box, Typography } from '@material-ui/core/';
import { ValidatorForm } from 'react-material-ui-form-validator';

import LocaleEditor from '../MenuEditor/base-locale-editor';
import { disableInsertMode, insertData } from '../../Actions/ui-actions';
import { createNewMenu } from '../../Actions/menu-actions';
import { DialogActions, DialogTitle, DialogContent } from '../Common';
import constants from '../../Constants';
const { Locales } = constants;
const NewMenuDialog = props => {
  const { ui } = props;
  const defaultLanguage = ui.settings.defaultLanguage;

  const {
    Labels: { Actions: ActionsLabels, Menu: MenuLabels },
  } = Locales[defaultLanguage];

  const onChangeValueHandler = useCallback(
    event => {
      const input = event.currentTarget;
      const currentValue = input.value;
      const data = ui.insertMode.data;
      data.value.info.locales[defaultLanguage][input.name] = currentValue;
      props.insertData(data);
    },
    [ui.insertMode.data]
  );

  const createNewMenuHandler = useCallback(async () => {
    await props.createNewMenu(ui.insertMode.data.value);
    props.disableInsertMode();
  }, [ui.insertMode.data]);
  return (
    ui.insertMode.enabled &&
    !ui.insertMode.childItem && (
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
            {ActionsLabels.ADD_NEW_MENU}
          </Typography>
        </DialogTitle>
        <ValidatorForm
          onSubmit={createNewMenuHandler}
          onError={errors => console.log(errors)}
        >
          <DialogContent dividers>
            <Box pb={0}>
              <LocaleEditor
                labels={{
                  name: MenuLabels.MENU_NAME,
                  description: MenuLabels.DESCRIPTION,
                }}
                lang={defaultLanguage}
                data={ui.insertMode.data.value.info.locales[defaultLanguage]}
                onChangeValue={onChangeValueHandler}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit" autoFocus color="primary" variant="contained">
              {ActionsLabels.PROCEED}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    )
  );
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}
export default connect(mapStateToProps, {
  disableInsertMode,
  insertData,
  createNewMenu,
})(NewMenuDialog);
