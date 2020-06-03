import React from 'react';

import { FormControl, InputLabel, MenuItem } from '@material-ui/core/';
import { LangSelector, LangSelectorWrapper } from './styles';

import constants from '../../Constants/index';

const { Locales } = constants;
export default props => {
  const { languageLabel, value, onChange } = props;
  return (
    <LangSelectorWrapper>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-lang-selector">
          {languageLabel}
        </InputLabel>
        <LangSelector
          labelId="language-select-label"
          id="language-select"
          value={value}
          onChange={onChange}
          label="lang"
        >
          {Object.keys(Locales).map((lang, index) => {
            return (
              <MenuItem value={lang} key={index}>
                <em>{lang}</em>
              </MenuItem>
            );
          })}
        </LangSelector>
      </FormControl>
    </LangSelectorWrapper>
  );
};
