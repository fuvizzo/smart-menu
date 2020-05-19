import React from 'react';

import DishContainer, {Description, DishMeta, Ingredients, Price, Title} from "./styles";

const Dish = props => (
  <DishContainer color={props.colors.primary}>
    <DishMeta>
      <Title>{props.data.locales['en'].name}</Title>
      <Price>{props.data.price} €</Price>
    </DishMeta>
    {props.data.locales['en'].description && <Description>{props.data.locales['en'].description}</Description>}
    {props.data.locales['en'].ingredients && <Ingredients>{props.data.locales['en'].ingredients}</Ingredients>}
  </DishContainer>
);

export default Dish;
