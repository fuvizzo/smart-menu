import styled from 'styled-components';
import Container from "@material-ui/core/Container";

const MenuContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: -24px;
  align-items: flex-end;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  color: ${props => props.color ? props.color : "black"};
`;

const Description = styled.p`
  color: ${props => props.color ? props.color : "black"};
`;

const CategoryText = styled.h3`
  margin: 20px 0px;
  font-size: 18px;
  color: ${props => props.color ? props.color : "black"};
`;

const CategoryWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 20px;
  @media (min-width: 797px) {
    width: calc(50% - 40px);
  }
`;

const CategoriesContainer = styled(Container)`
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
  CategoriesContainer,
  CategoryText,
  CategoryWrapper,
  Description,
  Title,
}

export default MenuContainer;
