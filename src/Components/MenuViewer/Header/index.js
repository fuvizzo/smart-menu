import React from 'react';

import HeaderContainer, { Logo, Title } from './styles';

const Header = props => {
  const {
    data: {
      name,
      media: { logo },
    },
  } = props;
  return (
    <HeaderContainer maxWidth="lg">
      {logo ? <Logo src={logo.url} /> : <Title>{name}</Title>}
    </HeaderContainer>
  );
};

export default Header;
