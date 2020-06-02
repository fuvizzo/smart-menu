import styled from 'styled-components';
import { Container } from '@material-ui/core';

const MainContainer = styled(Container)`
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HeaderContainer = styled(Container)`
  padding: 30px 10px 10px 10px;
`;

const MenuListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-left: -10px;
  margin-right: -10px;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 50px;
    flex-direction: row;
  }
  
  @media (min-width: 991px) {
    justify-content: flex-start;
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

const Hero = styled.div`
  display: flex;
  background-image: ${props => props.img ? `url(${props.img})` : 'none' };
  background-size: cover;
  background-position: 50% 50%;
  height: 150px;
  
  @media (min-width: 991px) {
    justify-content: flex-start;
    height: 250px;
  }
`;

export {
  MainContainer,
  MenuListWrapper,
  LoaderWrapper,
  Hero,
  HeaderContainer,
};
