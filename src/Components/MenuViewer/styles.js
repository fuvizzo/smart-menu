import styled from 'styled-components';
import { Container } from '@material-ui/core';

const MainContainer = styled(Container)`
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MenuListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-left: -10px;
  margin-right: -10px;

  @media (min-width: 580px) {
    margin-top: 50px;
    flex-direction: row;
  }
`;

const LoaderWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export { MainContainer, MenuListWrapper, LoaderWrapper };
