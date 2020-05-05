import React from 'react';

import constants from './../../constants';
const { LOCALE } = constants;
const Locale = props => {
  const { index, lang, systemLang, onChangeValue, data } = props;

  return (
    <div key={index}>
      <div>
        Menu in <b>{LOCALE[systemLang].LANGUAGES[lang]}</b>
      </div>
      <div>
        <input
          data-lang={lang}
          name="name"
          onChange={onChangeValue}
          type="text"
          placeholder="Name"
          value={data.name}
        />
      </div>
      <div>
        <input
          data-lang={lang}
          name="description"
          onChange={onChangeValue}
          type="text"
          placeholder="Description"
          value={data.description}
        />
      </div>
      <div>
        <input
          data-lang={lang}
          name="ingredients"
          onChange={onChangeValue}
          type="text"
          placeholder="Ingredients"
          value={data.ingredients}
        />
      </div>
    </div>
  );
};

export default Locale;
