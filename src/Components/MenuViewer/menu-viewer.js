import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { getMenu } from '../../Actions/menu-actions';

import { isEmpty } from 'lodash';
import { HeaderContainer } from './styles';

import Header from './Header';
import Menu from './Menu';

const MenuViewer = props => {
  const { uniqueBusinessUrlPath } = useParams();
  const {
    public: {
      data,
      ui: {
        settings: { defaultLanguage },
      },
    },
    isPreview,
  } = props;

  useEffect(() => {
    const getMenu = async () => {
      await props.getMenu(uniqueBusinessUrlPath);
    };
    if (!isPreview) getMenu();
  }, []);

  return (
    !isEmpty(data) &&
    (data.notFound ? (
      <Redirect to="/" />
    ) : (
      <HeaderContainer maxWidth="lg">
        <Header data={data.business} />
        <Menu
          defaultLanguage={defaultLanguage}
          colors={data.business.colorPalette}
          data={data.menu.list[data.menu.defaultMenuId]}
        />
      </HeaderContainer>
    ))
  );
};

function mapStateToProps(state) {
  return {
    public: state.public,
  };
}

export default connect(mapStateToProps, { getMenu })(MenuViewer);
