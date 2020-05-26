import React from 'react';

import LanguageSelector from './../LanguageSelector';

import MenuContainer, {
  TypeText,
  TypesContainer,
  TypeWrapper,
  Description,
  Title,
} from './styles';
import Constants from '../../../Constants';
import MenuItem from './MenuItem';
const { Locales, MenuTypes } = Constants;

function Menu(props) {
  function groupMenuItemsByType(items) {
    /*  console.log(items);
    console.log(items.values); */
    return Object.values(items).reduce((results, item) => {
      (results[item.type] = results[item.type] || []).push(item);
      //console.log(results);
      return results;
    }, {});
  }

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
    <MenuContainer maxWidth="md">
      {providedLanguages.length === 0 ? (
        <span style={{ width: '300px', color: 'red' }}>
          Here goes the language selector but so far the list of the provided
          languages is empty. Open this menu in the dashboard, go to language
          settings tab and enable the languages you want to show this menu in.
        </span>
      ) : (
        <>
          <LanguageSelector
            colors={colors}
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
                {type.map((item, index) => (
                  <MenuItem
                    key={index}
                    colors={colors}
                    data={item}
                    defaultLanguage={defaultLanguage}
                  />
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
