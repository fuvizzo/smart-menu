import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setDefaultSystemLanguage } from '../../Actions/index';
import constants from '../../Constants/index';
import MenuEditor from './menuEditor';
const { LOCALE } = constants;

const OwnerAdmin = props => {
  const locale = LOCALE[props.defaultLanguage];
  const { userId } = props;

  return (
    <>
      {props.user && (
        <div>
          <div>
            {props.user.firstName} {props.user.lastName}
          </div>
          <div>
            {locale.DEFAULT_LANGUAGE}:{locale.LANGUAGES[props.defaultLanguage]}
          </div>
          <MenuEditor />
        </div>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
    defaultLanguage: state.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, {
  setDefaultSystemLanguage,
})(OwnerAdmin);
