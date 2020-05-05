import React, { useState } from 'react';
import Locale from './locale';

import constants from './../../constants';
const { LOCALE } = constants;

const NewLocaleForm = props => {
  const {
    emptyLocaleData,
    availableLanguages,
    onChangeValue,
    toggleAddLocalMode,
    onCreateNewLocalInMenuItem,
    systemLang,
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
              {LOCALE[systemLang].LANGUAGES[lang]}
            </option>
          );
        })}
      </select>
      <Locale
        key="0"
        systemLang={systemLang}
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

export default NewLocaleForm;
