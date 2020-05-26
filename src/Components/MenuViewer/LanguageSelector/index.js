import React from 'react';
import { connect } from 'react-redux';

import { setDefaultPublicLanguage } from '../../../Actions/ui-actions';
import LanguageSelectorWrapper, {
  LanguageList,
  LanguageListItem,
} from './styles';

const LanguageSelector = props => {
  const { providedLanguages, defaultLanguage, colors } = props;

  const onSelectLanguageHandler = language => {
    props.setDefaultPublicLanguage(language);
  };

  return (
    <LanguageSelectorWrapper>
      <LanguageList component="nav">
        {providedLanguages.map((lang, index) => {
          return (
            <LanguageListItem
              button
              color={colors}
              selected={defaultLanguage === lang}
              key={index}
              onClick={() => onSelectLanguageHandler(lang)}
            >
              {lang}
            </LanguageListItem>
          );
        })}
      </LanguageList>
    </LanguageSelectorWrapper>
  );
};

function mapStateToProps(state) {
  return {
    public: state.public,
  };
}

export default connect(mapStateToProps, { setDefaultPublicLanguage })(
  LanguageSelector
);
