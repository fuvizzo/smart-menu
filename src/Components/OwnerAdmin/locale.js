import React from 'react';
import { connect } from 'react-redux';
import constants from '../../Constants/index';
const { LOCALE } = constants;
const Locale = props => {
  const { index, lang, defaultLanguage, onChangeValue, data } = props;

  return (
    <div key={index}>
      <div>
        Menu in <b>{LOCALE[defaultLanguage].LANGUAGES[lang]}</b>
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

function mapStateToProps(state) {
  return {
    defaultLanguage: state.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps)(Locale);
