import React from 'react';

import LanguageSelector from './../LanguageSelector';

import MenuContainer, {
  CategoryText,
  CategoriesContainer,
  CategoryWrapper,
  Description,
  Title,
} from './styles';
import Constants from '../../../Constants';
import Dish from './Dish';
const { Locales } = Constants;

function Menu(props) {
  function groupDishesByCategory(items) {
    /*  console.log(items);
    console.log(items.values); */
    return Object.values(items).reduce((results, item) => {
      (results[item.category] = results[item.category] || []).push(item);
      //console.log(results);
      return results;
    }, {});
  }

  const {
    data: { providedLanguages, info, items },
    colors,
    defaultLanguage,
  } = props;
  const MenuItemTypeCategory = info.menuItemTypeCategory || 'FOOD_AND_DRINKS';

  const {
    MenuItemTypes: { [MenuItemTypeCategory]: MenuItemTypes },
  } = Locales[defaultLanguage];
  const localeInfo = info.locales[defaultLanguage];

  return (
    <MenuContainer maxWidth="md">
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
      <CategoriesContainer>
        {Object.values(groupDishesByCategory(items)).map((category, index) => (
          <CategoryWrapper key={index}>
            <CategoryText color={colors.secondary}>
              {MenuItemTypes[index]}
            </CategoryText>
            {category.map((item, index) => (
              <Dish
                key={index}
                colors={colors}
                data={item}
                defaultLanguage={defaultLanguage}
              />
            ))}
          </CategoryWrapper>
        ))}
      </CategoriesContainer>
    </MenuContainer>
  );
}

export default Menu;
