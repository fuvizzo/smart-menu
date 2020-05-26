import styled from 'styled-components';
import Container from '@material-ui/core/Container';

const HeaderContainer = styled(Container)`
  display: flex;
  margin-top: 40px;
  align-items: flex-end;
`;

const Logo = styled.img`
  display: block;
  width: 100px;
  height: auto;
`;

const Title = styled.h2`
  margin: 0;
`;

export { Logo, Title };

export default HeaderContainer;
