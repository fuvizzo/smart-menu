import React from 'react';
const Locale = props => {
  const { index, lang, onChangeValue, data } = props;

  return (
    <div key={index}>
      <div>
        Menu in <b>{lang}</b>
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
