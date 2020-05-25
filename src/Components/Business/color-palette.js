import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import ColorPicker from './color-picker';

import { Label } from '../Common/styles';
import useStyles from './styles';

export const ColorBox = props => {
  const {
    value,
    onEditClickHandler,
    editModeEnabled = false,
    locale,
    name,
  } = props;
  const {
    Labels: { Actions: ActionsLabels, Business: BusinessLabels },
  } = locale;
  const classes = useStyles();
  return (
    <Box mb={2}>
      <Label color="textSecondary" variant="h1">
        {BusinessLabels.ColorPalette[name.toUpperCase()]}
      </Label>
      <Box mt={0.5} className={classes.colorPicker}>
        <Box
          mt={2}
          style={{
            backgroundColor: value,
          }}
          className={classes.colorBox}
        />
        {editModeEnabled && (
          <Button
            color="secondary"
            onClick={() => onEditClickHandler(value, name)}
            className={classes.colorPickerButton}
          >
            {ActionsLabels.EDIT}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export const ColorEditor = ({ data, locale, onChangeCompleteHandler }) => {
  const defaultState = {
    name: '',
    open: false,
    color: { hex: '000' },
  };
  const [colorPickerDialogState, setColorPickerDialogState] = useState(
    defaultState
  );

  const items = [
    { name: 'primary', value: data.colorPalette.primary },
    {
      name: 'secondary',
      value: data.colorPalette.secondary,
    },
    { name: 'accent', value: data.colorPalette.accent },
  ];

  const onEditClickHandler = (value, name) => {
    setColorPickerDialogState({ open: true, name, color: { hex: value } });
  };
  return (
    <Box mb={2}>
      <ColorPicker
        open={colorPickerDialogState.open}
        onCloseHandler={() => setColorPickerDialogState(defaultState)}
        state={colorPickerDialogState}
        onSelectColorHandler={() => {
          data.colorPalette[colorPickerDialogState.name] =
            colorPickerDialogState.color.hex;
          setColorPickerDialogState(defaultState);
        }}
        onChangeCompleteHandler={(hex, name) => {
          setColorPickerDialogState({
            ...colorPickerDialogState,
            color: { hex },
          });
          /*   data.colorPalette[name] = hex; */
        }}
      />
      {items.map((item, index) => {
        return (
          <ColorBox
            key={index}
            editModeEnabled
            locale={locale}
            value={item.value}
            name={item.name}
            onEditClickHandler={onEditClickHandler}
          />
        );
      })}
    </Box>
  );
};
