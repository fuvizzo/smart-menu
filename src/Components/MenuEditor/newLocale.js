import React, { useState } from 'react';
import LocaleEditor from './localeEditor';
import { connect } from 'react-redux';
import constants from '../../Constants/index';
const { Locale } = constants;

const NewLocaleForm = props => {
  const {
    emptyLocaleData,
    availableLanguages,
    onChangeValue,
    toggleAddLocalMode,
    onCreateNewLocalInMenuItem,
    defaultLanguage,
  } = props;
  const [lang, setLang] = useState(availableLanguages[0]);

  const onChangeLangValue = event => {
    setLang(event.currentTarget.value);
    onChangeValue(event);
  };

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

        <button onClick={() => toggleAddLocalMode({ cancel: true })}>
          Cancel
        </button>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps)(NewLocaleForm);
