import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import constants from '../../Constants/index';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import LocaleEditor from './locale-editor';
import FormHelperText from '@material-ui/core/FormHelperText';

import Select from '@material-ui/core/Select';
import {
  DialogActions,
  DialogTitle,
  DialogContent,
} from '../Common/dialog-common';
import InputLabel from '@material-ui/core/InputLabel';

import MenuItem from '@material-ui/core/MenuItem';
import { disableInsertMode, insertData } from '../../Actions/ui-actions';
import { createNewMenuItem } from '../../Actions/menu-actions';
import { cloneDeep } from 'lodash';
import useCommonStyles from '../Common/styles';
import useMenuStyles from './styles';

const NewMenuItemDialog = props => {
  const { ui } = props;
  const commonClasses = useCommonStyles();
  const menuClasses = useMenuStyles();
  const defaultLanguage = ui.settings.defaultLanguage;
  const { Locale, LocalizedFields } = constants;

  const {
    Labels: {
      Actions: ActionsLabels,
      Menu: MenuLabels,
      FormValidationErrors: FormValidationErrorsLabels,
    },

    DISH_TYPES: DishTypes,
  } = Locale[defaultLanguage];

  const onChangeValueHandler = useCallback(
    event => {
      const input = event.currentTarget;
      const currentValue =
        input.type !== '' ? input.value : input.dataset.value;
      const data = cloneDeep(ui.insertModeState.data);
      if (LocalizedFields.some(field => field === input.name)) {
        data.value.locales[defaultLanguage][input.name] = currentValue;
      } else {
        data.value[input.name] = currentValue;
      }
      props.insertData(data);
    },
    [ui.insertModeState.data.value]
  );

  const createNewMenuItemCallback = useCallback(async () => {
    await props.createNewMenuItem(
      ui.insertModeState.data.id,
      ui.insertModeState.data.value
    );
    props.disableInsertMode();
  }, [ui.insertModeState.data.id, ui.insertModeState.data]);
  return (
    ui.insertModeState.enabled &&
    !ui.insertModeState.childItem && (
      <Dialog
        onClose={props.disableInsertMode}
        aria-labelledby="customized-dialog-title"
        open={ui.insertModeState.enabled}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={props.disableInsertMode}
        >
          {ActionsLabels.ADD_NEW_MENU_ITEM}
        </DialogTitle>
        <DialogContent dividers>
          <Box pb={0} p={2}>
            <FormControl
              className={commonClasses.formControl}
              error={!ui.insertModeState.data.value.category}
            >
              <InputLabel id="dish-select-label">
                {MenuLabels.CATEGORY}
              </InputLabel>
              <Select
                className={commonClasses.selectField}
                labelId="dish-select-label"
                name="category"
                onChange={event => {
                  event.currentTarget.name = event.target.name;
                  onChangeValueHandler(event);
                }}
              >
                {DishTypes.map((dishType, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {dishType}
                    </MenuItem>
                  );
                })}
              </Select>
              {!ui.insertModeState.data.value.category && (
                <FormHelperText>
                  {FormValidationErrorsLabels.REQUIRED}
                </FormHelperText>
              )}
            </FormControl>
            {!ui.insertModeState.data.setMenu && (
              <FormControl className={commonClasses.formControl}>
                <TextField
                  className={clsx(
                    commonClasses.textField,
                    menuClasses.priceField
                  )}
                  label={MenuLabels.PRICE}
                  name="price"
                  onChange={onChangeValueHandler}
                  value={ui.insertModeState.data.value.price}
                />
              </FormControl>
            )}
            <LocaleEditor
              lang={defaultLanguage}
              data={ui.insertModeState.data.value.locales[defaultLanguage]}
              onChangeValue={onChangeValueHandler}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={createNewMenuItemCallback} color="primary">
            {ActionsLabels.PROCEED}
          </Button>
        </DialogActions>
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
  createNewMenuItem,
})(NewMenuItemDialog);
