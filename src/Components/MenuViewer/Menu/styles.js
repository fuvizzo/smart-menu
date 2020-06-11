import styled from 'styled-components';
import Container from '@material-ui/core/Container';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  /*   margin-top: -40px; */
  align-items: flex-end;
`;

const MenuItemWrapper = styled.div`
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  background-color: white;
  box-shadow: inset 0 0 0 2px
    ${props => (props.selected ? props.color : 'none')};
  color: ${props => (props.selected ? props.color : 'black')};
`;

const TitleWrapper = styled.div`
  display: flex;
  font-size: 10px;
  margin: 20px auto;
  align-items: baseline;
`;

const Title = styled.h2`
  font-size: 22px;
  margin: 0 5px;
  color: ${props => (props.color ? props.color : 'inherit')};
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${props => (props.color ? props.color : 'inherit')};
  width: 100%;
`;

const TypeText = styled.h3`
  margin: 20px 0px;
  font-size: 22px;
  font-weight: bold;
  color: ${props => (props.color ? props.color : 'inherit')};
  text-align: center;

  @media (min-width: 797px) {
    text-align: left;
  }
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
  MenuItemWrapper,
  TitleWrapper,
};

export default MenuContainer;
