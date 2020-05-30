import styled from 'styled-components';

const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-style: double;
  border-color: ${props => (props.color ? props.color : 'black')};
  border-left: none;
  border-right: none;
  border-top: none;
  border-width: 4px;
  
  &:hover {
    cursor: pointer;
  }
  
  &:last-of-type {
    border: none;
  }
`;

const Title = styled.h4`
  text-transform: uppercase;
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.color ? props.color : 'inherit'};
`;

const Description = styled.p`
  margin: 15px 0 10px 0;
  font-size: 14px;
  line-height: 1.4;
  color: ${props => props.color ? props.color : 'inherit'};
`;

const Ingredients = styled.p`
  margin: 0px 0px 4px 0px;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.4;
  color: ${props => props.color ? props.color : 'inherit'};
`;

const Price = styled.p`
  margin: 0;
  font-weight: bold;
  color: ${props => (props.color ? props.color : 'inherit')};
`;

const MenuItemMeta = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`;

export {
  MenuItemMeta,
  Description,
  Ingredients,
  Title,
  Price,
}

export default MenuItemContainer;
