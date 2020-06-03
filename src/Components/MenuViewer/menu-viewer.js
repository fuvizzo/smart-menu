import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import { getMenu } from '../../Actions/menu-actions';
import constants from '../../Constants';
import { isEmpty } from 'lodash';
import {
  MainContainer,
  MenuListWrapper,
  LoaderWrapper,
  Hero,
  HeaderContainer,
  HeaderWrapper,
  Footer,
} from './styles';
import { setDefaultPublicLanguage } from '../../Actions/ui-actions';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from './Header';
import Menu from './Menu';
import MenuCard from './Menu/MenuCard';
import Copyright from '../Common/copyright';

const { Locales } = constants;
const MenuViewer = props => {
  const { pathname } = useLocation();
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
    Labels: { Menu: MenuLabels },
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
    <>
      {isEmpty(data) && (
        <LoaderWrapper>
          <CircularProgress />
        </LoaderWrapper>
      )}
      {!isEmpty(data) &&
        (data.notFound ? (
          <Redirect to="/" />
        ) : (
          <>
            <HeaderWrapper>
              <HeaderContainer maxWidth="md">
                <Header
                  data={data.business}
                  languageChangeHandler={languageChangeHandler}
                  defaultLanguage={defaultLanguage}
                />
              </HeaderContainer>
            </HeaderWrapper>
            <Hero img={data.business.media.headerBanner && data.business.media.headerBanner.url} />
            <MainContainer maxWidth="md">
              {pathname[pathname.length - 1] !== '/' && (
                <Redirect to={`${pathname}/`} />
              )}
              {menuId || Object.keys(data.menu.list).length === 1 ? (
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
            </MainContainer>
            <Footer mt={2} mb={2}>
              <Copyright />
            </Footer>
          </>
        ))}
    </>
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
