import React, { useState } from 'react';
import LocaleEditor from './locale-editor';
import { connect } from 'react-redux';
import * as uiActions from '../../Actions/ui-actions';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import useCommonStyles from '../Common/styles';
import Button from '@material-ui/core/Button';

import constants from '../../Constants/index';
const { Locale } = constants;

const NewLocaleForm = props => {
  const {
    ui,
    newLocale,
    availableLanguages,
    onChangeValue,
    onCreateNewLocalInMenuItem,
    disableInsertMode,
  } = props;
  const [lang, setLang] = useState(availableLanguages[0]);
  const commonClasses = useCommonStyles();

  const defaultLanguage = ui.settings.defaultLanguage;

  const {
    Labels: { Actions: ActionsLabels, Menu: MenuLabels, Common: CommonLabels },
    Languages,
    DISH_TYPES: DishTypes,
  } = Locale[defaultLanguage];
  const onChangeLangValue = event => {
    event.currentTarget.name = event.target.name;
    const lang = event.target.value;
    event.currentTarget.dataset.lang = lang;
    setLang(lang);
    onChangeValue(event);
  };

  return (
    <Box p={3}>
      <FormControl className={commonClasses.formControl}>
        <InputLabel id="lang-select-label">{MenuLabels.LANGUAGE}</InputLabel>
        <Select
          className={commonClasses.selectField}
          labelId="lang-select-label"
          onChange={onChangeLangValue}
          value={lang}
          name="lang"
        >
          {availableLanguages.map((lang, index) => {
            return (
              <MenuItem key={index} value={lang}>
                {Locale[defaultLanguage].Languages[lang]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <LocaleEditor
        key="0"
        systemLang={defaultLanguage}
        lang={lang}
        data={newLocale}
        onChangeValue={onChangeValue}
      />

      <Box className={commonClasses.buttonBar}>
        <Button variant="contained" onClick={disableInsertMode}>
          {ActionsLabels.CANCEL}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onCreateNewLocalInMenuItem}
        >
          {ActionsLabels.PROCEED}
        </Button>
      </Box>
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}

export default connect(mapStateToProps, uiActions)(NewLocaleForm);
