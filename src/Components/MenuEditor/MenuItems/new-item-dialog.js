import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import constants from '../../../Constants/index';

import { Box, MenuItem, Typography, Button, Dialog } from '@material-ui/core';
import LocaleEditor from './locale-editor';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { DialogActions, DialogTitle, DialogContent } from '../../Common';

import { disableInsertMode, insertData } from '../../../Actions/ui-actions';
import { createNewMenuItem } from '../../../Actions/menu-actions';
import { ShortFormFieldWrapper, FormControl } from '../../Common/styles';
import useMenuStyles from '../styles';

const NewMenuItemDialog = props => {
  const { ui } = props;
  const menuClasses = useMenuStyles();
  const defaultLanguage = ui.settings.defaultLanguage;
  const { Locales, LocalizedFields, RegexExpressions, MenuTypes } = constants;
  const MenuItemTypeCategory = MenuTypes[ui.insertMode.data.menuType];
  const {
    Labels: {
      Actions: ActionsLabels,
      Menu: MenuLabels,
      Errors: { FormValidation: FormValidationErrors },
    },

    MenuItemTypes: { [MenuItemTypeCategory]: MenuItemTypes },
  } = Locales[defaultLanguage];

  const onChangeValueHandler = useCallback(
    event => {
      const input = event.currentTarget;
      const currentValue =
        input.type !== '' ? input.value : input.dataset.value;
      const data = ui.insertMode.data;
      if (LocalizedFields.some(field => field === input.name)) {
        data.value.locales[defaultLanguage][input.name] = currentValue;
      } else {
        data.value[input.name] = currentValue;
      }
      props.insertData(data);
    },
    [ui.insertMode.data]
  );

  const createNewMenuItemHandler = useCallback(async () => {
    await props.createNewMenuItem(
      ui.insertMode.data.id,
      ui.insertMode.data.value
    );
    props.disableInsertMode();
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
          <Typography color="secondary">
            {ActionsLabels.ADD_NEW_MENU_ITEM}
          </Typography>
        </DialogTitle>
        <ValidatorForm onSubmit={createNewMenuItemHandler}>
          <DialogContent dividers>
            <Box pb={0}>
              <FormControl>
                <ShortFormFieldWrapper>
                  <TextValidator
                    select
                    value={ui.insertMode.data.value.type}
                    validators={['required']}
                    errorMessages={FormValidationErrors.REQUIRED}
                    label={MenuLabels.CATEGORY}
                    name="type"
                    onChange={event => {
                      event.currentTarget.name = event.target.name;
                      onChangeValueHandler(event);
                    }}
                  >
                    {MenuItemTypes.ITEM_LIST.map((itemType, index) => {
                      return (
                        <MenuItem key={index} value={index}>
                          {itemType}
                        </MenuItem>
                      );
                    })}
                  </TextValidator>
                </ShortFormFieldWrapper>
              </FormControl>
              {!ui.insertMode.data.setMenu && (
                <FormControl>
                  <ShortFormFieldWrapper>
                    <TextValidator
                      className={menuClasses.priceField}
                      label={MenuLabels.PRICE}
                      validators={[
                        'required',
                        `matchRegexp:${RegexExpressions.EURO}`,
                      ]}
                      errorMessages={[
                        FormValidationErrors.REQUIRED,
                        FormValidationErrors.CURRENCY,
                      ]}
                      name="price"
                      onChange={onChangeValueHandler}
                      value={ui.insertMode.data.value.price}
                    />
                  </ShortFormFieldWrapper>
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
  createNewMenuItem,
})(NewMenuItemDialog);
