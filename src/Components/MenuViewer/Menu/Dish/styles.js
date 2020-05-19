import styled from 'styled-components';
import Container from "@material-ui/core/Container";

const DishContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  border-style: double;
  border-color: ${props => props.color ? props.color : "black"};
  border-left: none;
  border-right: none;
`;

const Title = styled.h4`
  text-transform: uppercase;
  margin: 0;
  font-size: 13px;
  color: ${props => props.color ? props.color : "black"};
`;

const Description = styled.p`
  margin: 6px 0;
  color: ${props => props.color ? props.color : "black"};
`;

const Ingredients = styled.p`
  margin: 0px 0px 4px 0px;
  color: ${props => props.color ? props.color : "black"};
`;

const Price = styled.p`
  margin: 0;
  font-weight: bold;
  color: ${props => props.color ? props.color : "black"};
`;

const DishMeta = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`;

export {
  DishMeta,
  Description,
  Ingredients,
  Title,
  Price,
}

export default DishContainer;
