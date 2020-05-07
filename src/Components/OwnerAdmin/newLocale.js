import React, { useState } from 'react';
import Locale from './locale';
import { connect } from 'react-redux';
import constants from '../../Constants/index';
const { LOCALE } = constants;

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
              {LOCALE[defaultLanguage].LANGUAGES[lang]}
            </option>
          );
        })}
      </select>
      <Locale
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
    defaultLanguage: state.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps)(NewLocaleForm);
