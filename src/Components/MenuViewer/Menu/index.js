import React from 'react';

import MenuContainer, {CategoryText, CategoriesContainer, CategoryWrapper, Description, Title} from "./styles";
import Constants from '../../../Constants';
import Dish from "./Dish";

function Menu(props) {
  function groupDishesByCategory(items) {
    console.log(items);
    console.log(items.values);
    return Object.values(items).reduce((results, item) => {
      (results[item.category] = results[item.category] || []).push(item);
      console.log(results);
      return results;
    }, {})
  }

  const {data: {info, items}, colors} = props;
  const { name, description } = info.locales['en'];
  return (
    <MenuContainer maxWidth="md">
      <Title color={colors.primary}>{name}</Title>
      <Description>{description}</Description>
      <CategoriesContainer>
        {Object.values(groupDishesByCategory(items)).map((category, index) => (
          <CategoryWrapper>
            <CategoryText color={colors.secondary}>{Constants.Locales['en'].DISH_TYPES[index]}</CategoryText>
            {category.map(item => (
              <Dish colors={colors} data={item} />
            ))}
          </CategoryWrapper>
        ))}
      </CategoriesContainer>
    </MenuContainer>
  );
};

export default Menu;
