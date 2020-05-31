import styled from 'styled-components';
import Container from '@material-ui/core/Container';

const HeaderContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const MenuListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-left: -10px;
  margin-right: -10px;

  @media (min-width: 580px) {
    margin-top: 50px;
    flex-direction: row;
  }
`;

export { HeaderContainer, MenuListWrapper };
