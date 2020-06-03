import React from 'react';
import { connect } from 'react-redux';

import { Box } from '@material-ui/core/';
import Copyright from '../Common/copyright';
import LanguageSelector from '../Common/public-language-selector';
import { setDefaultPublicLanguage } from '../../Actions/ui-actions';
import constants from '../../Constants/index';

const { Locales } = constants;

const CopyAndLang = props => {
  const { publicDefaultLanguage } = props;
  const languageChangeHandler = event => {
    props.setDefaultPublicLanguage(event.target.value);
  };
  const {
    Labels: { Common },
  } = Locales[publicDefaultLanguage];
  return (
    <>
      <LanguageSelector
        languageLabel={Common.LANGUAGE}
        value={publicDefaultLanguage}
        onChange={languageChangeHandler}
      />
      <Copyright />
    </>
  );
};
function mapStateToProps(state) {
  return {
    publicDefaultLanguage: state.public.ui.settings.defaultLanguage,
  };
}
export default connect(mapStateToProps, { setDefaultPublicLanguage })(
  CopyAndLang
);
