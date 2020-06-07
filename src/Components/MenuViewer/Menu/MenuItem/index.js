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
    isNormalMenu,
    defaultLanguage,
    providedLanguages,
    data: { locales },
    colors,
  } = props;
  let locale = locales[defaultLanguage];

  if (!locale) {
    locale = Object.values(locales).filter(lang => lang !== null)[0];
  }

  return (
    <>
    {providedLanguages.some(lang => lang === defaultLanguage) && (
      <MenuItemContainer color={colors.primary}>
        <MenuItemMeta>
          <Title>{locale.name}</Title>
          {isNormalMenu && <Price>{props.data.price} €</Price>}
        </MenuItemMeta>
        {locale.description && <Description>{locale.description}</Description>}
        {locale.ingredients && <Ingredients>{locale.ingredients}</Ingredients>}
      </MenuItemContainer>
    )}
    </>
  );
};

export default MenuItem;
