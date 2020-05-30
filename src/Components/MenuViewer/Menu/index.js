import React, { useState } from 'react';

import LanguageSelector from './../LanguageSelector';

import MenuContainer, {
  TypeText,
  TypesContainer,
  TypeWrapper,
  Description,
  Title,
  MenuItemWrapper,
} from './styles';
import Constants from '../../../Constants';
import MenuItem from './MenuItem';
import {groupMenuItemsByType} from '../Helpers';
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
    data: { providedLanguages, info, items },
    colors,
    defaultLanguage,
  } = props;
  const MenuItemTypeCategory = MenuTypes[info.type];

  const {
    MenuItemTypes: { [MenuItemTypeCategory]: MenuItemTypes },
  } = Locales[defaultLanguage];
  const localeInfo = info.locales[defaultLanguage];

  return (
    <MenuContainer>
      {providedLanguages.length === 0 ? (
        <span style={{ width: '300px', color: 'red' }}>
          Here goes the language selector but so far the list of the provided
          languages is empty. Open this menu in the dashboard, go to language
          settings tab and enable the languages you want to show this menu in.
        </span>
      ) : (
        <>
          <LanguageSelector
            defaultLanguage={defaultLanguage}
            providedLanguages={providedLanguages}
          />
          {localeInfo ? (
            <>
              <Title color={colors.primary}>{localeInfo.name}</Title>
              <Description>{localeInfo.description}</Description>
            </>
          ) : (
            <span style={{ color: 'red' }}>
              Menu info are missing for this language
            </span>
          )}
          <TypesContainer>
            {Object.values(groupMenuItemsByType(items)).map((type, index) => (
              <TypeWrapper key={index}>
                <TypeText color={colors.secondary}>
                  {MenuItemTypes.ITEM_LIST[index]}
                </TypeText>
                {type.map((item, index2) => (
                  <MenuItemWrapper
                    key={`${index}-${index2}`}
                    color={colors.primary}
                    selected={selected.includes(`${index}-${index2}`)}
                    onClick={() => selectMenuItem(`${index}-${index2}`)}
                  >
                    <MenuItem
                      colors={colors}
                      data={item}
                      defaultLanguage={defaultLanguage}
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
