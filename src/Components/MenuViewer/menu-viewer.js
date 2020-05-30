import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {useParams, Redirect, Link} from 'react-router-dom';
import { getMenu } from '../../Actions/menu-actions';

import { isEmpty } from 'lodash';
import { HeaderContainer, MenuCardWrapper } from './styles';

import Header from './Header';
import Menu from './Menu';
import MenuCard from "./Menu/MenuCard";

const MenuViewer = props => {
  const { uniqueBusinessUrlPath, menuId } = useParams();

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
      <HeaderContainer maxWidth="md">
        <Header data={data.business} />
        {(menuId || data.menu.list.length === 1 || isPreview)
          ? <Menu
              defaultLanguage={defaultLanguage}
              colors={data.business.theme.colorPalette}
              data={data.menu.list[menuId ? menuId : data.menu.defaultMenuId]}
            />
          : <MenuCardWrapper>
              {Object.entries(data.menu.list).map(menu =>
                <MenuCard
                  key={menu[0]}
                  defaultLanguage={defaultLanguage}
                  colors={data.business.theme.colorPalette}
                  data={menu[1]}
                  business={data.business}
                  id={menu[0]}
                />
              )}
            </MenuCardWrapper>
        }
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
