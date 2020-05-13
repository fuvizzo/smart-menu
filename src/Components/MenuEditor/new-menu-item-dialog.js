import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/index';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import LocaleEditor from './locale-editor';

import Select from '@material-ui/core/Select';
import {
  DialogActions,
  DialogTitle,
  DialogContent,
} from '../Common/dialog-common';
import InputLabel from '@material-ui/core/InputLabel';

import MenuItem from '@material-ui/core/MenuItem';
import { createNewMenuItem } from '../../Actions/menu-actions';
import { disableInsertMode } from '../../Actions/ui-actions';

import useCommonStyles from '../Common/styles';
import useMenuStyles from './styles';

const NewMenuItemDialog = props => {
  const { ui } = props;
  const commonClasses = useCommonStyles();
  const menuClasses = useMenuStyles();
  const defaultLanguage = ui.settings.defaultLanguage;
  const { Locale } = constants;

  const {
    Labels: { Actions: ActionsLabels, Menu: MenuLabels },

    DISH_TYPES: DishTypes,
  } = Locale[defaultLanguage];
  const createNewMenuItemCallback = useCallback(data => {
    /*  props.createNewMenuItem(menuId, {
      category: '4',
      locales: {
        en: {
          description: 'desc',
          ingredients: 'Ingredients list',
          name: 'Lemon cake',
        },
      },
      price: '6€',
    }); */
  }, []);
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
          <Box p={2}>
            <FormControl className={commonClasses.formControl}>
              <InputLabel id="dish-select-label">
                {MenuLabels.CATEGORY}
              </InputLabel>
              <Select
                className={commonClasses.selectField}
                labelId="dish-select-label"
                name="category"
                onChange={event => {
                  event.currentTarget.name = event.target.name;
                  //onChangeValueHandler(event);
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
                  /*  onChange={onChangeValueHandler} */
                  value={ui.insertModeState.data.value.price}
                />
              </FormControl>
            )}
            <LocaleEditor
              lang={defaultLanguage}
              data={ui.insertModeState.data.value.locales[defaultLanguage]}
              /*   onChangeValue={onChangeValueHandler} */
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
export default connect(mapStateToProps, { disableInsertMode })(
  NewMenuItemDialog
);
