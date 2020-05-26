import styled from 'styled-components';
import Container from '@material-ui/core/Container';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -40px;
  align-items: flex-end;
`;

const Title = styled.h2`
  margin: 20px auto;
  font-size: 22px;
  color: ${props => props.color ? props.color : 'black'};
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${props => props.color ? props.color : 'black'};
`;

const TypeText = styled.h3`
  margin: 20px 0px;
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.color ? props.color : 'black'};
`;

const TypeWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  @media (min-width: 797px) {
    width: calc(50% - 40px);
  }
`;

const TypesContainer = styled(Container)`
  display: flex;
  padding: 0;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  
  @media (min-width: 797px) {
    flex-direction: row;
  }
`;

export {
  TypesContainer,
  TypeText,
  TypeWrapper,
  Description,
  Title,
}

export default MenuContainer;
