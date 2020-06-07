import React, { useState } from 'react';

import MenuContainer, {
  TypeText,
  TypesContainer,
  TypeWrapper,
  Description,
  Title,
  TitleWrapper,
  MenuItemWrapper,
} from './styles';
import Constants from '../../../Constants';
import MenuItem from './MenuItem';
import { groupMenuItemsByType } from '../Helpers';
const { Locales, MenuTypes } = Constants;

function Menu(props) {
  function selectMenuItem(id) {
    if (!selected.includes(id)) {
      setSelected(selected.concat(id));
    } else {
      setSelected(selected.filter(item => item !== id));
    }
  }

  const [selected, setSelected] = useState([]);

  const {
    data: { providedLanguages = [], info, items = [] },
    colors,
    defaultLanguage,
  } = props;
  const MenuItemTypeCategory = MenuTypes[info.type];

  const {
    MenuItemTypes: { [MenuItemTypeCategory]: MenuItemTypes },
  } = Locales[defaultLanguage];
  let localeInfo = info.locales[defaultLanguage];

  if (!localeInfo) {
    localeInfo = Object.values(info.locales).filter(lang => lang !== null)[0];
  }

  return (
    <MenuContainer>
      {providedLanguages.some(lang => lang === defaultLanguage) && (
        <>
          {localeInfo ? (
            <>
              <TitleWrapper>
                <Title color={colors.primary}>{localeInfo.name}</Title>
                {info.setMenu && <span>(${info.setMenu} €)</span>}
              </TitleWrapper>
              <Description>{localeInfo.description}</Description>
            </>
          ) : null}
          <TypesContainer>
            {Object.entries(groupMenuItemsByType(items)).map((type, index) => (
              <TypeWrapper key={index}>
                <TypeText color={colors.secondary}>
                  {MenuItemTypes.ITEM_LIST[type[0]]}
                </TypeText>
                {type[1].map((item, index2) => (
                  <MenuItemWrapper
                    key={`${index}-${index2}`}
                    color={colors.primary}
                    selected={selected.includes(`${index}-${index2}`)}
                    onClick={() => selectMenuItem(`${index}-${index2}`)}
                  >
                    <MenuItem
                      isNormalMenu={!info.setMenu}
                      colors={colors}
                      data={item}
                      defaultLanguage={defaultLanguage}
                      providedLanguages={providedLanguages}
                    />
                  </MenuItemWrapper>
                ))}
              </TypeWrapper>
            ))}
          </TypesContainer>
        </>
      )}
    </MenuContainer>
  );
}

export default Menu;
