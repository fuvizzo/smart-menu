import React, { useState } from 'react';
import LocaleEditor from './locale-editor';
import { connect } from 'react-redux';
import * as uiActions from '../../Actions/ui-actions';

import constants from '../../Constants/index';
const { Locale } = constants;

const NewLocaleForm = props => {
  const {
    ui,
    emptyLocaleData,
    availableLanguages,
    onChangeValue,
    onCreateNewLocalInMenuItem,
    disableInsertMode,
  } = props;
  const [lang, setLang] = useState(availableLanguages[0]);

  const defaultLanguage = ui.settings.defaultLanguage;
  const onChangeLangValue = event => {
    setLang(event.currentTarget.value);
    onChangeValue(event);
  };
  /*  const createNewLocaleCallback = useCallback(() => {
    const { menuItemId, newLocale } = insertLocaleModeState;
    createNewLocale(menuId, menuItemId, newLocale);
    toggleAddLocalMode({ cancel: true });
  }, [insertLocaleModeState]);
 */
  return (
    <>
      <select name="lang" onChange={onChangeLangValue} value={lang}>
        {availableLanguages.map((lang, index) => {
          return (
            <option key={index} value={lang}>
              {Locale[defaultLanguage].Languages[lang]}
            </option>
          );
        })}
      </select>
      <LocaleEditor
        key="0"
        systemLang={defaultLanguage}
        lang={lang}
        data={emptyLocaleData}
        onChangeValue={onChangeValue}
      />
      <div>
        <button onClick={() => onCreateNewLocalInMenuItem()}>Finish</button>

        <button onClick={disableInsertMode}>Cancel</button>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}

export default connect(mapStateToProps, uiActions)(NewLocaleForm);
