import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import constants from '../../../Constants/index';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import LocaleEditor from './locale-editor';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { DialogActions, DialogTitle, DialogContent } from '../../Common';

import MenuItem from '@material-ui/core/MenuItem';
import { disableInsertMode, insertData } from '../../../Actions/ui-actions';
import { createNewMenuItem } from '../../../Actions/menu-actions';
import { cloneDeep } from 'lodash';
import useCommonStyles from '../../Common/styles';
import useMenuStyles from '../styles';

const NewMenuItemDialog = props => {
  const { ui } = props;
  const commonClasses = useCommonStyles();
  const menuClasses = useMenuStyles();
  const defaultLanguage = ui.settings.defaultLanguage;
  const { Locale, LocalizedFields, RegexExpressions } = constants;
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
      const data = cloneDeep(ui.insertMode.data);
      if (LocalizedFields.some(field => field === input.name)) {
        data.value.locales[defaultLanguage][input.name] = currentValue;
      } else {
        data.value[input.name] = currentValue;
      }
      props.insertData(data);
    },
    [ui.insertMode.data]
  );

  const createNewMenuItemCallback = useCallback(async () => {
    if (
      ui.insertMode.data.value.category !== '' &&
      ui.insertMode.data.value.locales[defaultLanguage].name &&
      (ui.insertMode.data.setMenu || ui.insertMode.data.value.price)
    ) {
      await props.createNewMenuItem(
        ui.insertMode.data.id,
        ui.insertMode.data.value
      );
      props.disableInsertMode();
    }
  }, [ui.insertMode.data.id, ui.insertMode.data]);
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
          {ActionsLabels.ADD_NEW_MENU_ITEM}
        </DialogTitle>
        <ValidatorForm
          onSubmit={createNewMenuItemCallback}
          onError={errors => console.log(errors)}
        >
          <DialogContent dividers>
            <Box pb={0}>
              <FormControl className={commonClasses.formControl}>
                <TextValidator
                  select
                  validators={['required']}
                  errorMessages={FormValidationErrorsLabels.REQUIRED}
                  className={commonClasses.selectField}
                  label={MenuLabels.CATEGORY}
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
                </TextValidator>
              </FormControl>
              {!ui.insertMode.data.setMenu && (
                <FormControl className={commonClasses.formControl}>
                  <TextValidator
                    className={clsx(
                      commonClasses.textField,
                      menuClasses.priceField
                    )}
                    label={MenuLabels.PRICE}
                    validators={[
                      'required',
                      `matchRegexp:${RegexExpressions.EURO}`,
                    ]}
                    errorMessages={[
                      FormValidationErrorsLabels.REQUIRED,
                      FormValidationErrorsLabels.CURRENCY,
                    ]}
                    name="price"
                    onChange={onChangeValueHandler}
                    value={ui.insertMode.data.value.price}
                  />
                </FormControl>
              )}
              <LocaleEditor
                lang={defaultLanguage}
                data={ui.insertMode.data.value.locales[defaultLanguage]}
                onChangeValue={onChangeValueHandler}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit" autoFocus color="primary">
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
  createNewMenuItem,
})(NewMenuItemDialog);
