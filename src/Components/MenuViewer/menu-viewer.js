import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Redirect, Link } from 'react-router-dom';
import { getMenu } from '../../Actions/menu-actions';
import constants from '../../Constants';
import { isEmpty } from 'lodash';
import { HeaderContainer, MenuListWrapper } from './styles';
import { setDefaultPublicLanguage } from '../../Actions/ui-actions';
import LanguageSelector from '../Common/public-language-selector';

import Header from './Header';
import Menu from './Menu';
import MenuCard from './Menu/MenuCard';

const { Locales } = constants;
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

  const {
    Labels: { Menu: MenuLabels, Common: CommonLabels },
  } = Locales[defaultLanguage];

  const languageChangeHandler = event => {
    props.setDefaultPublicLanguage(event.target.value);
  };

  useEffect(() => {
    const getMenu = async () => {
      await props.getMenu(uniqueBusinessUrlPath);
    };
    if (!isPreview) getMenu();
  }, []);

  const MenuCardWrapper = props => {
    const availableMenus = Object.keys(data.menu.list).filter(key => {
      const providedLanguages = data.menu.list[key].providedLanguages;
      return (
        providedLanguages &&
        providedLanguages.some(lang => lang === defaultLanguage)
      );
    });
    return availableMenus.length === 0 ? (
      <>{MenuLabels.NO_MENUS_AVAILABLE}</>
    ) : (
      availableMenus.map(key => {
        const menu = data.menu.list[key];
        return (
          <MenuCard
            key={key}
            defaultLanguage={defaultLanguage}
            colors={data.business.theme.colorPalette}
            data={menu}
            business={data.business}
            id={key}
          />
        );
      })
    );
  };

  return (
    !isEmpty(data) &&
    (data.notFound ? (
      <Redirect to="/" />
    ) : (
      <HeaderContainer maxWidth="md">
        <Header data={data.business} />
        <LanguageSelector
          languageLabel={CommonLabels.LANGUAGE}
          value={defaultLanguage}
          onChange={languageChangeHandler}
        />
        {menuId || data.menu.list.length === 1 || isPreview ? (
          <Menu
            defaultLanguage={defaultLanguage}
            colors={data.business.theme.colorPalette}
            data={data.menu.list[menuId ? menuId : data.menu.defaultMenuId]}
          />
        ) : (
          <MenuListWrapper>
            <MenuCardWrapper />
          </MenuListWrapper>
        )}
      </HeaderContainer>
    ))
  );
};

function mapStateToProps(state) {
  return {
    public: state.public,
  };
}

export default connect(mapStateToProps, { getMenu, setDefaultPublicLanguage })(
  MenuViewer
);
