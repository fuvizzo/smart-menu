import React from 'react';

import MenuItemContainer, {
  Description,
  MenuItemMeta,
  Ingredients,
  Price,
  Title,
} from './styles';

const MenuItem = props => {
  const {
    defaultLanguage,
    data: { locales },
    colors,
  } = props;
  const locale = locales[defaultLanguage];
  return locale ? (
    <MenuItemContainer color={colors.primary}>
      <MenuItemMeta>
        <Title>{locale.name}</Title>
        <Price>{props.data.price} €</Price>
      </MenuItemMeta>
      {locale.description && <Description>{locale.description}</Description>}
      {locale.ingredients && <Ingredients>{locale.ingredients}</Ingredients>}
    </MenuItemContainer>
  ) : (
    <span style={{ color: 'red' }}>
      The menu item descrition is missing for this language
    </span>
  );
};

export default MenuItem;
