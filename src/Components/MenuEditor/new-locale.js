import React, { useState, Children, isValidElement, cloneElement } from 'react';
import { connect } from 'react-redux';
import * as uiActions from '../../Actions/ui-actions';
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { ShortFormFieldWrapper, ButtonBar } from '../Common/styles';
import { ValidatorForm } from 'react-material-ui-form-validator';
import constants from '../../Constants/index';
const { Locales } = constants;

const createChildrenWithProps = (children, props) =>
  Children.map(children, child => {
    if (isValidElement(child)) {
      return cloneElement(child, props);
    }
    return child;
  });

const NewLocaleForm = props => {
  const {
    ui,
    availableLanguages,
    onChangeValue,
    onCreateNewMenuItemLocale,
    disableInsertMode,
    children,
  } = props;
  const [lang, setLang] = useState(availableLanguages[0]);

  const defaultLanguage = ui.settings.defaultLanguage;

  const {
    Labels: { Actions: ActionsLabels, Menu: MenuLabels },
  } = Locales[defaultLanguage];
  const onChangeLangValue = event => {
    event.currentTarget.name = event.target.name;
    const lang = event.target.value;
    event.currentTarget.dataset.lang = lang;
    setLang(lang);
    onChangeValue(event);
  };

  return (
    <ValidatorForm
      onSubmit={onCreateNewMenuItemLocale}
      onError={errors => console.log(errors)}
    >
      <Box p={3}>
        <FormControl>
          <ShortFormFieldWrapper>
            <InputLabel id="lang-select-label">
              {MenuLabels.LANGUAGE}
            </InputLabel>
            <Select
              labelId="lang-select-label"
              onChange={onChangeLangValue}
              value={lang}
              name="lang"
            >
              {availableLanguages.map((lang, index) => {
                return (
                  <MenuItem key={index} value={lang}>
                    {Locales[defaultLanguage].Languages[lang]}
                  </MenuItem>
                );
              })}
            </Select>
          </ShortFormFieldWrapper>
        </FormControl>

        {createChildrenWithProps(children, {
          data: ui.insertMode.data.value,
          lang,
        })}

        <ButtonBar>
          <Button variant="contained" onClick={disableInsertMode}>
            {ActionsLabels.CANCEL}
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {ActionsLabels.PROCEED}
          </Button>
        </ButtonBar>
      </Box>
    </ValidatorForm>
  );
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}

export default connect(mapStateToProps, uiActions)(NewLocaleForm);
