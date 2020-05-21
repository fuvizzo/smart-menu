import React from 'react';

import HeaderContainer, { Logo, Title } from './styles';

const Header = props => {
  const {
    data: { name, logo },
  } = props;
  return (
    <HeaderContainer maxWidth="md">
      {logo ? <Logo src={logo} /> : <Title>{name}</Title>}
    </HeaderContainer>
  );
};

export default Header;
