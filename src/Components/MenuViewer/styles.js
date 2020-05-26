import styled from 'styled-components';
import Container from '@material-ui/core/Container';

const HeaderContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const MenuCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  margin-left: -10px;
  margin-right: -10px;
`;

export { HeaderContainer, MenuCardWrapper };
