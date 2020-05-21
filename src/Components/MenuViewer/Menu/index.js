import React from 'react';
import { connect } from 'react-redux';
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
    data: { info, items },
    colors,
    defaultLanguage,
  } = props;
  const MenuItemTypeCategory = info.menuItemTypeCategory || 'FOOD_AND_DRINKS';

  const {
    MenuItemTypes: { [MenuItemTypeCategory]: MenuItemTypes },
  } = Locales[defaultLanguage];
  const localeInfo = info.locales[defaultLanguage];
  const { name, description } = localeInfo;
  return (
    <MenuContainer maxWidth="md">
      <Title color={colors.primary}>{name}</Title>
      <Description>{description}</Description>
      <CategoriesContainer>
        {Object.values(groupDishesByCategory(items)).map((category, index) => (
          <CategoryWrapper key={index}>
            <CategoryText color={colors.secondary}>
              {MenuItemTypes[index]}
            </CategoryText>
            {category
              .filter(item => item.locales[defaultLanguage])
              .map((item, index) => (
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
