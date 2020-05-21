import React from 'react';

import DishContainer, {
  Description,
  DishMeta,
  Ingredients,
  Price,
  Title,
} from './styles';

const Dish = props => {
  const {
    defaultLanguage,
    data: { locales },
    colors,
  } = props;
  const locale = locales[defaultLanguage];
  return (
    <DishContainer color={colors.primary}>
      <DishMeta>
        <Title>{locale.name}</Title>
        <Price>{props.data.price} €</Price>
      </DishMeta>
      {locale.description && <Description>{locale.description}</Description>}
      {locale.ingredients && <Ingredients>{locale.ingredients}</Ingredients>}
    </DishContainer>
  );
};

export default Dish;
