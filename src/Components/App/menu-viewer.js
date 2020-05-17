import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMenu } from '../../Actions/menu-actions';
import { isEmpty } from 'lodash';
import { HeaderContainer } from './styles';

import Header from './Header';
import Menu from './Menu';

const MenuViewer = props => {
  const { businessUniqueUrlPath } = useParams();
  const { data } = props.public;
  useEffect(() => {
    props.getMenu(businessUniqueUrlPath);
  }, []);

  return (
    !isEmpty(props.public) && (
      <HeaderContainer maxWidth="lg">
        <Header data={data.business} />
        <Menu
          colors={data.business.colorPalette}
          data={data.menus['9b940e13-f7c2-4df1-a1ae-eeaad721039b']}
        />
      </HeaderContainer>
    )
  );
};
function mapStateToProps(state) {
  return {
    user: state.account.user,
    public: state.public,
  };
}

export default connect(mapStateToProps, { getMenu })(MenuViewer);
