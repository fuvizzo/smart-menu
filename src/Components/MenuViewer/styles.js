import styled from 'styled-components';
import { Link, Container } from '@material-ui/core';

const ActionSelectorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BackLink = styled(Link)``;

const HeaderContainer = styled(Container)`
  padding: 10px;
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

export { HeaderContainer, MenuListWrapper, ActionSelectorWrapper, BackLink };
